package capstone.smarttodo.models.taskcomponents;

import java.sql.Time;

/**
 * @deprecated Probably no use to having this - always stays on front end
 */
public class SupplementalHours {
    private final Time opening;
    private final Time closing;

    /**
     * Opening and closing times for a location
     *
     * @param opening opening time
     * @param closing closing time
     */
    public SupplementalHours(Time opening, Time closing) {
        this.opening = opening;
        this.closing = closing;
    }

    public Time getOpening() {
        return opening;
    }

    public Time getClosing() {
        return closing;
    }
}
