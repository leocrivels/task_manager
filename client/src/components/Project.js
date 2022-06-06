import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProjectService from "../services/project.service";
import TaskList from "./TaskList";
import { useFormik } from "formik";
import * as Yup from "yup";

const Project = ({ element, onDelete }) => {
  const [project, setProject] = useState(element);
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Project Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: project.name,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (data) => {
      setEditLoading(true);
      const editedProject = { ...project, name: data.name };
      ProjectService.editProject(editedProject)
        .then(() => {
          setEditLoading(false);
          setProject(editedProject);
          setIsEditing(false);
        })
        .catch((e) => {
          console.log("Fail to edit Project", e);
        });
    },
  });

  const handleEdit = () => {
    if (isEditing) {
      formik.handleSubmit();
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    ProjectService.deleteProject(project.id)
      .then(() => {
        setDeleteLoading(false);
        if (onDelete) {
          onDelete(project);
        }
      })
      .catch((e) => {
        console.log("Fail to edit Task", e);
      });
  };

  return (
    <Card className="m-2 p-2" key={project.id}>
      <Stack direction="horizontal">
        {!isEditing ? (
          <h2 className="mx-2 my-2 me-auto">{project.name.toUpperCase()}</h2>
        ) : (
          <div className="my-auto my-2 me-auto">
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
        )}

        <Button
          variant="outline-primary"
          size="sm"
          className="mx-1"
          disabled={editLoading}
          type={isEditing ? "submit" : "Button"}
          onClick={() => handleEdit(project.id)}
        >
          {editLoading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>{isEditing ? "ok" : "edit"}</span>
        </Button>

        <Button
          size="sm"
          variant="danger"
          className="mx-1"
          disabled={deleteLoading}
          onClick={handleDelete}
        >
          {deleteLoading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>delete</span>
        </Button>
      </Stack>

      <div className="text-danger">
        {formik.errors.name ? formik.errors.name : null}
      </div>

      <TaskList project={project}></TaskList>
    </Card>
  );
};
export default Project;
