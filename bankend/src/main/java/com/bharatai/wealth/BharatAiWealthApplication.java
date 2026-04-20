package com.bharatai.wealth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@org.springframework.cache.annotation.EnableCaching
public class BharatAiWealthApplication {
    static {
        // Fix for Render's DATABASE_URL which often lacks the 'jdbc:' prefix
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl != null) {
            String jdbcUrl;
            if (databaseUrl.startsWith("postgres://")) {
                jdbcUrl = databaseUrl.replace("postgres://", "jdbc:postgresql://");
            } else if (databaseUrl.startsWith("postgresql://")) {
                jdbcUrl = databaseUrl.replace("postgresql://", "jdbc:postgresql://");
            } else if (!databaseUrl.startsWith("jdbc:")) {
                jdbcUrl = "jdbc:postgresql://" + databaseUrl;
            } else {
                jdbcUrl = databaseUrl;
            }
            
            // Set the system property so Spring Boot uses the corrected URL
            if (!jdbcUrl.equals(databaseUrl)) {
                System.setProperty("spring.datasource.url", jdbcUrl);
                System.out.println("Adapted Render DATABASE_URL to JDBC format");
            }
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(BharatAiWealthApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
  