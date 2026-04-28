package com.portfolio.app.service;

import com.portfolio.app.model.Project;
import com.portfolio.app.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getProjectsByStudent(Long studentId) {
        return projectRepository.findByStudentId(studentId);
    }

    public Project reviewProject(Long projectId, Double rating, String feedback) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        project.setRating(rating);
        project.setAdminFeedback(feedback);
        project.setStatus("REVIEWED");
        return projectRepository.save(project);
    }
}
