package capstone.smarttodo.models.taskcomponents;

import java.time.LocalDateTime;
import java.util.SimpleTimeZone;

// Draft
public class UserTask {

    // Notes    - Added userID to be able to have different task lists for different users
    //          - Added userTZ (timezone) for time sanitising (like weather info)

    // ATTN should i move timezone to user?

    private final int taskID;
    private final int userID;
    private final SimpleTimeZone userTZ;
    private String taskName;
    private LocalDateTime dueDate;
    private boolean isOutdoors;
    private String gPlaceID;
    private String taskDetails;

    /**
     * Constructor for retrieving from DB
     *
     * @param taskID auto-assigned by SQL
     * @param userID unique user ID of task maker
     * @param userTZ timezone for user
     * @param taskName required user field
     * @param dueDate datetime variable (user optional)
     * @param isOutdoors is the take an outdoor task? (user required)
     * @param gPlaceID unique ID set by google places API (user optional)
     * @param taskDetails user details about task (user optional)
     */
    public UserTask(int taskID, int userID, SimpleTimeZone userTZ, String taskName, LocalDateTime dueDate, boolean isOutdoors, String gPlaceID, String taskDetails) {
        this.taskID = taskID;
        this.userID = userID;
        this.userTZ = userTZ;
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.isOutdoors = isOutdoors;
        this.gPlaceID = gPlaceID;
        this.taskDetails = taskDetails;
    }

    /**
     * Minimal constructor for getting task from user. There are the minimally required fields.
     *
     * @param taskName required user field
     * @param userID unique user ID of task maker
     * @param userTZ timezone for user
     * @param isOutdoors is the take an outdoor task? (user required)
     */
    public UserTask(int userID, SimpleTimeZone userTZ, String taskName, boolean isOutdoors) {
        this.taskID = -1;
        this.userID = userID;
        this.userTZ = userTZ;
        this.taskName = taskName;
        this.dueDate = null;            // ATTN is this gonna work?
        this.isOutdoors = isOutdoors;
    }

    public int getTaskID() {
        return taskID;
    }

    public int getUserID() {
        return userID;
    }

    public SimpleTimeZone getUserTZ() {
        return userTZ;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isOutdoors() {
        return isOutdoors;
    }

    public void setOutdoors(boolean outdoors) {
        isOutdoors = outdoors;
    }

    public String getGPlaceID() {
        return gPlaceID;
    }

    public void setGPlaceID(String gPlaceID) {
        this.gPlaceID = gPlaceID;
    }

    public String getTaskDetails() {
        return taskDetails;
    }

    public void setTaskDetails(String taskDetails) {
        this.taskDetails = taskDetails;
    }
}
