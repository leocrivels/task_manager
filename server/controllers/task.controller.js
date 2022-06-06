const db = require("../models");
const Task = db.tasks;

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }

  const task = new Task({
    name: req.body.name,
    end: req.body.end,
    project: new db.mongoose.Types.ObjectId(req.body.projectId)
  });

  task
    .save(task)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task.",
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Task.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks.",
      });
    });
};

// Retrieve all Tasks from the database by project id.
exports.findAllByProject = (req, res) => {
  const projectId = req.params.id;

  if(!projectId) {
    res.status(400).send({ message: "Project can not be empty!" });
    return;
  }

  const condition = {project: projectId}

  Task.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks.",
      });
    });
};

// Update a Task by the id in the request and when task is Done add Date to end field
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  let updatedTask = req.body;

  if (updatedTask.done){
    updatedTask = {...req.body, end: new Date()}
  }

  Task.findByIdAndUpdate(id, updatedTask, { useFindAndModify: false, returnDocument: "after" })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      } else {
        res.send({
          message: "Task was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};
