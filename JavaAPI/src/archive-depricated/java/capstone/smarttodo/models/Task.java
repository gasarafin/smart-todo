package capstone.smarttodo.models;

import capstone.smarttodo.models.taskcomponents.*;

/**
 * @deprecated the model that goes with these depricated files
 */
public class Task {
    private UserTask userTask;
    private TaskWeather taskWeather;
    private TaskPriority taskPriority;
//    private TaskLocation taskLocation;  // ATTN - might not be relevant if using Google Places API 'place_id'
    private TaskSupplemental taskSupplemental;

    /**
     * Minimal Constructor
     *
     * @param userTask task details entered by user
     * @param taskPriority task priority ranking
     */
    public Task(UserTask userTask, TaskPriority taskPriority) {
        this.userTask = userTask;
        this.taskPriority = taskPriority;
    }

    /**
     * Constructor for Outdoor Task
     *
     * @param userTask task details entered by user
     * @param taskWeather weather details for task
     * @param taskPriority task priority ranking
     */
    public Task(UserTask userTask, TaskWeather taskWeather, TaskPriority taskPriority) {
        this.userTask = userTask;
        this.taskWeather = taskWeather;
        this.taskPriority = taskPriority;
    }

    /**
     * Task with location data included
     *
     * @param userTask task details entered by user
     * @param taskPriority task priority ranking
     * @param taskSupplemental supplemental data (like location hours [from google places API])
     */
    public Task(UserTask userTask, TaskPriority taskPriority, TaskSupplemental taskSupplemental) {
        this.userTask = userTask;
        this.taskPriority = taskPriority;
        this.taskSupplemental = taskSupplemental;
    }

    /**
     * Full Constructor
     *
     * @param userTask task details entered by user
     * @param taskWeather weather details for task
     * @param taskPriority task priority ranking
     * @param taskSupplemental supplemental data (like location hours [from google places API])
     */
    public Task(UserTask userTask, TaskWeather taskWeather, TaskPriority taskPriority, TaskSupplemental taskSupplemental) {
        this.userTask = userTask;
        this.taskWeather = taskWeather;
        this.taskPriority = taskPriority;
        this.taskSupplemental = taskSupplemental;
    }

    // Getters
    public UserTask getUserTask() {
        return userTask;
    }

    public TaskWeather getTaskWeather() {
        return taskWeather;
    }

    public void setTaskWeather(TaskWeather taskWeather) {
        this.taskWeather = taskWeather;
    }

    public TaskPriority getTaskPriority() {
        return taskPriority;
    }

    public TaskSupplemental getTaskSupplemental() {
        return taskSupplemental;
    }

    public void setTaskSupplemental(TaskSupplemental taskSupplemental) {
        this.taskSupplemental = taskSupplemental;
    }
}