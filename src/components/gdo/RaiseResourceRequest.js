// importing the required modules
import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function RaiseResourceRequest({ projectId, setUpdates }) {
  let userObj = useSelector((state) => state.login);

  let { register, reset, getValues } = useForm();

  //state for modal
  let [show, setShow] = useState();

  let token = sessionStorage.getItem("token");

  //function to open model
  const openModal = () => setShow(true);

  //function close model
  const closeModal = () => setShow(false);


  // function to save the changes
  const saveChanges = async () => {
    let resourceRequest = getValues();
    resourceRequest.projectId = projectId;
    resourceRequest.gdoId = userObj.userObj.userId;
    console.log("Gello", userObj.userObj.userId);
    let res = await axios.post(
      ` http://localhost:8080/gdo-api/gdo/${userObj.userObj.userId}/raise-resource-request`,
      resourceRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    closeModal();
  };

  // returning the resource request components
  return (
    <div className=" row">
      <div className="rounded fw-semibold text-center bg-light col-10  col-sm-10 m-auto col-md-10">
        <h3 className="mt-4 pt-4 pb-3">Raise a Resource Request </h3>
        <p>Here you can raise a resource request for this project</p>
        <button className="btn btn-success mb-4" onClick={openModal}>
          Raise Request
        </button>
      </div>

      <Modal show={show} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <div>Raise a Resource Request</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-control">
            <div className="m-3">
              <label className="form-label">Resource Request</label>
              <textarea
                {...register("requestDesc")}
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
          <Button variant="success" onClick={saveChanges}>
            Raise Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


// exporting the component
export default RaiseResourceRequest;
