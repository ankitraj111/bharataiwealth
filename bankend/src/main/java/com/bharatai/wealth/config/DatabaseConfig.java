package com.bharatai.wealth.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.boot.jdbc.DataSourceBuilder;
import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseConfig.class);

    @Autowired
    private Environment env;

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl != null && !databaseUrl.trim().isEmpty() && (databaseUrl.startsWith("postgres") || databaseUrl.startsWith("jdbc:postgres"))) {
            try {
                logger.info("Parsing DATABASE_URL for datasource configuration...");
                if (databaseUrl.startsWith("jdbc:")) {
                    databaseUrl = databaseUrl.substring(5);
                }
                
                // Replace postgresql:// or postgres:// with http:// so java.net.URI parses it correctly
                String uriString = databaseUrl;
                if (uriString.startsWith("postgresql://")) {
                    uriString = "http" + uriString.substring(10);
                } else if (uriString.startsWith("postgres://")) {
                    uriString = "http" + uriString.substring(8);
                }
                
                URI dbUri = new URI(uriString);
                String username = "";
                String password = "";
                
                if (dbUri.getUserInfo() != null) {
                    String[] userInfo = dbUri.getUserInfo().split(":");
                    if (userInfo.length > 0) {
                        username = userInfo[0];
                    }
                    if (userInfo.length > 1) {
                        password = userInfo[1];
                    }
                }
                
                String host = dbUri.getHost();
                int port = dbUri.getPort();
                if (port == -1) {
                    port = 5432;
                }
                String path = dbUri.getPath();
                
                String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                
                if (dbUri.getQuery() != null && !dbUri.getQuery().isEmpty()) {
                    jdbcUrl += "?" + dbUri.getQuery();
                } else {
                    String springProfiles = env.getProperty("SPRING_PROFILES_ACTIVE", "");
                    if (springProfiles.contains("prod")) {
                        jdbcUrl += "?sslmode=require";
                    } else {
                        jdbcUrl += "?sslmode=prefer";
                    }
                }
                
                logger.info("Successfully configured Datasource from DATABASE_URL. Host: {}, Database: {}, User: {}", host, path, username);
                
                return DataSourceBuilder.create()
                        .url(jdbcUrl)
                        .username(username)
                        .password(password)
                        .driverClassName("org.postgresql.Driver")
                        .build();
            } catch (Exception e) {
                logger.error("Failed to parse DATABASE_URL: {}. Falling back to default configuration.", databaseUrl, e);
            }
        }
        
        // Fallback to standard Spring Boot properties
        logger.info("Configuring Datasource from application properties...");
        String url = env.getProperty("spring.datasource.url");
        String username = env.getProperty("spring.datasource.username");
        String password = env.getProperty("spring.datasource.password");
        String driver = env.getProperty("spring.datasource.driver-class-name", "org.postgresql.Driver");
        
        return DataSourceBuilder.create()
                .url(url)
                .username(username)
                .password(password)
                .driverClassName(driver)
                .build();
    }
}
