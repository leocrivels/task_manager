module.exports = app => {
    const projects = require("../controllers/project.controller.js");
    const { authJwt } = require("../middlewares");

    var router = require("express").Router();
    
    // Create a new Project
    router.post("/", projects.create);
    // Retrieve all Projects
    router.get("/", projects.findAll);
    // Update a Project with id
    router.put("/:id", projects.update);
    // Delete a Project with id
    router.delete("/:id", projects.delete);

    app.use('/api/projects',[authJwt.verifyToken], router);
  };