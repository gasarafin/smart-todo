// src/components/TaskForm.js


import { useState, useEffect,useContext } from "react";
import ModalStructure from "./ModalStructure";
import { useParams } from 'react-router-dom';
import LocationForm from "./LocationForm";


import AuthContext from "../contexts/AuthContext";

function TaskForm() {

    const {user:{username}} = useContext(AuthContext)





    useEffect(() => {
        const fetchUserID = async () => {
            const response = fetch(`http://localhost:8080/api/user/${username}`);
            if (response.ok) {
                const user_id = await response.json()
                setTask((previousTask) => ({ ...previousTask, userID:   user_id }))

            } else {

            }
        };
        fetchUserID();

    });



    const INITIAL_TASK = {
        taskID: 0,
        userID: 0,
        taskName: "",
        dueDate: null,
        taskDetails: null,
        gplaceID: null,
        outdoors: false,
        priorityID: 0
    };

    const BASE_MODAL = {
        title: "Success",
        body: "Error - Should not see this body.",
        btnName: "Close",
        route: "/viewtasks"
    }

    const [locationView, setLocationView] = useState("d-none");
    const [task, setTask] = useState(INITIAL_TASK);
    const [modalInfo, setModalInfo] = useState(BASE_MODAL);
    const [show, setShow] = useState(false);

    const { taskID } = useParams();

    const toggleLocation = (ev) => {
        setLocationView(ev.target.checked ? "" : "d-none");
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (taskID > 0) {
            fetch(`http://localhost:8080/api/idtask/${taskID}`)
                .then(res => res.json())
                .then(setTask)
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
                    setModalInfo({
                        title: "Success",
                        body: "Success - Task Created.",
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

    function update() {

        console.log(task)

        fetch(`http://localhost:8080/api/${taskID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then(res => {
                if (res.ok) {
                    setModalInfo({
                        title: "Success",
                        body: "Success - Task Updated.",
                        btnName: "Close",
                        route: "/viewtasks"
                    });
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
            .catch(console.error);
    }


    function handleChange(evt) {
        setTask(previous => {
            const next = { ...previous };
            next[evt.target.name] = evt.target.value;

            return next;
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();

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
                    <input type="text" className="form-control" id="taskName" name="taskName" onChange={handleChange} value={task.taskName} />
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input type="datetime-local" className="form-control" id="dueDate" name="dueDate" onChange={handleChange} value={task.dueDate} />
                </div>
                <div className="form-check">
                    <label htmlFor="isOutdoors">Is this an outdoor task?</label>
                    <input type="checkbox" className="form-check-input" id="isOutdoors" name="isOutdoors" onChange={handleChange} value={task.isOutdoors} />
                </div>
                <div className="form-group">
                    <label htmlFor="taskDetails">Task Details</label>
                    <input type="text" className="form-control" id="taskDetails" name="taskDetails" onChange={handleChange} value={task.taskDetails} />
                </div>
                <div className="form-check">
                    <label htmlFor="haveLocation">Do you want to include a location?</label>
                    <input type="checkbox" className="form-check-input" id="haveLocation" name="haveLocation" onChange={toggleLocation} />
                </div>
                <div className={locationView}>
                    <LocationForm functions={[task, setTask]} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default TaskForm;