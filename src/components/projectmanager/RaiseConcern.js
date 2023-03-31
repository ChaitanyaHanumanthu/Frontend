import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

function AddConcerns({ state }) {
  const projectId = state.projectId;
  console.log(projectId);

  let { handleSubmit, register, setValue, getValues } = useForm();

  //state for modal
  let [show, setShow] = useState();

  let token = sessionStorage.getItem("token");

  //function to open model
  const openModal = () => setShow(true);

  //function close model
  const closeModal = () => setShow(false);

  const saveChanges = async () => {
    let concern = getValues();
    concern.concernRaisedDate = new Date();
    concern.projectId = projectId;
    // concern.concernRaisedBy = 
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
  };

  return (
    <div className="container  m-auto">
      <div className=" container justify-content-center">
        <div className="bg-light  ms-5 p-3 rounded text-white">
          <h3 className="text-center text-success">Raise a Concern</h3>
          <p className="text-dark text-center">
            Raise a concern for this particular project
          </p>
          <div className=" m-auto">
            <button className="btn btn-warning " onClick={openModal}>
              Raise Concern
            </button>
          </div>
        </div>

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

export default AddConcerns;
