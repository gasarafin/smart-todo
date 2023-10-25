package capstone.smarttodo.models;

import java.time.LocalDateTime;

// Draft
public class Task {

    private final int taskID;
    private int userID;
    private int taskPriority;
    private String taskName;
    private LocalDateTime dueDate;
    private boolean isOutdoors;
    private String gPlaceID;
    private String taskDetails;

    public Task() {
        this.taskID = -1;
    }

    /**
     * Constructor for retrieving from DB
     *
     * @param taskID auto-assigned by SQL
     * @param userID unique user ID of task maker
     * @param taskPriority unique user ID of task maker
     * @param taskName required user field
     * @param dueDate datetime variable (user optional)
     * @param isOutdoors is the take an outdoor task? (user required)
     * @param gPlaceID unique ID set by google places API (user optional)
     * @param taskDetails user details about task (user optional)
     */
    public Task(int taskID, int userID, int taskPriority, String taskName, LocalDateTime dueDate, boolean isOutdoors, String gPlaceID, String taskDetails) {
        this.taskID = taskID;
        this.userID = userID;
        this.taskPriority = taskPriority;
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.isOutdoors = isOutdoors;
        this.gPlaceID = gPlaceID;
        this.taskDetails = taskDetails;
    }

    /**
     * Full constructor for creating user task.
     *
     * @param userID unique user ID of task maker
     * @param taskName required user field
     * @param taskPriority unique user ID of task maker
     * @param dueDate datetime variable (user optional)
     * @param isOutdoors is the take an outdoor task? (user required)
     * @param gPlaceID unique ID set by google places API (user optional)
     * @param taskDetails user details about task (user optional)
     */
    public Task(int userID, int taskPriority, String taskName, LocalDateTime dueDate, boolean isOutdoors, String gPlaceID, String taskDetails) {
        this.taskID = -1;
        this.userID = userID;
        this.taskPriority = taskPriority;
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.isOutdoors = isOutdoors;
        this.gPlaceID = gPlaceID;
        this.taskDetails = taskDetails;
    }

    /**
     * Minimal constructor for creating user task. There are the minimally required fields.
     *
     * @param taskName required user field
     * @param userID unique user ID of task maker
     * @param isOutdoors is the take an outdoor task? (user required)
     */
    public Task(int userID, String taskName, boolean isOutdoors) {
        this.taskID = -1;
        this.userID = userID;
        this.taskName = taskName;
        this.isOutdoors = isOutdoors;
    }

    public int getTaskID() {
        return taskID;
    }

    public int getUserID() {
        return userID;
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

    public void setDueDate(String dueDate) {
        this.dueDate = LocalDateTime.parse(dueDate);
    }

    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateTimeFormatter.ISO_ZONED_DATE_TIME)
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

    public int getTaskPriority() {
        return taskPriority;
    }

    public void setTaskPriority(int taskPriority) {
        this.taskPriority = taskPriority;
    }
}
