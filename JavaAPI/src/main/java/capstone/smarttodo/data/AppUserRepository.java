package capstone.smarttodo.data;

import capstone.smarttodo.models.AppUser;

// Stub - stubbed from fans
public interface AppUserRepository {
    AppUser findByUsername(String username);

    AppUser create(AppUser appUser);
}
