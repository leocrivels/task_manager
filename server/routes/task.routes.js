module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
    const { authJwt } = require("../middlewares");

    var router = require("express").Router();
    
    // Create a new Task
    router.post("/", tasks.create);
    // Retrieve all Tasks by projectId
    router.get("/project/:id", tasks.findAllByProject);
    // Update a Task with id
    router.put("/:id", tasks.update);
    // Delete a Task with id
    router.delete("/:id", tasks.delete);

    app.use('/api/task',[authJwt.verifyToken], router);
  };