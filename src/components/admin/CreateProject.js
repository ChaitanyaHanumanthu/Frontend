import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

function CreateProject() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [managers, setManagers] = useState({ gdo: [], managers: [], hr: [] });

  let [registrationResponse, setRegistrationResponse] = useState("");

  let navigate = useNavigate();

  //Get token from browser storage
  let token = sessionStorage.getItem("token");

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

  //function to handle registration
  const handleAddProject = async (project) => {
    project.statusOfProject = "In progress";

    //Send API request
    let res = await axios.post(
      "http://localhost:8080/admin-api/project",
      project,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("from ", res.data);
    //if project insertedd successfully inserted
    if (res.data.message === "Project is created and assigned") {
      navigate("/admin");
    }
  };

  return (
    <div className="">
      <div className="w-50 mx-auto shadow rounded p-3 ">
        {registrationResponse !== "" && <p>{registrationResponse}</p>}
        <div className="m-3">
          <h1 className="text-center">Add Project </h1>
        </div>

        <form className="form" onSubmit={handleSubmit(handleAddProject)}>
          {/* Input field for Project name */}
          <div className="m-3">
            <input
              type="text"
              className="form-control"
              {...register("projectName", { required: "Project is required" })}
              placeholder="Project Name"
            />
            {errors.name && (
              <p className="text-danger text-start ms-2">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Client input  */}
          <div className="m-3">
            <input
              type="text"
              className="form-control"
              {...register("client", { required: "Client is required" })}
              placeholder="Client"
            />
            {errors.email && (
              <p className="text-danger text-start ms-2">
                {errors.email.message}
              </p>
            )}
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
            {errors.client_account_manager && (
              <p className="text-danger text-start ms-2">
                {errors.client_account_manager.message}
              </p>
            )}
          </div>

          {/* project Fitness Indicator */}
          <div className="m-3">
            <select
              name="projectFitnessIndicator"
              {...register("projectFitnessIndicator", {
                required: "Fitness Indicator should be mentioned",
              })}
              defaultValue="title"
              className=" form-select"
            >
              <option value="title"> -- Select Project Fitness --</option>
              <option value="Amber">Amber</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
            </select>
          </div>

          {/* Domain of Project */}
          <div className="m-3">
            <select
              className="form-select"
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
              className="form-select"
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
              <option value="Performance Testing">Performance Testing</option>
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
              className="form-select"
              {...register("GdoId", { required: "GDO is required" })}
              defaultValue="title"
            >
              <option value="title">--- Select GDO for the project ---</option>
              {managers.gdo.map((gdo, index) => (
                <option key={index} value={gdo.userId}>
                  {gdo.firstName}
                </option>
              ))}
            </select>
          </div>

          {/* Project Manager field */}
          <div className="m-3">
            <select
              className="form-select"
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

          {/* Submit button */}
          <div className="m-3">
            <button className="btn btn-success d-block w-100 mx-auto">
              Add Project
            </button>
          </div>
        </form>
        <div className="text-end">
          <NavLink className="text-decoration-none" to="/admin">
            <p className="text-secondary fw-semibold">Back To Projects</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
