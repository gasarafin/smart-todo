/** JDstub
 * Only full constructors because location should always be complete
 */

package capstone.smarttodo.models.taskcomponents;

/**
 * @deprecated Probably no use to having this - always stays on front end
 */
public class TaskLocation {
    private int locationID;
    private String locationName;
    private String locationAddress1;
    private String locationAddress2;
    private String locationCity;
    private USState locationState;
    private String locationPostalCode;

    /**
     * Constructor for DB retrieval
     *
     * @param locationID SQL assigned unique ID (per location)
     * @param locationName
     * @param locationAddress1 street number and street
     * @param locationAddress2 apt number oor other information (optional)
     * @param locationCity
     * @param locationState US state
     * @param locationPostalCode
     */
    public TaskLocation(int locationID, String locationName, String locationAddress1, String locationAddress2, String locationCity, USState locationState, String locationPostalCode) {
        this.locationID = locationID;
        this.locationName = locationName;
        this.locationAddress1 = locationAddress1;
        this.locationAddress2 = locationAddress2;
        this.locationCity = locationCity;
        this.locationState = locationState;
        this.locationPostalCode = locationPostalCode;
    }

    /**
     * Constructor for initial location assignment by user
     *
     * @param locationName
     * @param locationAddress1 street number and street
     * @param locationAddress2 apt number oor other information (optional)
     * @param locationCity
     * @param locationState US state
     * @param locationPostalCode
     */
    public TaskLocation(String locationName, String locationAddress1, String locationAddress2, String locationCity, USState locationState, String locationPostalCode) {
        this.locationName = locationName;
        this.locationAddress1 = locationAddress1;
        this.locationAddress2 = locationAddress2;
        this.locationCity = locationCity;
        this.locationState = locationState;
        this.locationPostalCode = locationPostalCode;
    }

    public int getLocationID() {
        return locationID;
    }

    public String getLocationName() {
        return locationName;
    }

    public String getLocationAddress1() {
        return locationAddress1;
    }

    public String getLocationAddress2() {
        return locationAddress2;
    }

    public String getLocationCity() {
        return locationCity;
    }

    public USState getLocationState() {
        return locationState;
    }

    public String getLocationPostalCode() {
        return locationPostalCode;
    }
}
