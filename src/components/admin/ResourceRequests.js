import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function ResourceRequests() {
  // user Obj
  // let userObj = useSelector((state) => state.login);

  let [resourceRequests, setResourceRequests] = useState([]);

  // token from session storage
  let token = sessionStorage.getItem("token");

  const getResourceRequests = async () => {
    let res = await axios.get(
      `http://localhost:8080/admin-api/resourceRequests`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("response", res.data.payload);
    setResourceRequests(res.data.payload);
  };

  console.log("resources", resourceRequests);

  useEffect(() => {
    getResourceRequests();
  }, []);

  console.log("Resource requests: ", resourceRequests);
  return (
    <div className="container mt-5">
      <h4 className="text-center p-3 lead display-4 text-success fw-semibold">
        Resource Requests
      </h4>
      {resourceRequests.length == 0 ? (
        <div>
          <h3 className="text-danger text-center">No Resource Requests</h3>
        </div>
      ) : (
        <div className="container text-center">
          <table className="table table-bordered">
            <thead className="fw-bold table-dark  ">
              <tr>
                <td>Gdo Id</td>
                <td>Project Id</td>
                <td>Resource Request</td>
              </tr>
            </thead>
            <tbody className="table-light fw-semibold">
              {resourceRequests?.map((resource, index) => (
                <tr>
                  <td>{resource.gdoId}</td>
                  <td>{resource.projectId}</td>
                  <td>{resource.requestDesc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="container text-end">
        <NavLink className="text-secondary p-5" to="/admin">
          Back to Projects
        </NavLink>
      </div>
    </div>
  );
}

export default ResourceRequests;
