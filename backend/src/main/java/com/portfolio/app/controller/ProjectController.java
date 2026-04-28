package com.portfolio.app.controller;

import com.portfolio.app.model.Project;
import com.portfolio.app.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    @PostMapping("/{id}/review")
    public Project reviewProject(
            @PathVariable Long id, 
            @RequestParam Double rating, 
            @RequestParam String feedback) {
        return projectService.reviewProject(id, rating, feedback);
    }

    @GetMapping("/student/{studentId}")
    public List<Project> getStudentProjects(@PathVariable Long studentId) {
        return projectService.getProjectsByStudent(studentId);
    }
}
