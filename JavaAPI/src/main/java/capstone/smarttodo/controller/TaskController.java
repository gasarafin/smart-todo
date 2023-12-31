package capstone.smarttodo.controller;

import capstone.smarttodo.domain.TaskService;
import capstone.smarttodo.models.Result;
import capstone.smarttodo.models.Task;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    private final TaskService service;

    private TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping("/usertask/{userName}")
    public ResponseEntity<?> findByUser(@PathVariable String userName) {
        Result<?> result = service.findByUser(userName);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), result.getStatus());
        }

        return new ResponseEntity<>(result.getErrorMessages(), result.getStatus());
    }

    @GetMapping("/idtask/{taskID}")
    public ResponseEntity<?> findByTaskID(@PathVariable int taskID) {
        Result<?> result = service.findByTaskID(taskID);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), result.getStatus());
        }

        return new ResponseEntity<>(result.getErrorMessages(), result.getStatus());
    }

    @GetMapping("/user/{userName}")
    public ResponseEntity<?> findUserID(@PathVariable String userName) {
        Result<?> result = service.findUserID(userName);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), result.getStatus());
        }

        return new ResponseEntity<>(result.getErrorMessages(), result.getStatus());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Task task) {
        Result<?> result = service.create(task);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), result.getStatus());
        }

        return new ResponseEntity<>(result.getErrorMessages(), result.getStatus());
    }

    @PutMapping("/{taskID}")
    public ResponseEntity<?> update(@RequestBody Task task) {
        Result<?> result = service.update(task);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), result.getStatus());
        }

        return new ResponseEntity<>(result.getErrorMessages(), result.getStatus());
    }

    @PutMapping("/priority/{taskID}")
    public ResponseEntity<?> updatePriority(@PathVariable int taskID, @RequestBody int taskPriority) {
        Result<?> result = service.updatePriority(taskID, taskPriority);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), result.getStatus());
        }

        return new ResponseEntity<>(result.getErrorMessages(), result.getStatus());
    }

    @PutMapping("/priority/list")
    public ResponseEntity<?> updatePriorityList(@RequestBody List<Task> sortedTasks) {
        Result<?> result = service.updatePriorityList(sortedTasks);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), result.getStatus());
        }

        return new ResponseEntity<>(result.getErrorMessages(), result.getStatus());
    }

    @DeleteMapping("/{taskID}")
    public ResponseEntity<?> deleteById(@PathVariable int taskID) {
        Result<?> result = service.delete(taskID);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), result.getStatus());
        }

        return new ResponseEntity<>(result.getErrorMessages(), result.getStatus());
    }
}