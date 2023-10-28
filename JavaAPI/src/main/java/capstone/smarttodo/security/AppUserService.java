package capstone.smarttodo.security;

import capstone.smarttodo.data.appuser.AppUserJdbcTemplateRepository;
import capstone.smarttodo.models.Result;
import capstone.smarttodo.models.AppUser;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.List;

@Service
public class AppUserService implements UserDetailsService {
    private final AppUserJdbcTemplateRepository repository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserJdbcTemplateRepository repository,
                          PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.findByUsername(username);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return appUser;
    }

    public Result<AppUser> create(String username, String password) {
        Result<AppUser> result = validate(username, password);
        if (!result.isSuccess()) {
            return result;
        }

        password = encoder.encode(password);

        AppUser appUser = new AppUser(0, username, password, true, "UTC", List.of("USER"));

        try {
            appUser = repository.create(appUser);
            result.setPayload(appUser);
        } catch (DuplicateKeyException e) {
            result.addErrorMessage("The provided username already exists", HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    private Result<AppUser> validate(String username, String password) {
        Result<AppUser> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.addErrorMessage("username is required", HttpStatus.BAD_REQUEST);
            return result;
        }

        if (password == null) {
            result.addErrorMessage("password is required", HttpStatus.BAD_REQUEST);
            return result;
        }

        if (username.length() > 50) {
            result.addErrorMessage("username must be less than 50 characters", HttpStatus.BAD_REQUEST);
        }

        if (!isValidPassword(password)) {
            result.addErrorMessage("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter", HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        return digits > 0 && letters > 0 && others > 0;
    }
}
