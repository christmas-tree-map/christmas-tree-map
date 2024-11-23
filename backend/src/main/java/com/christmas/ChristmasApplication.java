package com.christmas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ChristmasApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChristmasApplication.class, args);
	}
}
