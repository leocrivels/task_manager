import React, { useState, useEffect } from "react";
import UserService from "../services/project.service";
import Project from "./Project";
import ProjectCreate from "./ProjectCreate";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  // Get all projects by authenticated user on LocalStorage
  useEffect(() => {
    UserService.getUserProjects().then((data) => {
      setProjects(data.data);
    });
  }, []);

  // Add new Project from projects list state
  function addProject(newProject) {
    setProjects((projects) => [...projects, newProject]);
  }

  // Remove a Project from projects list state by ID
  function deleteProject(deletedProject) {
    const newProjects = projects.filter(
      (project) => project.id !== deletedProject.id
    );
    setProjects(newProjects);
  }

  return (
    <div className="container">
        
      {projects.map((project) => {
        return (
          <Project
            element={project}
            onDelete={deleteProject}
            key={project.id}
          ></Project>
        );
      })}

      <ProjectCreate onCreate={addProject}></ProjectCreate>

    </div>
  );
};
export default ProjectList;
