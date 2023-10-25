package capstone.smarttodo.data.task;

import capstone.smarttodo.models.Task;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class TaskMapper implements RowMapper<Task> {

    @Override
    public Task mapRow(ResultSet rs, int i) throws SQLException {

        return new Task(rs.getInt("task_id"),
                rs.getInt("app_user_id"),
                rs.getInt("task_priority"),
                rs.getString("task_name"),
                rs.getObject("due_date", LocalDateTime.class) == null
                        ? null : rs.getObject("due_date", LocalDateTime.class),
                rs.getBoolean("is_outdoors"),
                rs.getString("google_places_id"),
                rs.getString("task_details")
        );
    }
}
