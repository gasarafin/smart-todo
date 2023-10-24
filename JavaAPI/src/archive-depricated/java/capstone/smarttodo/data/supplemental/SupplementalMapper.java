package capstone.smarttodo.data.supplemental;

import capstone.smarttodo.models.taskcomponents.SupplementalHours;
import capstone.smarttodo.models.taskcomponents.TaskSupplemental;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.DayOfWeek;
import java.util.HashMap;

/**
 * @deprecated For future development, but not for MVP
 */
public class SupplementalMapper implements RowMapper<TaskSupplemental> {

    @Override
    public TaskSupplemental mapRow(ResultSet rs, int i) throws SQLException {
        HashMap<DayOfWeek, SupplementalHours> weeklyHours = new HashMap<>();
        weeklyHours.put(DayOfWeek.SUNDAY,new SupplementalHours(rs.getTime("day_1_open"), rs.getTime("day_1_close")));
        weeklyHours.put(DayOfWeek.MONDAY,new SupplementalHours(rs.getTime("day_2_open"), rs.getTime("day_2_close")));
        weeklyHours.put(DayOfWeek.TUESDAY,new SupplementalHours(rs.getTime("day_3_open"), rs.getTime("day_3_close")));
        weeklyHours.put(DayOfWeek.WEDNESDAY,new SupplementalHours(rs.getTime("day_4_open"), rs.getTime("day_4_close")));
        weeklyHours.put(DayOfWeek.THURSDAY,new SupplementalHours(rs.getTime("day_5_open"), rs.getTime("day_5_close")));
        weeklyHours.put(DayOfWeek.FRIDAY,new SupplementalHours(rs.getTime("day_6_open"), rs.getTime("day_6_close")));
        weeklyHours.put(DayOfWeek.SATURDAY,new SupplementalHours(rs.getTime("day_7_open"), rs.getTime("day_7_close")));

        return new TaskSupplemental(weeklyHours);

    }
}
