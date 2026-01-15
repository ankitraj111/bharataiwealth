package com.bharatai.wealth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@org.springframework.cache.annotation.EnableCaching
public class BharatAiWealthApplication {
    public static void main(String[] args) {
        SpringApplication.run(BharatAiWealthApplication.class, args);
    }
}
