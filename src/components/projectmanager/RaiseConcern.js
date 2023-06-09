// importing the required modules and components

import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

// add concerns component
function AddConcerns({ projectId, setUpdates }) {
  let { register, getValues } = useForm();

  //state for modal
  let [show, setShow] = useState();

  // userObj
  let userObj = useSelector((state) => state.login);

  let token = sessionStorage.getItem("token");

  //function to open model
  const openModal = () => setShow(true);

  //function close model
  const closeModal = () => setShow(false);

  // Save changes
  const saveChanges = async () => {
    let concern = getValues();
    concern.concernRaisedDate = new Date();
    concern.projectId = projectId;
    concern.concernRaisedBy = userObj.userObj.userId;
    console.log(concern);
    let res = await axios.post(
      ` http://localhost:8080/manager-api/concern/${projectId}`,
      concern,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    closeModal();
    setUpdates(true);
    setTimeout(() => {
      setUpdates(false);
    }, 2000);
  };

  // returning the raise concern component
  return (
    <div className="container  m-auto">
      <div className=" container justify-content-center">
        <div className="bg-light  ms-5 p-3 rounded text-white">
          <h3 className="text-center text-success">Raise a Concern</h3>
          <p className="text-dark text-center fw-semibold">
            Raise a concern for this particular project
          </p>
          <div className="text-center">
            <button className="btn btn-warning fw-semibold" onClick={openModal}>
              Raise Concern
            </button>
          </div>
        </div>

        {/* modal to raise concern */}
        <Modal show={show} onHide={closeModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Raise Concern</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="m-3">
                <label className="form-label">Severity</label>
                <select
                  {...register("concernSeverity")}
                  className="form-control"
                  defaultValue="title"
                >
                  <option value="title">-- Severity of Concern --</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="m-3">
                <label className="form-label">Raised By Client</label>
                <select
                  {...register("concernByClient")}
                  className="form-control"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className="m-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  {...register("concernDesc")}
                  className="form-control"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" onClick={saveChanges}>
              Raise Concern
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

// exporting the component

export default AddConcerns;
