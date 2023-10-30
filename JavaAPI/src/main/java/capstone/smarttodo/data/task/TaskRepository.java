package capstone.smarttodo.data.task;

import capstone.smarttodo.models.Task;

import java.util.List;

public interface TaskRepository {

    List<Task> findByUser(String user);

    boolean create(Task task);

    boolean update(Task task);

    boolean delete(int taskID);
}
