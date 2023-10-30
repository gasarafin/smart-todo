// src/components/Task.js

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { MaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ModalStructure from "./ModalStructure";
import WeatherTable from './WeatherCaller';
import LocationInfo from './LocationInfo';

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
            }
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

    function confirmDelete(row) {

        const deleteConfirmOptions = {
            title: 'Delete Task?',
            message: `Are you sure you want to delete ${row.original.taskName}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        deleteTask(row.original.taskID)
                        tasks.splice(row.index, 1);

                        setTasks([...tasks.map((task, index) => ({
                            ...task,
                            taskPriority: index + 1
                        }))]);
                    }
                },
                {
                    label: 'No',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            willUnmount: () => { },
            afterClose: () => { },
            onClickOutside: () => { },
            onKeypress: () => { },
            onKeypressEscape: () => { },
            overlayClassName: "overlay-custom-class-name"
        };

        confirmAlert(deleteConfirmOptions);
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
                rowsPerPageOptions={[25, 50]}

                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>

                        <IconButton color="secondary" onClick={() => { table.setEditingRow(row) }}>
                            <Link to={`/updatetask/${row.original.taskID}`} >
                                <EditIcon />
                            </Link>
                        </IconButton>

                        <IconButton color="error" onClick={() => { confirmDelete(row) }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}

                renderDetailPanel={({ row }) => (

                    <Box sx={{ display: 'flex', gap: '8px' }}>
                        {row.original.gPlaceLat == 0.0 ? <h5 className="mx-1">No Weather Info</h5> : <WeatherTable lat={row.original.gPlaceLat} long={row.original.gPlaceLong} />}
                        {row.original.gplaceID === null ? <h5 className="mx-1">No Location Hours</h5> : <LocationInfo gplaceID={row.original.gplaceID} />}
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