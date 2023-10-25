package capstone.smarttodo.data.task;

import capstone.smarttodo.models.Task;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;

@Repository
public class TaskJdbcTemplateRepository implements TaskRepository {

    private final JdbcTemplate jdbcTemplate;

    public TaskJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    @Override
    public List<Task> findByUser(String user) {

        final String sql = """
                select
                    t.task_id,
                    t.app_user_id,
                    t.task_priority,
                    t.task_name,
                    t.due_date,
                    t.is_outdoors,
                    t.google_places_id,
                    t.task_details,
                    au.zone_id
                from task t
                inner join app_user au on t.app_user_id=au.app_user_id
                where username = ?;
                """;

        return jdbcTemplate.query(sql, new TaskMapper(), user);

//        try {
//            return jdbcTemplate.query(sql, new TaskMapper(), user);
//        } catch (NullPointerException ex) {
//            return null;
//        }

    }


    public Task findByTaskID(int taskID) {

        final String sql = """
                select
                    t.task_id,
                    t.app_user_id,
                    t.task_priority,
                    t.task_name,
                    t.due_date,
                    t.is_outdoors,
                    t.google_places_id,
                    t.task_details,
                    au.zone_id
                from task t
                inner join app_user au on t.app_user_id=au.app_user_id
                where t.task_id = ?;
                """;

        return jdbcTemplate.query(sql, new TaskMapper(), taskID)
                .stream()
                .findFirst().orElse(null);
    }

    public void updatePriority(int taskID, int taskPriority) {        // TODO needs better return values
        final String sql = "update task set task_priority = ? where task_id = ?;";

        jdbcTemplate.update(sql, taskPriority, taskID);
    }

    @Transactional
    public void updatePriorityList(HashMap<Integer, Integer> taskPriorityList) {

        for (int key : taskPriorityList.keySet()) {
            updatePriority(key, taskPriorityList.get(key));
        }
    }

    @Transactional
    @Override
    public boolean create(Task task) {        // TODO needs better return values

        final String sql = "insert into task (app_user_id, task_name, due_date, is_outdoors, google_places_id, task_details)"
                + "values (?, ?, ?, ?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, task.getUserID());
            ps.setString(2, task.getTaskName());
            ps.setTimestamp(3, (task.getDueDate()==null?null:Timestamp.valueOf(task.getDueDate())));
            ps.setBoolean(4, task.isOutdoors());
            ps.setString(5, task.getGPlaceID());
            ps.setString(6, task.getTaskDetails());
            return ps;
        }, keyHolder);

        return rowsAffected > 0;
    }

    @Transactional
    @Override
    public void update(Task task) {         // TODO needs better return values

        final String sql = """
                update task set
                    task_name = ?,
                    due_date = ?,
                    is_outdoors = ?,
                    google_places_id = ?,
                    task_details = ?
                where task_id = ?;
                """;

        jdbcTemplate.update(sql,
                task.getTaskName(),
                task.getDueDate()==null?null:Timestamp.valueOf(task.getDueDate()),
                task.isOutdoors(),
                task.getGPlaceID(),
                task.getTaskDetails(),
                task.getTaskID());

        updatePriority(task.getTaskID(), task.getTaskPriority());
    }

    @Override
    public boolean delete(int taskID) {
        final String sql = "delete from task where task_id = ?;";
        return jdbcTemplate.update(sql, taskID) > 0;
    }
}
