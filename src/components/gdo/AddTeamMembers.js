import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Button,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";

// Function
function AddTeamMembers({ url, projectId, setUpdates }) {
  let { register, reset, handleSubmit } = useForm();

  // token
  let token = sessionStorage.getItem("token");

  // states for add team modal
  let [show, setShow] = useState();

  // state to store the employees
  let [employees, setEmployees] = useState([]);

  // error message
  let [errMessage, setErrMessage] = useState("");

  // functions to open and close modals
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  // getting all the employees in database
  const getEmployees = async () => {
    try {
      let employees = await axios.get(
        `http://localhost:8080/user-api/employees`
      );
      setEmployees(employees.data.payload);
      console.log("employees", employees.data.payload);
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  // onSubmit Function
  const addTeamMembers = async (userData) => {
    userData.projectId = projectId;
    let addTeam = await axios.post(url, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("added");
    console.log(addTeam.data);
    setUpdates(true);
    setTimeout(() => {
      setUpdates(false);
    }, 2000);
    reset();
    closeModal();
  };

  // useEffect to load the employees data
  useEffect(() => {
    getEmployees();
  }, []);
  // return the component
  return (
    <div>
      <div className="row">
        <div className="rounded fw-semibold text-center m-auto bg-light col-10  col-sm-10 col-md-10">
          <h3 className="mt-4 pt-4 pb-3">Add Team Members </h3>
          <p>Here you can add the team members for the respective project</p>
          <button className="btn btn-success mb-4" onClick={openModal}>
            Add Team
          </button>
        </div>
        <Modal show={show} onHide={closeModal} backdrop="static">
          <ModalHeader>
            {/* <ModalTitle>Add Team Members</ModalTitle> */}
          </ModalHeader>
          <ModalBody>
            <form
              action=""
              className="container"
              onSubmit={handleSubmit(addTeamMembers)}
            >
              <div>
                <label htmlFor="empName" className="form-label">
                  Select Employee
                </label>
                <select htmlFor="empName" className="form-select">
                  Employee
                  <option value="">Select Employee </option>
                  {employees.map((employee, index) => (
                    <option value={employee.empId} key={employee.empId}>
                      {employee.empName}- {employee.empId}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  {...register("firstName", { required: true })}
                /> */}
              </div>

              <div>
                <label htmlFor="role" className="form-label">
                  Role of the Employee
                </label>
                <select
                  name="role"
                  id="role"
                  {...register("role")}
                  className="form-select"
                  defaultValue="title"
                >
                  <option value="title"> -- Role --</option>
                  <option value="qa">QA</option>
                  <option value="dev">DEV</option>
                  <option value="product">Product</option>
                  <option value="management">Management</option>
                  <option value="devops">Devops</option>
                </select>
              </div>
              <div>
                <label htmlFor="startDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register("startDate")}
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  {...register("endDate")}
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="exposed" className="form-label">
                  Billing Status
                </label>
                <select
                  name="billingStatus"
                  id="customer"
                  className="form-select mb-3"
                  {...register("billingStatus")}
                  defaultValue="title"
                >
                  <option value="title"> -- Billing Status --</option>
                  <option value="yes">Billed</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="exposed" className="form-label">
                  Allocation Type
                </label>
                <select
                  name="allocationType"
                  id="customer"
                  className="form-select mb-3"
                  {...register("allocationType")}
                  defaultValue="title"
                >
                  <option value="title"> -- Allocation Type --</option>
                  <option value="yes">Permanent</option>
                  <option value="no">Temporary</option>
                </select>
              </div>
              <div>
                <label htmlFor="exposed" className="form-label">
                  Exposed To Customer
                </label>
                <select
                  name="exposedToCustomer"
                  id="customer"
                  className="form-select mb-3"
                  {...register("exposedToCustomer")}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="text-center">
                <button className="btn btn-warning text-center">
                  Add Team
                </button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="danger" onClick={closeModal}>
              close
            </Button>
            {/* <Button variant="success" onClick={addTeamMembers}>
                Add Team
              </Button> */}
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default AddTeamMembers;
