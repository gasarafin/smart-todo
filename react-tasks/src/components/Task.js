// src/components/Task.js

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

import ModalStructure from "./ModalStructure";
import WeatherTable from './WeatherCaller';

const Task = props => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'taskName',
        header: 'Task Name',
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
      },
      {
        accessorKey: 'taskDetails',
        header: 'Task Details',
      },
      {
        accessorKey: 'gPlaceName',
        header: 'Task Location',
      },
      {
        accessorKey: 'taskCommute',
        header: 'Commute Time',
      },
      {
        accessorKey: 'taskWeather',
        header: 'Task Weather',
      },
    ], [],
  );

  const BASE_MODAL = {
    title: "Success",
    body: "Error - Should not see this body.",
    btnName: "Close",
    route: "/viewtasks"
  }

  const [tasks, setTasks] = props.functions;
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState(BASE_MODAL);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function updatePriority() {
    fetch(`http://localhost:8080/api/priority/list`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tasks),
    })
      .then(res => {
        if (res.ok) {
          setModalInfo({
            title: "Success",
            body: "Success - Rankings Saved.",
            btnName: "Close",
            route: "/viewtasks"
          });
          handleShow();
        } else if (res.status === 400) {
          return res.json();
        } else {
          return Promise.reject(
            new Error(`Unexpected status code: ${res.status}`)
          );
        };
      })
      .catch(console.error);
  }

  function deleteTask(taskID) {
    fetch(`http://localhost:8080/api/${taskID}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setModalInfo({
            title: "Success",
            body: "Task Deleted.",
            btnName: "Close",
            route: "/viewtasks"
          });
          handleShow();
        } else if (res.status === 400) {
          return res.json();
        } else {
          return Promise.reject(
            new Error(`Unexpected status code: ${res.status}`)
          );
        }
      })
      .catch(console.error);
  }

  return (
    <>
      < ModalStructure show={show} handleClose={() => handleClose()} modalInfo={modalInfo} />

      <MaterialReactTable
        autoResetPageIndex={false}
        columns={columns}
        data={tasks}
        enableRowNumbers
        rowNumberMode="static"
        enableRowOrdering
        enableSorting={false}
        enableColumnFilters={false}
        enableRowActions

        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            
            <IconButton color="secondary" onClick={() => { table.setEditingRow(row) }}>
              <Link to={`/updatetask/${row.original.taskID}`} >
                <EditIcon />
              </Link>
            </IconButton>

            <IconButton
              color="error"
              onClick={() => {
                // TODO Do I really want this crappy confirm window?
                if (!window.confirm(`Are you sure you want to delete ${row.original.taskName}?`)) {
                  return;
                }

                deleteTask(row.original.taskID)
                tasks.splice(row.index, 1);

                setTasks([...tasks.map((task, index) => ({
                  ...task,
                  taskPriority: index + 1
                }))]);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}

        //TODO fix formatting here from grid to something else
        renderDetailPanel={({ row }) => (
          <Box sx={{ display: 'grid', margin: 'auto', gridTemplateColumns: '1fr 1fr', width: '100%' }}>

            <Typography>Weather Information</Typography>
            <Typography></Typography>
            {/* {row.original.gplaceID === null ? "No Commute Info" : <CommuteCaller originLat={36.1716} originLong={115.1391} destLat={row.original.gPlaceLat} destLong={row.original.gPlaceLong} />} // TODO clean this up */}
            {row.original.gPlaceLat == 0.0 ? "No Weather Info" : <WeatherTable lat={row.original.gPlaceLat} long={row.original.gPlaceLong} />}
            {/* {row.original.gplaceID === null ? "No Location Info" : <LocationInfo gplaceID={row.original.gplaceID} />}  // TODO clean this up */}

          </Box>
        )}

        renderTopToolbarCustomActions={({ table }) => (
          <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>

            <Button color="primary" onClick={updatePriority} startIcon={<UpdateIcon />} variant="contained">
              Save List Rankings
            </Button>

          </Box>
        )}

        muiTableBodyRowDragHandleProps={({ table }) => ({
          onDragEnd: () => {
            const { draggingRow, hoveredRow } = table.getState();
            if (hoveredRow && draggingRow) {
              tasks.splice(
                hoveredRow.index,
                0,
                tasks.splice(draggingRow.index, 1)[0],
              );
              setTasks([...tasks.map((task, index) => ({
                ...task,
                taskPriority: index + 1
              }))]);
            }
          },
        })}
      />
    </>
  );
};

export default Task;