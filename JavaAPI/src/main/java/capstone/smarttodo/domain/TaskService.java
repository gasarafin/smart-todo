package capstone.smarttodo.domain;

import capstone.smarttodo.data.task.TaskJdbcTemplateRepository;
import capstone.smarttodo.models.Result;
import capstone.smarttodo.models.Task;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskJdbcTemplateRepository repository;

    public TaskService(TaskJdbcTemplateRepository repository) {
        this.repository = repository;
    }

    public Result<List<Task>> findByUser(String username) {
        Result<List<Task>> results = validateRequiredString(username, "User name", new Result<>());

        if (results.isSuccess()) {
            results.setPayload(repository.findByUser(username));
        }

        return results;
    }

    public Result<Task> findByTaskID(int taskID) {
        Result<Task> results = validateID(taskID, "Task ID", new Result<>());

        if (results.isSuccess()) {
            results.setPayload(repository.findByTaskID(taskID));
        }

        return results;
    }

    public Result<Integer> findUserID(String username) {
        Result<Integer> results = validateRequiredString(username, "User name", new Result<>());

        if (results.isSuccess()) {
            results.setPayload(repository.findUserID(username));
        }
        return results;
    }

    public <T> Result<T> updatePriority(int taskID, int taskPriority) {
        Result<T> results = validateID(taskID, "Task ID", new Result<>());

        if (results.isSuccess()) {
            if (!repository.updatePriority(taskID, taskPriority)) {
                results.addErrorMessage("Task rank did not update.", HttpStatus.INTERNAL_SERVER_ERROR);
            };
        }

        return results;
    }

    public <T> Result<T> updatePriorityList(List<Task> sortedTasks) {
        Result<T> results = validateIDList(sortedTasks, new Result<>());

        if (results.isSuccess()) {
            if(!repository.updatePriorityList(sortedTasks)) {
                results.addErrorMessage("Task ranks did not update.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return results;
    }

    public <T> Result<T> create(Task task) {
        Result<T> results = validateTaskCreate(task, new Result<>());

        if (results.isSuccess()) {
            if(!repository.create(task)) {
                results.addErrorMessage("Task was not created.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return results;
    }

    public <T> Result<T> update(Task task) {
        Result<T> results = validateTaskUpdate(task, new Result<>());

        if (results.isSuccess()) {
            if(!repository.update(task)) {
                String message = String.format("Task '%d' was not updated.", task.getTaskID());
                results.addErrorMessage(message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return results;
    }

    public <T> Result<T> delete(int taskID) {
        Result<T> results = validateID(taskID, "Task ID", new Result<>());

        if (results.isSuccess()) {
            if(!repository.delete(taskID)) {
                String message = String.format("Task '%d' was not deleted.", taskID);
                results.addErrorMessage(message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return results;
    }


    private <T> Result<T> validateRequiredString(String reqString, String fieldName, Result<T> results) {
        if (reqString == null || reqString.isEmpty()) {
            String message = String.format("Invalid %s.", fieldName);
            results.addErrorMessage(message, HttpStatus.BAD_REQUEST);
        }

        return results;
    }

    private <T> Result<T> validateID(int id, String fieldName, Result<T> results) {
        if (id <= 0) {
            String message = String.format("Invalid %s.", fieldName);
            results.addErrorMessage(message, HttpStatus.BAD_REQUEST);
        }

        return results;
    }

    private <T> Result<T> validateIDList(List<Task> taskList, Result<T> results) {
        for (Task task : taskList) {
            results = validateID(task.getTaskID(), "Task ID", results);

            if(!results.isSuccess()) {
                return results;
            }
        }

        return results;
    }

    private <T> Result<T> validateTaskCreate(Task task, Result<T> results) {
        results = validateID(task.getUserID(), "User ID", results);
        results = validateRequiredString(task.getTaskName(), "Task name", results);

        return results;
    }

    private <T> Result<T> validateTaskUpdate(Task task, Result<T> results) {
        results = validateID(task.getTaskID(), "Task ID", results);
        results = validateID(task.getUserID(), "User ID", results);
        results = validateRequiredString(task.getTaskName(), "Task name", results);

        return results;
    }





}