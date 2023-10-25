package capstone.smarttodo.domain;

import capstone.smarttodo.data.task.TaskJdbcTemplateRepository;
import capstone.smarttodo.models.Result;
import capstone.smarttodo.models.Task;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class TaskService {
    private final TaskJdbcTemplateRepository repository;

    public TaskService(TaskJdbcTemplateRepository repository) {
        this.repository = repository;
    }

    public Result<List<Task>> findByUser(String user) {
        Result<List<Task>> results = new Result<>();
        results.setPayload(repository.findByUser(user));

        return results;
    }

    public Result<Task> findByTaskID(int taskID) {
        Result<Task> results = new Result<>();
        results.setPayload(repository.findByTaskID(taskID));

        return results;
    }

    public <T> Result<T> updatePriority(int taskID, int taskPriority) {
        Result<T> results = new Result<>();
        repository.updatePriority(taskID, taskPriority);

        return results;
    }

    public <T> Result<T> updatePriorityList(HashMap<Integer, Integer> taskPriorityList) {
        Result<T> results = new Result<>();
        repository.updatePriorityList(taskPriorityList);

        return results;
    }

    public <T> Result<T> create(Task task) {
        Result<T> results = new Result<>();
        repository.create(task);

        return results;
    }

    public <T> Result<T> update(Task task) {
        Result<T> results = new Result<>();
        repository.update(task);

        return results;
    }

    public <T> Result<T> delete(int taskID) {
        Result<T> results = new Result<>();
        repository.delete(taskID);

        return results;
    }

    // TODO Needs validation
}
