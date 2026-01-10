import { Resume } from '@/types/resume';

export const defaultResume: Resume = {
    header: {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        linkedin: "linkedin.com/in/alexjohnson",
        location: "San Francisco, CA",
        portfolio: "alexjohnson.dev"
    },
    summary: "Results-driven Software Engineer with 5+ years of experience in building scalable web applications. Proficient in React, Node.js, and cloud architecture. Passionate about clean code, performance optimization, and developer experience.",
    education: [
        {
            institution: "University of California, Berkeley",
            degree: "B.S. Computer Science",
            location: "Berkeley, CA",
            dates: "2015 - 2019",
            bullets: [
                "GPA: 3.8/4.0",
                "Relevant Coursework: Data Structures, Algorithms, Database Systems, Artificial Intelligence"
            ]
        }
    ],
    experience: [
        {
            role: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            location: "San Francisco, CA",
            dates: "2022 - Present",
            bullets: [
                "Led the migration of a legacy monolith to a microservices architecture, reducing deployment time by 40%.",
                "Mentored 3 junior developers and established code review best practices.",
                "Optimized database queries, improving API response times by 30%."
            ]
        },
        {
            role: "Software Engineer",
            company: "StartUp flight",
            location: "San Francisco, CA",
            dates: "2019 - 2022",
            bullets: [
                "Developed and maintained key features for the main customer-facing dashboard using React and Redux.",
                "Collaborated with product managers to define requirements and deliver features on time.",
                "Implemented a CI/CD pipeline using GitHub Actions, ensuring reliable deployments."
            ]
        }
    ],
    projects: [
        {
            title: "Task Master",
            tech: "React, Firebase, Tailwind CSS",
            dates: "2023",
            bullets: [
                "Built a real-time collaborative task management application.",
                "Implemented drag-and-drop functionality and real-time updates using Firestore."
            ]
        }
    ],
    skills: {
        programming: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
        design: ["System Design", "API Design", "UI/UX Principles"],
        tools: ["Git", "Docker", "AWS", "Jira", "Figma"]
    },
    customSections: []
};
