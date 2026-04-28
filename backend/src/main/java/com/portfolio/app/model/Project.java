package com.portfolio.app.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    @Column(length = 2000)
    private String description;
    private String mediaUrl;
    private String status; // PENDING, REVIEWED, IN_PROGRESS
    private Double rating;
    
    @Column(length = 2000)
    private String adminFeedback;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ElementCollection
    private List<String> milestones;

    public Project() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getMediaUrl() { return mediaUrl; }
    public void setMediaUrl(String mediaUrl) { this.mediaUrl = mediaUrl; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public String getAdminFeedback() { return adminFeedback; }
    public void setAdminFeedback(String adminFeedback) { this.adminFeedback = adminFeedback; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public List<String> getMilestones() { return milestones; }
    public void setMilestones(List<String> milestones) { this.milestones = milestones; }
}


