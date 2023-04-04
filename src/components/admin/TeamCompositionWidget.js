import React from "react";

function TeamCompositionWidget({ projectDetails }) {
  let teamMembers = projectDetails?.projectTeams;
  console.log("team", projectDetails?.projectTeams);
  return (
    <div>
      <div className="container bg-light p-2 mt-5">
        <h4 className="text-center p-1">Team Composition </h4>
        {teamMembers?.length == 0 || teamMembers == undefined ? (
          <h4 className="text-danger text-center m-4 p-4"> No One is Added </h4>
        ) : (
          <table className="table container bg-light table-bordered">
            <thead className="table-dark">
              <tr>
                <td>Name</td>
                <td>Role</td>
                <td>Start Date</td>
                <td>End date</td>
                <td> Allocation type</td>
                <td>Billing status</td>
              </tr>
            </thead>
            <tbody>
              {teamMembers?.map((Team, index) => (
                <tr key={index}>
                  <td>{Team.firstName}</td>
                  <td>{Team.role}</td>
                  <td>{Team.startDate}</td>
                  <td>{Team.endDate}</td>
                  <td>{Team.allocationType}</td>
                  <td>{Team.billingStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TeamCompositionWidget;
