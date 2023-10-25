package capstone.smarttodo.controller;

import capstone.smarttodo.domain.TaskService;
import capstone.smarttodo.models.Result;
import capstone.smarttodo.models.Task;
import capstone.smarttodo.models.taskcomponents.TaskPriority;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


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
    public ResponseEntity<?> updatePriority(@PathVariable int taskID, @RequestBody TaskPriority taskPriority) {
        Result<?> result = service.updatePriority(taskID, taskPriority);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), result.getStatus());
        }

        return new ResponseEntity<>(result.getErrorMessages(), result.getStatus());
    }

    @PutMapping("/priority/list")
    public ResponseEntity<?> updatePriorityList(@RequestBody HashMap<Integer, TaskPriority> taskPriorityList) {
        Result<?> result = service.updatePriorityList(taskPriorityList);

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
