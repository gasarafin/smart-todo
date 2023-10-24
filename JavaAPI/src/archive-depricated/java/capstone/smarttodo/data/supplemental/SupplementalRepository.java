package capstone.smarttodo.data.supplemental;

import capstone.smarttodo.models.taskcomponents.TaskSupplemental;

/**
 * @deprecated For future development, but not for MVP
 */
public interface SupplementalRepository {
    TaskSupplemental findByPlaceID(int locationID);

    boolean create(TaskSupplemental taskSupplemental);

}
