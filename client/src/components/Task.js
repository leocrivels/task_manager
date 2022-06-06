import React, { useState } from "react";
import TaskService from "../services/task.service";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useFormik } from "formik";
import * as Yup from "yup";

const Task = ({ element, onDelete, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(element);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Task Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: task.name,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (data, { resetForm }) => {
      setEditLoading(true);
      const editedTask = { ...task, name: data.name };

      TaskService.editTask(editedTask)
        .then(() => {
          setEditLoading(false);
          setTask(editedTask);
          resetForm();
        })
        .catch((e) => {
          console.log("Fail to edit Task", e);
        });

    },
  });

  const handleEdit = () => {
    if (isEditing) {
      formik.handleSubmit();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    TaskService.deleteTask(task.id)
      .then(() => {
        setDeleteLoading(false);
        if (onDelete) {
          onDelete(task);
        }
      })
      .catch((e) => {
        console.log("Fail to edit Task", e);
      });
  };

  const setDone = () => {
    const editedTask = { ...task, done: !task.done };
    TaskService.editTask(editedTask)
      .then((data) => {
        console.log("data", data);
        setTask(data.data);
        if (onChange) {
          onChange(data.data);
        }
      })
      .catch((e) => {
        console.log("Fail to edit Task", e);
      });
  };

  const renderTooltip = (props) => {
    return (
      <Tooltip id="Button-tooltip" {...props} show={false}>
        {new Date(task.end).toLocaleString()}
      </Tooltip>
    );
  };

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >

      {({ ref, ...triggerHandler }) => {
        triggerHandler = task.done ? triggerHandler : null;
        return (
          <Stack direction="horizontal" {...triggerHandler}>
            <Form.Check type="checkbox" id="defaultCheck1" readOnly={task.done}>

              <Form.Check.Input
                ref={ref}
                checked={task.done}
                readOnly={task.done}
                onChange={task.done ? null : setDone}
              />

              <Form.Check.Label>
                {!isEditing ? (
                  <div className="my-auto">
                    <h5 className="mx-2 my-auto">{task.name}</h5>
                  </div>
                ) : (
                  <div className="my-auto">

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />

                    <div className="text-danger">
                      {formik.errors.name ? formik.errors.name : null}
                    </div>
                  </div>
                )}
              </Form.Check.Label>

            </Form.Check>
            {!task.done &&
              <div className="my-auto ms-auto">

                <Button
                  variant="primary"
                  size="sm"
                  className="mx-1"
                  disabled={false}
                  onClick={() => handleEdit()}
                >
                  {editLoading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>{isEditing ? "ok" : "edit"}</span>
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  className="mx-1"
                  disabled={false}
                  onClick={() => handleDelete()}
                >
                  {deleteLoading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>delete</span>
                </Button>

              </div>
            }
          </Stack>
        );
      }}
    </OverlayTrigger>
  );
};
export default Task;
