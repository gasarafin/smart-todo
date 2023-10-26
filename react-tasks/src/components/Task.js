// src/components/Task.js
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Typography, IconButton } from '@mui/material';
import ModalStructure from "./ModalStructure";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { Link } from 'react-router-dom';

const Task = props => {
  const columns = useMemo(
    () => [
      // {
      //   accessorKey: 'taskPriority',
      //   header: 'Rank',
      // },
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
        accessorKey: 'gplaceID',
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
      // {
      //   accessorKey: 'taskID',
      //   header: 'Task ID',
      // },
    ], [],
  );

  const [tasks, setTasks] = props.functions;

  // Start Modal Functionality Block
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const BASE_MODAL = {
    title: "Success",
    body: "Error - Should not see this body.",
    btnName: "Close",
    route: "/viewtasks"
  }
  const [modalInfo, setModalInfo] = useState(BASE_MODAL);
  // End Modal Functionality Block

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
          return res.json()
        } else if (res.status === 404) {
        } else {
          return Promise.reject(
            new Error(`Unexpected status code: ${res.status}`)
          );
        }
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
                res.json();
            } else if (res.status === 404) {
                console.log('Task ID not found.');
            } else {
                return Promise.reject(
                    new Error(`Unexpected status code: ${res.status}`)
                );
            }
        })
        .catch(console.error);
}

// Need to modify ModalStructure for a second button that only appears sometimes
// function deleteConfirm(taskInfo) {
//   setModalInfo({
//     title: "Delete Confirmation.",
//     body: `Are you sure you want to delete ${taskInfo.taskName} from your task list?`,
//     btnName: "Close",
//     route: "/viewtasks"
//   });
//   handleShow();
// }



  return (
    <>
      {< ModalStructure show={show} handleClose={() => handleClose()} modalInfo={modalInfo} />}

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
            <IconButton
              color="secondary"
              onClick={() => {


                table.setEditingRow(row);



              }}
            >



<Link to={`/updatetask/${row.original.taskID}`} >
<EditIcon />
                    </Link>



              
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                deleteTask(row.original.taskID)

                tasks.splice(row.index, 1);

                setTasks([...tasks.map((task, index) => ({
                  ...task,
                  taskPriority: index + 1
                }))]);


              }
              }
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}












        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              gridTemplateColumns: '1fr 1fr',
              width: '100%',
            }}
          >
            <Typography>Extended Weather API PlaceHolder</Typography>
          </Box>
        )}













        renderTopToolbarCustomActions={({ table }) => (
          <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
            <Button
              color="primary"
              onClick={updatePriority}
              startIcon={<UpdateIcon />}
              variant="contained"
            >
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