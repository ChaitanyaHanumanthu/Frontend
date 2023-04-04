import "./RaiseUpdate.css";
import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function AddConcerns({ projectId, setUpdates }) {
  let userObj = useSelector((state) => state.login);

  let { register, getValues } = useForm();

  //state for modal
  let [show, setShow] = useState();

  let token = sessionStorage.getItem("token");

  //function to open model
  const openModal = () => setShow(true);

  //function close model
  const closeModal = () => setShow(false);

  const saveChanges = async () => {
    let concern = getValues();
    concern.date = new Date();
    concern.projectId = projectId;
    concern.userId = userObj.userObj.userId;
    let res = await axios.post(
      ` http://localhost:8080/manager-api/update/${projectId}`,
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
    }, 3000);
  };

  return (
    <div className="container  m-auto">
      <div className=" container justify-content-center">
        <div className="bg-light  ms-5 p-3 rounded text-white">
          <h2 className="text-center text-success">Raise a Update</h2>
          <p className="text-dark text-center fw-semibold">
            Raise a Update for this particular project
          </p>
          <div className="text-center">
            <button
              className="  justify-content-center btn btn-info fw-semibold"
              onClick={openModal}
            >
              Raise Update
            </button>
          </div>
        </div>

        <Modal show={show} onHide={closeModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>
              <div>Raise a Update</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-control">
              <div className="m-3">
                <label className="form-label">Shedule Status</label>
                <select
                  {...register("scheduleStatus")}
                  className="form-control"
                  defaultValue="title"
                >
                  <option value="title">-- Shedule Status --</option>
                  <option value="green">Greeen</option>
                  <option value="amber">Amber</option>
                  <option value="red">Red</option>
                </select>
              </div>

              <div className="m-3">
                <label className="form-label">Resourcing Status</label>
                <select
                  {...register("resourcingStatus")}
                  className="form-control"
                  defaultValue="title"
                >
                  <option value="title">-- Resource Status --</option>
                  <option value="green">Greeen</option>
                  <option value="amber">Amber</option>
                  <option value="red">Red</option>
                </select>
              </div>

              <div className="m-3">
                <label className="form-label">Quality Status</label>
                <select
                  {...register("qualityStatus")}
                  className="form-control"
                  defaultValue="title"
                >
                  <option value="title">-- Quality Status --</option>
                  <option value="green">Greeen</option>
                  <option value="amber">Amber</option>
                  <option value="red">Red</option>
                </select>
              </div>

              <div className="m-3">
                <label className="form-label">Waiting for Client Inputs</label>
                <select
                  {...register("waitingForClientInput")}
                  className="form-control"
                  defaultValue="title"
                >
                  <option value="title">-- Client Inputs --</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className="m-3">
                <label className="form-label">Project Status</label>
                <textarea
                  {...register("projectStatusUpdate")}
                  className="form-control"
                  rows="5"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success"  onClick={saveChanges}>
              Raise Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AddConcerns;
