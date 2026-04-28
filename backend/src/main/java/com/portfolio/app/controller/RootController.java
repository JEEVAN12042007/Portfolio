package com.portfolio.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.HashMap;

@RestController
public class RootController {

    @GetMapping("/")
    public Map<String, String> welcome() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "online");
        response.put("message", "Welcome to the Student Portfolio API");
        response.put("version", "1.0.0");
        response.put("documentation", "http://localhost:8080/api/projects");
        return response;
    }
}
