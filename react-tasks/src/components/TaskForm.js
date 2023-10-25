// src/components/TaskForm.js

import LocationForm from "./LocationForm";
import { useState, useEffect } from "react";
import ModalStructure from "./ModalStructure";

function TaskForm() {

    const [locationView, setLocationView] = useState("d-none");

    const toggleLocation = (ev) => {
        setLocationView(ev.target.checked ? "" : "d-none");
    }

    const INITIAL_TASK = {
        userTask: {
            taskID: 0,
            userID: 0,
            taskName: "",
            dueDate: null,
            taskDetails: null,
            gplaceID: null,
            outdoors: false
        },
        taskPriority: {
            priorityID: 0
        }
    };

    const [task, setTask] = useState(INITIAL_TASK);
    const [userTask, setUserTask] = useState(INITIAL_TASK.userTask);
    const [taskPriority, setTaskPriority] = useState(INITIAL_TASK.taskPriority);

    //const { taskID } = useParams();



    const taskID = 1;                                                 // BUG Placeholder


    // Start Modal Functionality Block
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const BASE_MODAL = {
        title: "Title",
        body: "Body",
        btnName: "Button",
        route: "#"
    }
    const [modalInfo, setModalInfo] = useState(BASE_MODAL);
    // End Modal Functionality Block

    useEffect(() => {
        if (taskID > 0) {
            fetch(`http://localhost:8080/api/idtask/${taskID}`)
                .then(res => res.json())
                .then(ev => {
                    setTask(ev);
                    setUserTask(ev.userTask);
                    setTaskPriority(ev.taskPriority);
                })
                .catch(console.error);
        }
    }, [taskID]);




    function create() {
        fetch(`http://localhost:8080/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then(res => {
                if (res.ok) {
                    setModalInfo(BASE_MODAL);
                    handleShow();
                } else if (res.status === 400) {
                    return res.json();
                } else {
                    return Promise.reject(
                        new Error(`Unexpected status code: ${res.status}`)
                    );
                }
            })
            .then(body => {
                setModalInfo({
                    title: "Error",
                    body: body[0],
                    btnName: "Close",
                    route: "."
                });
                handleShow();
            })
            .catch(console.error);
    }

    function update() {
        fetch(`http://localhost:8080/api/${taskID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then(res => {
                if (res.ok) {
                    setModalInfo(BASE_MODAL);
                    handleShow();
                } else if (res.status === 400) {
                    return res.json()
                } else if (res.status === 404) {
                    console.log('Task ID not found.');
                } else {
                    return Promise.reject(
                        new Error(`Unexpected status code: ${res.status}`)
                    );
                }
            })
            .then(body => {
                setModalInfo({
                    title: "Error",
                    body: body[0],
                    btnName: "Close",
                    route: "."
                });
                handleShow();
            })
            .catch(console.error);
    }

    function handleClick(evt) {
        setTask({userTask, taskPriority});
    }

 function handleChange(evt) {

        setUserTask(previous => {
            const next = { ...previous };
            next[evt.target.name] = evt.target.value;
            
            return next;
        });
     

    }

    function handleSubmit(evt) {
        evt.preventDefault();

 

        console.log(task)

        if (taskID > 0) {
            update();
        } else {
            create();
        }
    }

    return (
        <>

            {<ModalStructure show={show} handleClose={() => handleClose()} modalInfo={modalInfo} />}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="taskName">Task Name</label>
                    <input type="text" className="form-control" id="taskName" name="taskName" onChange={handleChange} value={userTask.taskName} />
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input type="datetime-local" className="form-control" id="dueDate" name="dueDate" onChange={handleChange} value={userTask.dueDate} />
                </div>
                <div className="form-check">
                    <label htmlFor="isOutdoors">Is this an outdoor task?</label>
                    <input type="checkbox" className="form-check-input" id="isOutdoors" name="isOutdoors" onChange={handleChange} value={userTask.isOutdoors} />
                </div>
                <div className="form-group">
                    <label htmlFor="taskDetails">Task Details</label>
                    <input type="text" className="form-control" id="taskDetails" name="taskDetails" onChange={handleChange} value={userTask.taskDetails} />
                </div>
                <div className="form-check">
                    <label htmlFor="haveLocation">Do you want to include a location?</label>
                    <input type="checkbox" className="form-check-input" id="haveLocation" name="haveLocation" onChange={toggleLocation} />
                </div>
                <div className={locationView}>
                    <LocationForm />
                </div>
                {/*
                <div className="row">
                    <div className="form-group col-6">
                        <label for="locationSearch">Location Search</label>
                        <input className="form-control" id="locationSearch" name="locationSearch" />
                    </div>
                    <div className="form-group col-6">
                        <label for="placeID">Place ID</label>
                        <input className="form-control" id="placeID" name="placeID" />
                    </div>
                </div>
*/}
                <button onClick={handleClick}  type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    );
};
export default TaskForm;