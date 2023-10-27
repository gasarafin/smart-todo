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
    private String gPlaceName;
    private double gPlaceLat;
    private double gPlaceLong;
    private String taskDetails;

    public Task() {
        this.taskID = -1;
    }

    public Task(int taskID, int userID, int taskPriority, String taskName, LocalDateTime dueDate, boolean isOutdoors, String gPlaceID, String gPlaceName, double gPlaceLat, double gPlaceLong, String taskDetails) {
        this.taskID = taskID;
        this.userID = userID;
        this.taskPriority = taskPriority;
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.isOutdoors = isOutdoors;
        this.gPlaceID = gPlaceID;
        this.gPlaceName = gPlaceName;
        this.gPlaceLat = gPlaceLat;
        this.gPlaceLong = gPlaceLong;
        this.taskDetails = taskDetails;
    }

    public Task(int userID, int taskPriority, String taskName, LocalDateTime dueDate, boolean isOutdoors, String gPlaceID, String gPlaceName, double gPlaceLat, double gPlaceLong, String taskDetails) {
        this.taskID = -1;
        this.userID = userID;
        this.taskPriority = taskPriority;
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.isOutdoors = isOutdoors;
        this.gPlaceID = gPlaceID;
        this.gPlaceName = gPlaceName;
        this.gPlaceLat = gPlaceLat;
        this.gPlaceLong = gPlaceLong;
        this.taskDetails = taskDetails;
    }

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
        if (dueDate != null) {
            this.dueDate = LocalDateTime.parse(dueDate);
        }
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

    public String getgPlaceName() {
        return gPlaceName;
    }

    public void setgPlaceName(String gPlaceName) {
        this.gPlaceName = gPlaceName;
    }

    public double getgPlaceLat() {
        return gPlaceLat;
    }

    public void setgPlaceLat(double gPlaceLat) {
        this.gPlaceLat = gPlaceLat;
    }

    public double getgPlaceLong() {
        return gPlaceLong;
    }

    public void setgPlaceLong(double gPlaceLong) {
        this.gPlaceLong = gPlaceLong;
    }
}
