package com.bharatai.wealth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Async configuration for background tasks like audit logging.
 */
@Configuration
@EnableAsync
public class AsyncConfig {
    // Uses Spring Boot's default async executor with properties from
    // application.properties
    // spring.task.execution.pool.core-size=5
    // spring.task.execution.pool.max-size=10
}
