package capstone.smarttodo.models.taskcomponents;

import java.time.DayOfWeek;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

// Draft
public class TaskSupplemental {

    private HashMap<DayOfWeek, SupplementalHours> locationWeeklyHours;
    private TimeUnit commuteDuration;

    // NOTES - just a curiosity now - is there a way to require an array of 7 elements in a constructor
    // e.g. 'SupplementalHours[] locationWeeklyHours = new SupplementalHours[7]'

    /**
     * Supplemental task location information
     *
     * @param locationWeeklyHours array of location hours. Address 1-7 related to day of week (e.g. 1 = Monday, 3 = Wednesday, 7=Sunday, etc)
     * @param commuteDuration length of time from home location to location of task
     */
    public TaskSupplemental(HashMap<DayOfWeek, SupplementalHours> locationWeeklyHours, TimeUnit commuteDuration) {
        this.locationWeeklyHours = locationWeeklyHours;
        this.commuteDuration = commuteDuration;
    }

    public HashMap<DayOfWeek, SupplementalHours> getLocationWeeklyHours() {
        return locationWeeklyHours;
    }

    public void setLocationWeeklyHours(HashMap<DayOfWeek, SupplementalHours> locationWeeklyHours) {
        this.locationWeeklyHours = locationWeeklyHours;
    }

    public void setLocationHoursForDay(DayOfWeek dayOfWeek, SupplementalHours hoursForDay) {
        this.locationWeeklyHours.put(dayOfWeek, hoursForDay);
    }

    public TimeUnit getCommuteDuration() {
        return commuteDuration;
    }

    public void setCommuteDuration(TimeUnit commuteDuration) {
        this.commuteDuration = commuteDuration;
    }
}
