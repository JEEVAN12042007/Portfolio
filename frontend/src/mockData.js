export const MOCK_PROJECTS = [
  {
    id: 1,
    title: "AI Mental Health Assistant",
    description: "A machine learning based chatbot designed to provide initial emotional support and crisis detection.",
    media: "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&q=80&w=800",
    status: "Completed",
    rating: 4.8,
    feedback: "Excellent technical implementation. The NLP model is quite robust.",
    milestones: [
      { name: "Model Training", completed: true },
      { name: "UI Integration", completed: true },
      { name: "User Testing", completed: true }
    ],
    student: "Alex Johnson"
  },
  {
    id: 2,
    title: "Eco-Friendly Smart Home",
    description: "IoT project focusing on reducing energy consumption through smart scheduling and automated lighting.",
    media: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    status: "In Progress",
    rating: 4.2,
    feedback: "Great concept. Focus more on the dashboard's energy visualization metrics.",
    milestones: [
      { name: "Sensor Setup", completed: true },
      { name: "API Development", completed: true },
      { name: "Mobile App", completed: false }
    ],
    student: "Maria Garcia"
  }
];
