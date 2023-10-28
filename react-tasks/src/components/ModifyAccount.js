// src/components/ModifyAccount.js

// TODO add values to form

//TODO needs work - just default place maybe (not presentable)

import LocationForm from "./LocationForm";
import { useState } from "react";


function ModifyAccount() {

    const [locationView, setLocationView] = useState("d-none");

    const toggleLocation = (ev) => {
        setLocationView(ev.target.checked ? "" : "d-none");
    }

    return (
        <>
            <form >
                <div className="form-group">
                    <label for="taskName">User Name - Disable Me</label>
                    <input type="text" className="form-control" id="taskName" name="taskName" />
                </div>
                <div className="form-group">
                    <label for="timezone">Time Zone</label>
                    <select className="form-select" id="timezone" name="timezone">
                        <option value="none">Please Select a Timezone</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="America/Chicago">America/Chicago</option>
                        <option value="America/Denver">America/Denver</option>
                        <option value="America/Phoenix">America/Phoenix</option>
                        <option value="America/Los_Angeles">America/Los_Angeles</option>
                    </select>
                </div>

                <div className="form-group">
                    <label for="defaultLoc">Default Location</label>
                    <input type="text" className="form-control" id="defaultLoc" name="defaultLoc" />
                </div>
                <div className="form-check">
                    <label for="modifyLocation">Do you want to update your default location?</label>
                    <input type="checkbox" className="form-check-input" id="modifyLocation" name="modifyLocation" onChange={toggleLocation} />
                </div>
                <div className={locationView}>

                <LocationForm />
                {/* <LocationForm functions={[task, setTask]} /> */}

                </div>
            </form>
        </>
    );
};
export default ModifyAccount;