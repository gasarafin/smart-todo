package capstone.smarttodo.data.supplemental;

import capstone.smarttodo.models.taskcomponents.TaskSupplemental;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.DayOfWeek;

/**
 * @deprecated For future development, but not for MVP
 */
@Repository
public class SupplementalJdbcTemplateRepository implements SupplementalRepository {

        private final JdbcTemplate jdbcTemplate;

        public SupplementalJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

    @Transactional
    @Override
    public TaskSupplemental findByPlaceID(int locationID) {

        final String sql = "select day_1_open time, day_1_close time, day_2_open time, day_2_close time, day_3_open time, "
                + "day_3_close time, day_4_open time, day_4_close time, day_5_open time, day_5_close time, day_6_open time, "
                + "day_6_close time, day_7_open time, day_7_close time"
                + "from location_supplemental"
                + "where location_id = ?;";

        return jdbcTemplate.query(sql, new SupplementalMapper(), locationID)
                .stream()
                .findFirst().orElse(null);
    }

/*
    @Transactional
    @Override
    public boolean create(TaskSupplemental taskSupplemental) {

        final String sql = "insert into location_supplemental (day_1_open, day_1_close, "
                                + "day_2_open, day_2_close, day_3_open, day_3_close, day_4_open, "
                                + "day_4_close, day_5_open, day_5_close, day_6_open, day_6_close, "
                                + "day_7_open, day_7_close) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";


        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            ps.setTime(1, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SUNDAY).getOpening());
            ps.setTime(2, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SUNDAY).getClosing());
            ps.setTime(3, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.MONDAY).getOpening());
            ps.setTime(4, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.MONDAY).getClosing());
            ps.setTime(5, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.TUESDAY).getOpening());
            ps.setTime(6, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.TUESDAY).getClosing());
            ps.setTime(7, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.WEDNESDAY).getOpening());
            ps.setTime(8, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.WEDNESDAY).getClosing());
            ps.setTime(9, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.THURSDAY).getOpening());
            ps.setTime(10, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.THURSDAY).getClosing());
            ps.setTime(11, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.FRIDAY).getOpening());
            ps.setTime(12, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.FRIDAY).getClosing());
            ps.setTime(13, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SATURDAY).getOpening());
            ps.setTime(14, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SATURDAY).getClosing());

            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return false;
        }

        return true;
    }


 */

    @Transactional
    @Override
    public boolean create(TaskSupplemental taskSupplemental) {

        final String sql = "insert into location_supplemental (day_1_open, day_1_close, "
                + "day_2_open, day_2_close, day_3_open, day_3_close, day_4_open, "
                + "day_4_close, day_5_open, day_5_close, day_6_open, day_6_close, "
                + "day_7_open, day_7_close) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

// This should become google_places_id, not autogenerated
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            ps.setTime(1, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SUNDAY).getOpening());
            ps.setTime(2, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SUNDAY).getClosing());
            ps.setTime(3, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.MONDAY).getOpening());
            ps.setTime(4, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.MONDAY).getClosing());
            ps.setTime(5, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.TUESDAY).getOpening());
            ps.setTime(6, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.TUESDAY).getClosing());
            ps.setTime(7, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.WEDNESDAY).getOpening());
            ps.setTime(8, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.WEDNESDAY).getClosing());
            ps.setTime(9, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.THURSDAY).getOpening());
            ps.setTime(10, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.THURSDAY).getClosing());
            ps.setTime(11, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.FRIDAY).getOpening());
            ps.setTime(12, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.FRIDAY).getClosing());
            ps.setTime(13, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SATURDAY).getOpening());
            ps.setTime(14, taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SATURDAY).getClosing());

            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return false;
        }

        return true;
    }

    @Transactional
    public void update(TaskSupplemental taskSupplemental) {

        final String sql = "update location_supplemental set day_1_open = ?, day_1_close = ?, "
                + "day_2_open = ?, day_2_close = ?, day_3_open = ?, day_3_close = ?, day_4_open = ?, "
                + "day_4_close = ?, day_5_open = ?, day_5_close = ?, day_6_open = ?, day_6_close = ?, "
                + "day_7_open = ?, day_7_close = ?) where location_id = ?;";

        jdbcTemplate.update(sql,
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SUNDAY).getOpening(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SUNDAY).getClosing(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.MONDAY).getOpening(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.MONDAY).getClosing(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.TUESDAY).getOpening(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.TUESDAY).getClosing(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.WEDNESDAY).getOpening(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.WEDNESDAY).getClosing(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.THURSDAY).getOpening(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.THURSDAY).getClosing(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.FRIDAY).getOpening(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.FRIDAY).getClosing(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SATURDAY).getOpening(),
            taskSupplemental.getLocationWeeklyHours().get(DayOfWeek.SATURDAY).getClosing()
            );
    }
}
