package com.bharatai.wealth.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OpenAPI 3.0 (Swagger) documentation configuration.
 * Access at: /swagger-ui.html
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI bharatAiWealthOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Bharat AI Wealth API")
                        .description("Enterprise-grade AI-powered Wealth Management Platform for India. "
                                + "Features: JWT Auth, RBAC, Pagination, Circuit Breaker, Audit Logging.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Bharat AI Wealth Team")
                                .url("https://bharataiwealth.com"))
                        .license(new License()
                                .name("MIT License")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .bearerFormat("JWT")
                                        .scheme("bearer")
                                        .description("Enter your JWT token")));
    }
}
