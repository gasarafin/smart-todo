package capstone.smarttodo.data.appuser;

import capstone.smarttodo.models.AppUser;

public interface AppUserRepository {
    AppUser findByUsername(String username);

    AppUser create(AppUser appUser);
}