package capstone.smarttodo.models.taskcomponents;

// Draft
public class TaskPriority {
    private int priorityID;

    public TaskPriority() {
    }

    public TaskPriority(int priorityID) {
        this.priorityID = priorityID;
    }

    public int getPriorityID() {
        return priorityID;
    }

    public void setPriorityID(int priorityID) {
        this.priorityID = priorityID;
    }
}
