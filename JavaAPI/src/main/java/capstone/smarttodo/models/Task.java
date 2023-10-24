package capstone.smarttodo.models;

import capstone.smarttodo.models.taskcomponents.*;

// Draft
public class Task {
    private UserTask userTask;
    private TaskPriority taskPriority;

    /**
     * Task Constructor
     *
     * @param userTask task details entered by user
     * @param taskPriority task priority ranking
     */
    public Task(UserTask userTask, TaskPriority taskPriority) {
        this.userTask = userTask;
        this.taskPriority = taskPriority;
    }

    public UserTask getUserTask() {
        return userTask;
    }

    public TaskPriority getTaskPriority() {
        return taskPriority;
    }
}