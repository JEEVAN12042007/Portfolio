package com.portfolio.app;

import com.portfolio.app.model.Project;
import com.portfolio.app.model.User;
import com.portfolio.app.repository.ProjectRepository;
import com.portfolio.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, ProjectRepository projectRepository) {
        return args -> {
            User student = new User();
            student.setEmail("student@test.com");
            student.setPassword("password");
            student.setFirstName("Alex");
            student.setLastName("Johnson");
            student.setRole("STUDENT");
            userRepository.save(student);

            User admin = new User();
            admin.setEmail("admin@test.com");
            admin.setPassword("password");
            admin.setFirstName("Sarah");
            admin.setLastName("Miller");
            admin.setRole("ADMIN");
            userRepository.save(admin);

            Project p1 = new Project();
            p1.setTitle("Neural Network Visualizer");
            p1.setDescription("A web-based tool to visualize training weights in real-time.");
            p1.setStatus("PENDING");
            p1.setStudent(student);
            p1.setRating(0.0);
            p1.setMilestones(Arrays.asList("UI Mockup", "Backend API"));
            projectRepository.save(p1);

            Project p2 = new Project();
            p2.setTitle("Blockchain voting system");
            p2.setDescription("A secure voting platform using Ethereum smart contracts.");
            p2.setStatus("REVIEWED");
            p2.setStudent(student);
            p2.setRating(4.5);
            p2.setAdminFeedback("Strong architectural foundation. Focus more on Gas optimization.");
            p2.setMilestones(Arrays.asList("Smart Contract Dev", "Integration"));
            projectRepository.save(p2);
        };
    }
}
