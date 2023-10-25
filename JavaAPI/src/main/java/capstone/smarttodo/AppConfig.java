package capstone.smarttodo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Draft
@Configuration
public class AppConfig {
    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        // TODO set cors mappings
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")                  // ATTN restrict mappings more
                        .allowedOrigins("http://localhost:3000")
 //                       .allowedHeaders("accept-charset", "UTF-8")
 //                       .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
                        .allowedMethods("*");
            }
        };
    }
}