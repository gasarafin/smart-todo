package capstone.smarttodo.models.taskcomponents;

import java.time.LocalTime;

// Draft
public class SupplementalHours {
    private final LocalTime opening;
    private final LocalTime closing;

    /**
     * Opening and closing times for a location
     *
     * @param opening opening time
     * @param closing closing time
     */
    public SupplementalHours(LocalTime opening, LocalTime closing) {
        this.opening = opening;
        this.closing = closing;
    }

    public LocalTime getOpening() {
        return opening;
    }

    public LocalTime getClosing() {
        return closing;
    }
}
