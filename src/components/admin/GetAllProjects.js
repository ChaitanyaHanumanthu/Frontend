import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function GetAllProjects({ url, api }) {
  // importing from useForm
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  // userObj
  let userObj = useSelector((state) => state.login);
  console.log("User", userObj.userObj);

  // projects
  let [projects, setProjects] = useState([]);

  let [deleteStatus, setDeleteStatus] = useState(false);

  // state to re-render the project details component
  let [projectUpdate, setProjectUpdate] = useState(false);

  let [show, setShow] = useState(false);

  let openModal = () => setShow(true);
  let closeModal = () => setShow(false);

  const editModal = (project) => {
    openModal();
    console.log("project Id", project.projectId);
    setValue("projectId", project.projectId);
    setValue("projectName", project.projectName);
    setValue("client", project.client);
    setValue("startDate", project.startDate);
    setValue("clientAccountManager", project.clientAccountManager);
    setValue("domainOfProject", project.domainOfProject);
    setValue("typeOfProject", project.typeOfProject);
    setValue("GdoId", project.GdoId);
    setValue("projectManager_id", project.projectManager_id);
  };

  //  Navigate;
  let navigate = useNavigate();

  // Error message
  let [errMessage, setErrMessage] = useState("");

  // token
  let token = sessionStorage.getItem("token");

  // get all the projects
  const getProjects = async () => {
    let projects = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(projects.data.Projects);
    setProjects(projects.data.Projects);
  };

  console.log("projects", projects);

  // for deleting a specific project
  const deleteProjects = async (projectId) => {
    let projects = await axios.put(
      `http://localhost:8080/admin-api/project/${projectId}`,
      { status: false },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("status", projects);
    setDeleteStatus(true);
  };

  const [managers, setManagers] = useState({ gdo: [], managers: [], hr: [] });

  //Get all managers
  const getData = async () => {
    let res = await axios.get("http://localhost:8080/user-api/managers");
    console.log(res.data);
    setManagers(res.data);
  };
  //fetch managers after first render
  useEffect(() => {
    getData();
  }, []);

  // for edit the projects
  const saveChanges = async () => {
    try {
      let projectDetails = getValues();
      console.log("project details", projectDetails);
      let project = await axios.put(
        `http://localhost:8080/admin-api/update-project/${projectDetails.projectId}`,
        projectDetails,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("project", project);
      getProjects();
      closeModal();
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  // load the projects
  useEffect(() => {
    getProjects();
  }, [deleteStatus]);

  return (
    <div>
      <div>
        {api == "admin-api" && (
          <div className="nav">
            <li className="nav-link">
              <NavLink
                className="nav-item text-white text-decoration-none active p-2 fw-bold"
                to={"add-project"}
              >
                Add Project
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                className="nav-item text-white text-decoration-none active p-2 fw-bold"
                to="resource-requests"
              >
                Resource Requests
              </NavLink>
            </li>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-center mt-5">
          Welcome Back {userObj.userObj.firstName}
        </h2>
      </div>
      {projects?.length == 0 || projects == undefined ? (
        <div>
          <h5 className="text-danger text-center mt-5">
            There are no projects
          </h5>
        </div>
      ) : (
        <div className="container mt-5 text-center">
          <h4 className="text-center mt-5 mb-3">Here is the all Projects</h4>
          <table className="table table-striped table-bordered">
            <thead className="text-bg-dark">
              <tr>
                <td>ProjectName</td>
                <td>Client</td>
                <td>Fitness Indicator</td>
                <td>Manager</td>
                <td>Start Date</td>
                <td>Status</td>
                {/* <td>updates</td> */}
                <td>View </td>
                {api == "admin-api" && <td> Action</td>}
              </tr>
            </thead>
            <tbody>
              {projects?.map((project, index) => (
                <tr key={index}>
                  {console.log("project data", project)}
                  <td>{project.projectName}</td>
                  <td>{project.client}</td>
                  <td>{project.projectFitnessIndicator}</td>
                  <td>{project.projectManager_id}</td>
                  <td>{project.startDate}</td>
                  <td>{project.statusOfProject}</td>
                  {/* <td>{project.updates.length}</td> */}
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        navigate(`detailed-view/${project.projectId}`, {
                          state: {
                            projectId: project.projectId,
                            api: api,
                          },
                        });
                      }}
                    >
                      View
                    </button>
                  </td>
                  {api == "admin-api" && (
                    <td>
                      <div className="text-center">
                        <button
                          className="btn btn-sm btn-warning me-3 mb-2"
                          onClick={() => editModal(project)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            deleteProjects(project.projectId);
                          }}
                        >
                          {console.log(project.projectId)}Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* modal to edit the project details */}
      <Modal show={show} onHide={closeModal} backdrop="static">
        <ModalHeader>
          <ModalTitle>Edit Project Details</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div>
            <form className="form">
              {/* Input field for Project name */}
              <div className="m-3">
                <input
                  type="text"
                  className="form-control"
                  {...register("projectName", {
                    required: "Project is required",
                  })}
                  placeholder="Project Name"
                />
              </div>

              {/* Client input  */}
              <div className="m-3">
                <input
                  type="text"
                  className="form-control"
                  {...register("client", { required: "Client is required" })}
                  placeholder="Client"
                />
              </div>

              {/* Start date */}
              <div className="m-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("startDate", {
                    required: "Start date is required",
                  })}
                  placeholder="Start Date"
                />
              </div>

              {/* Client manager input field */}
              <div className="m-3">
                <input
                  type="text"
                  className="form-control"
                  {...register("clientAccountManager", {
                    required: "Client Account Manager is required",
                  })}
                  placeholder="Client Manager"
                />
              </div>

              {/* Domain of Project */}
              <div className="m-3">
                <select
                  className="form-control"
                  {...register("domainOfProject", {
                    required: "Domain of project is required",
                  })}
                  defaultValue="title"
                >
                  <option value="title" disabled>
                    --- Select Domain of project ---
                  </option>
                  <option value="Artificial intelligence">
                    Artificial intelligence
                  </option>
                  <option value="Web Technology">Web Technology</option>
                  <option value="Data Science">Data Science</option>
                  <option value="IoT">IoT</option>
                </select>
              </div>

              {/* Type of Project */}
              <div className="m-3">
                <select
                  className="form-control"
                  {...register("typeOfProject", {
                    required: "Type of project is required",
                  })}
                  defaultValue="title"
                >
                  <option value="title" disabled>
                    --- Select Type of project ---
                  </option>
                  <option value="Development">Development</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Test Automation">Test Automation</option>
                  <option value="Performance Testing">
                    Performance Testing
                  </option>
                  <option value="Security">Security</option>
                  <option value="Sustenance Engineering">
                    Sustenance Engineering
                  </option>
                  <option value="Mobility">Mobility</option>
                  <option value="Storage">Storage</option>
                </select>
              </div>

              {/* GDO field */}
              <div className="m-3">
                <select
                  className="form-control"
                  {...register("GdoId", { required: "GDO is required" })}
                  defaultValue="title"
                >
                  <option value="title">
                    --- Select GDO for the project ---
                  </option>
                  {managers?.gdo.map((gdo, index) => (
                    <option key={index} value={gdo.userId}>
                      {gdo.firstName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Manager field */}
              <div className="m-3">
                <select
                  className="form-control"
                  {...register("projectManager_id", {
                    required: "Project Manager is required",
                  })}
                  defaultValue="title"
                >
                  <option value="title">
                    --- Select Project Manager for the project ---
                  </option>
                  {managers.managers.map((manager, index) => (
                    <option key={index} value={manager.userId}>
                      {manager.firstName}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary me-3" onClick={closeModal}>
            Close
          </button>
          <button className="btn btn-info me-3" onClick={saveChanges}>
            Save Changes
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default GetAllProjects;
