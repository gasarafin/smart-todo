package capstone.smarttodo.data.task;

import capstone.smarttodo.models.Task;
import capstone.smarttodo.models.taskcomponents.TaskPriority;
import capstone.smarttodo.models.taskcomponents.UserTask;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class TaskMapper implements RowMapper<Task> {

    @Override
    public Task mapRow(ResultSet rs, int i) throws SQLException {

        UserTask userTask = new UserTask(   rs.getInt("task_id"),
                                            rs.getInt("app_user_id"),
                                            rs.getString("task_name"),
                                            rs.getObject("due_date", LocalDateTime.class)==null
                                                    ?null:rs.getObject("due_date", LocalDateTime.class),
                                            rs.getBoolean("is_outdoors"),
                                            rs.getString("google_places_id"),
                                            rs.getString("task_details")
                                            );

        TaskPriority taskPriority = new TaskPriority(rs.getInt("task_priority"));

        return new Task(userTask, taskPriority);
    }
}
