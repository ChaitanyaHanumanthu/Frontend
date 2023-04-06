// importing the required modules and components
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

// registered users components
function RegisteredUsers() {
  // state from the slice
  let userObj = useSelector((state) => state.login);

  // state to store the users data
  let [availableUsers, setAvaiableUsers] = useState([]);
  // delete
  let [deleteProfile, setDeleteProfile] = useState("false");

  let [updated, setUpdated] = useState(false);

  // token from the session storage
  let token = sessionStorage.getItem("token");

  // function to get all the users
  const getAllUsers = async (req, res) => {
    let response = await axios.get(
      "http://localhost:8080/super-admin-api/users",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAvaiableUsers(response.data.users);
    setUpdated("false");
  };

  let {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  // show modal state
  let [showModal, setShowModal] = useState(false);

  let [modifiedUsers, setModifiedUsers] = useState();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // edit modal
  const editModal = (user) => {
    openModal();
    // setting the values
    setValue("userId", user.userId);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("email", user.email);
    setValue("role", user.role);
  };

  // save user
  const saveUser = async () => {
    // getting values form edited form
    let modifiedUsers = getValues();
    console.log("modified", modifiedUsers);
    console.log("token", token);

    let res = await axios.put(
      `http://localhost:8080/super-admin-api/role-update/${modifiedUsers.userId}`,
      modifiedUsers,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // close model
    closeModal();
    console.log("response", res);
    setModifiedUsers(res.data.payload);
    setUpdated("true");
  };

  // Delete the user
  const deleteUser = async (userId) => {
    let deleteProfile = await axios.delete(
      `http://localhost:8080/super-admin-api/delete/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("deleted");
    await getAllUsers();
    setDeleteProfile(true);
  };

  // to get all the users
  useEffect(() => {
    getAllUsers();
  }, [updated]);

  // returning the registered users components
  return (
    <div>
      <h3 className="text-center">Registered Users</h3>
      <div className="container mt-5">
        <table className="table table-responsive table-light table-bordered text-center ">
          <thead className="table-dark fw-bold">
            <tr>
              <td>User ID</td>
              <td>First Name</td>
              <td>Email</td>
              <td>Role</td>
              <td> Status</td>
            </tr>
          </thead>

          {/* tbody */}
          <tbody>
            {availableUsers.map((user, index) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-3"
                    onClick={() => {
                      editModal(user);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => deleteUser(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal to edit user */}
      <Modal show={showModal} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" className="p-2">
            {/* name */}
            <label htmlFor="firstName" className="mt-3 fw-bold">
              First Name
            </label>
            <input
              type="text"
              placeholder="Name"
              id="firstName"
              disabled
              className="form-control mt-2 mb-2"
              {...register("firstName", { required: true })}
            />

            {/* last Name */}
            {/* name */}
            <label htmlFor="lastName" className="mt-2 fw-bold">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Name"
              id="lastName"
              disabled
              className="form-control mt-2 mb-2"
              {...register("lastName", { required: true })}
            />

            {/* email */}
            <label htmlFor="email" className="fw-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              disabled
              id="email"
              className="form-control mt-2 mb-2"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-danger"> Email is mandatory</p>
            )}

            {/* Role */}
            <div className="dropdown">
              <label htmlFor="email" className="fw-bold">
                Role
              </label>
              <select
                defaultValue={userObj.role}
                name="role"
                placeholder="Role"
                id="role"
                className="form-control form-select mt-2 mb-2"
                {...register("role", { required: true })}
              >
                <option value="gdo">GDO</option>
                <option value="admin">ADMIN</option>
                <option value="superadmin">SUPER ADMIN</option>
                <option value="manager">PROJECT MANAGER</option>
                <option value="hr">HR</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>

          {/* to close */}
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>

          {/* to save changes */}
          <Button variant="primary" onClick={saveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// exporting the registered users
export default RegisteredUsers;
