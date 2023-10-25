package capstone.smarttodo.models.taskcomponents;

// HELP - is this dumb since it is just an int, should I just move to 'UserTask`? The reason it isn't there is because
// this is set by the application, whereas everything in 'UserTask' in set by the user - so they are intrinsically different

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
