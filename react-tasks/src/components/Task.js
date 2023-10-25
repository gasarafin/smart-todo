// src/components/Task.js

function Task({ tasks }) {
    /*
        const [locationView, setLocationView] = useState("d-none");
    
        const toggleLocation = (ev) => {
            setLocationView(ev.target.checked ? "" : "d-none");
        }
    */
    return (
        <table className="table table-light">
            <thead>
                <tr>
                    <th scope="col" id="taskPriority" name="taskPriority">Rank</th>
                    <th scope="col" id="taskName" name="taskName">Task Name</th>
                    <th scope="col" id="dueDate" name="dueDate">Due Date</th>
                    <th scope="col" id="taskDetails" name="taskDetails">Task Details</th>
                    <th scope="col" id="taskLocation" name="taskLocation">Location</th>
                    <th scope="col" id="taskCommute" name="taskCommute">Commute Time</th>
                    <th scope="col" id="taskWeather" name="taskWeather">Weather</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => (
                    <tr key={task.userTask.taskID}>
                        <th id="taskPriority" name="taskPriority" scope="row">{task.taskPriority.priorityID}</th>
                        <td id="taskName" name="taskName">{task.userTask.taskName}</td>
                        <td type="datetime-local" id="dueDate" name="dueDate">{task.userTask.dueDate}</td>
                        <td id="taskDetails" name="taskDetails">{task.userTask.taskDetails}</td>
                        <td id="taskLocation" name="taskLocation">{task.userTask.gplaceID} API Call</td>
                        <td id="taskCommute" name="taskCommute">Location API Call</td>
                        <td id="taskWeather" name="taskWeather">Weather API Call</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default Task;