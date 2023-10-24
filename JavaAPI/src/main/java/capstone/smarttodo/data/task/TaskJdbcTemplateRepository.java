package capstone.smarttodo.data.task;

import capstone.smarttodo.models.Task;
import capstone.smarttodo.models.taskcomponents.TaskPriority;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Objects;

public class TaskJdbcTemplateRepository implements TaskRepository {

    private final JdbcTemplate jdbcTemplate;

    public TaskJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    @Override
    public List<Task> findByUser(String user) {

        final String sql = "select t.task_id, t.app_user_id, t.task_name, t.due_date, t.is_outdoors, "
                + "t.google_places_id, t.task_details, tp.task_priority"
                + "from task t"
                + "inner join task_priority tp on t.task_id=tp.task_id"
                + "inner join app_user au on t.app_user_id=au.app_user_id"
                + "where username = ?;";

        return jdbcTemplate.query(sql, new TaskMapper(), user);

//        try {
//            return jdbcTemplate.query(sql, new TaskMapper(), user);
//        } catch (NullPointerException ex) {
//            return null;
//        }

    }

    public void setPriority(int taskID, TaskPriority taskPriority) {        // TODO needs better return values
        final String sql = "insert into task_priority (task_id, task_priority)"
                + "values (?, ?);";

        jdbcTemplate.update(sql, taskID, taskPriority.getPriorityID());
    }

    @Transactional
    @Override
    public boolean create(Task task) {        // TODO needs better return values

        final String sql = "insert into task (app_user_id, task_name, due_date, is_outdoors, google_places_id, task_details)"
                + "values (?, ?, ?, ?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, task.getUserTask().getUserID());
            ps.setString(2, task.getUserTask().getTaskName());
            ps.setString(3, task.getUserTask().getDueDate().toString());
            ps.setBoolean(4, task.getUserTask().isOutdoors());
            ps.setString(5, task.getUserTask().getGPlaceID());
            ps.setString(6, task.getUserTask().getTaskDetails());
            return ps;
        }, keyHolder);

        setPriority(Objects.requireNonNull(keyHolder.getKey()).intValue(), task.getTaskPriority());

        return rowsAffected > 0;
    }

    @Transactional
    public void update(Task task) {         // TODO needs better return values

        final String sql = "update task set task_name = ?, due_date = ?, is_outdoors = ?, google_places_id = ?, task_details = ?"
                + "where task_id = ?;";

        jdbcTemplate.update(sql,
                task.getUserTask().getTaskName(),
                task.getUserTask().getDueDate().toString(),
                task.getUserTask().isOutdoors(),
                task.getUserTask().getGPlaceID(),
                task.getUserTask().getTaskDetails(),
                task.getUserTask().getTaskID());

        setPriority(task.getUserTask().getTaskID(), task.getTaskPriority());
    }
}
