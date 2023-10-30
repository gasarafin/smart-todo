package capstone.smarttodo.data.task;

import capstone.smarttodo.models.Task;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class TaskJdbcTemplateRepository implements TaskRepository {

    private final JdbcTemplate jdbcTemplate;

    public TaskJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Task> findByUser(String username) {

        final String sql = """
                select
                    t.task_id,
                    t.app_user_id,
                    tp.task_priority,
                    t.task_name,
                    t.due_date,
                    t.is_outdoors,
                    t.google_places_id,
                    t.google_places_name,
                    t.google_places_lat,
                    t.google_places_long,
                    t.task_details
                from task t
                left join task_priority tp on t.task_id=tp.task_id
                inner join app_user au on t.app_user_id=au.app_user_id
                where username = ?
                order by tp.task_priority asc;
                """;

        return jdbcTemplate.query(sql, new TaskMapper(), username);
    }

    public Task findByTaskID(int taskID) {

        final String sql = """
                select
                    t.task_id,
                    t.app_user_id,
                    tp.task_priority,
                    t.task_name,
                    t.due_date,
                    t.is_outdoors,
                    t.google_places_id,
                    t.google_places_name,
                    t.google_places_lat,
                    t.google_places_long,
                    t.task_details
                from task t
                left join task_priority tp on t.task_id=tp.task_id
                inner join app_user au on t.app_user_id=au.app_user_id
                where t.task_id = ?;
                """;

        return jdbcTemplate.query(sql, new TaskMapper(), taskID)
                .stream()
                .findFirst().orElse(null);
    }

    public int findUserID(String username) {

        final String sql = "select app_user_id from app_user where username = ?;";


        return jdbcTemplate.queryForObject(sql, Integer.class, username);
    }

    public boolean updatePriority(int taskID, int taskPriority) {
        final String sql = "replace into task_priority values (?, ?);";

        return jdbcTemplate.update(sql, taskID, taskPriority)  > 0;
    }

    @Transactional
    public boolean updatePriorityList(List<Task> sortedTasks) {

        for (Task task : sortedTasks) {
            if (!updatePriority(task.getTaskID(), task.getTaskPriority())) {
                return false;
            }
        }
        return true;
    }

    @Transactional
    @Override
    public boolean create(Task task) {

        final String sql = "insert into task (app_user_id, task_name, due_date, is_outdoors, google_places_id, google_places_name, google_places_lat, google_places_long, task_details)"
                + "values (?, ?, ?, ?, ?, ?, ?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, task.getUserID());
            ps.setString(2, task.getTaskName());
            ps.setTimestamp(3, (task.getDueDate() == null ? null : Timestamp.valueOf(task.getDueDate())));
            ps.setBoolean(4, task.isOutdoors());
            ps.setString(5, task.getGPlaceID());
            ps.setString(6, task.getgPlaceName());
            ps.setDouble(7, task.getgPlaceLat());
            ps.setDouble(8, task.getgPlaceLong());
            ps.setString(9, task.getTaskDetails());
            return ps;
        }, keyHolder);

        return rowsAffected > 0;
    }

    @Override
    public boolean update(Task task) {

        final String sql = """
                update task set
                    task_name = ?,
                    due_date = ?,
                    is_outdoors = ?,
                    google_places_id = ?,
                    google_places_name = ?,
                    google_places_lat = ?,
                    google_places_long = ?,
                    task_details = ?
                where task_id = ?;
                """;

return jdbcTemplate.update(sql,
                task.getTaskName(),
                task.getDueDate() == null ? null : Timestamp.valueOf(task.getDueDate()),
                task.isOutdoors(),
                task.getGPlaceID(),
                task.getgPlaceName(),
                task.getgPlaceLat(),
                task.getgPlaceLong(),
                task.getTaskDetails(),
                task.getTaskID()) > 0;
    }

    @Transactional
    @Override
    public boolean delete(int taskID) {
        final String sql = "delete from task where task_id = ?;";

        return jdbcTemplate.update(sql, taskID) > 0;
    }
}