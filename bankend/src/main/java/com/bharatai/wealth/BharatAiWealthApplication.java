package com.bharatai.wealth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@org.springframework.cache.annotation.EnableCaching
public class BharatAiWealthApplication {
    public static void main(String[] args) {
        SpringApplication.run(BharatAiWealthApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
  