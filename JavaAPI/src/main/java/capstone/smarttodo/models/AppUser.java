package capstone.smarttodo.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class AppUser implements UserDetails {

    private int appUserId;
    private final String username;
    private final String password;
    private final boolean enabled;
    private final ZoneId userTZ;
    private final Collection<GrantedAuthority> authorities;

    /**
     * @param appUserId unique id for every username
     * @param username  account username
     * @param password  account password
     * @param enabled   is account enabled
     * @param userTZ    timezone for user
     * @param roles     what access level does the user have
     */
    public AppUser(int appUserId, String username, String password, boolean enabled, String userTZ, List<String> roles) {
        this.appUserId = appUserId;
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.userTZ = ZoneId.of(userTZ);
        this.authorities = convertRolesToAuthorities(roles);
    }

    private static Collection<GrantedAuthority> convertRolesToAuthorities(List<String> roles) {
        return roles.stream()
                .map(r -> new SimpleGrantedAuthority(r))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return new ArrayList<>(authorities);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public int getAppUserId() {
        return appUserId;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }

    /**
     * Gives the users timezone.
     *
     * @return ZoneID - usage example:
     * UTCTaskTime.withZoneSameInstant(userTZ);
     */
    public ZoneId getUserTZ() {
        return userTZ;
    }
}