package capstone.smarttodo.domain;

import capstone.smarttodo.data.task.TaskJdbcTemplateRepository;
import capstone.smarttodo.models.Task;
import capstone.smarttodo.models.taskcomponents.TaskPriority;

import java.util.List;

public class TaskService {
    private final TaskJdbcTemplateRepository repository;

    public TaskService(TaskJdbcTemplateRepository repository) {
        this.repository = repository;
    }

    public List<Task> findByUser(String user) {
        return repository.findByUser(user);
    }

    public void setPriority(int taskID, TaskPriority taskPriority) {
        repository.setPriority(taskID, taskPriority);
    }

    public boolean create(Task task) {
        return repository.create(task);
    }

    public void update(Task task) {
        repository.update(task);
    }

    // TODO Needs validation
}
