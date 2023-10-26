// src/components/TaskForm.js


import { useState, useEffect, useRef } from "react";
import ModalStructure from "./ModalStructure";
import { useParams } from 'react-router-dom';

function TaskForm() {

    const [locationView, setLocationView] = useState("d-none");

    const toggleLocation = (ev) => {
        setLocationView(ev.target.checked ? "" : "d-none");
    }

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

    const [task, setTask] = useState(INITIAL_TASK);


    const { taskID } = useParams();



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

    const [place, setPlace] = useState({});

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: {
            country: ["us"]
        },
        fields: ["name", "address_components", "place_id"],
    };

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        autoCompleteRef.current.addListener("place_changed", async function () {
        const placeData = await autoCompleteRef.current.getPlace() 
            setPlace(placeData);
            setTask((previousTask) => ({...previousTask, gplaceID: placeData.place_id}))

        });
    }, []);

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
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="placeName">Find Location</label>
                            <input className="form-control" id="placeName" name="placeName" ref={inputRef} />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="placeID" >Place ID</label>
                            <input className="form-control" id="placeID" name="placeID" onChange={(e) => setTask({ ...task, gplaceID: e.target.value })} value={task.gplaceID} />
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    );
};
export default TaskForm;