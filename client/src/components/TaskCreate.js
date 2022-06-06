import React, { useState } from "react";
import taskService from "../services/task.service";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFormik } from "formik";
import * as Yup from "yup";

const TaskCreate = ({ project, onCreate }) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Task name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (data, { resetForm }) => {
      setLoading(true);
      const newTask = { ...data, projectId: project.id };

      taskService.postTask(newTask).then((newTask) => {
        setLoading(false);
        onCreate(newTask.data);
        resetForm();
      });
    },
  });

  return (
    <Card className="p-2 m-4"
    style={{ backgroundColor: "#f2f2f2" }}>
      <form
        onSubmit={formik.handleSubmit}
      >
        <div>New Task:</div>
        <Stack direction="horizontal" className="gap-3">
          <input
            type="text"
            className="form-control me-auto"
            placeholder="Description"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <div className="form-group ms-auto">
            <Button variant="primary" disabled={loading} type="submit">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Create</span>
            </Button>
          </div>

          <Button style={{ display: "none" }} />
        </Stack>
        <div className="text-danger">
          {formik.errors.name ? formik.errors.name : null}
        </div>
      </form>
    </Card>
  );
};
export default TaskCreate;
