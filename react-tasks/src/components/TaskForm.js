import LocationForm from "./LocationForm";
import { useState } from "react";

function TaskForm() {

    const [locationView, setLocationView] = useState("d-none");

    const toggleLocation = (ev) => {
        setLocationView(ev.target.checked ? "" : "d-none");
    }

    return (
        <>
            <form >
                <div className="form-group">
                    <label for="taskName">Task Name</label>
                    <input type="text" className="form-control" id="taskName" name="taskName" />
                </div>
                <div className="form-group">
                    <label for="dueDate">Due Date</label>
                    <input type="datetime-local" className="form-control" id="dueDate" name="dueDate" />
                </div>
                <div className="form-check">
                    <label for="isOutdoors">Is this an outdoor task?</label>
                    <input type="checkbox" className="form-check-input" id="isOutdoors" name="isOutdoors" />
                </div>
                <div className="form-group">
                    <label for="taskDetails">Task Details</label>
                    <input type="text" className="form-control" id="taskDetails" name="taskDetails" />
                </div>
                <div className="form-check">
                    <label for="haveLocation">Do you want to include a location?</label>
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
            </form>
        </>
    );
};
export default TaskForm;