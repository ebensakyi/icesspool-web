'use client'

import ReportHeader from "./ReportHeader";

const ApprovedWasteReceptacle = ({ data, level }:any) => {
  let title = "APPROVED WASTE RECEPTACLE";



  return (

      <div className="card" id="printableArea">
        <ReportHeader title={title} level={level} />
        <div className="card-body">
          <div className="col-sm"></div>
          <br />
          <table
            id="fixed-header"
            className="table table-bordered dt-responsive nowrap table-striped align-middle"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Form</th>
                <th>Approved</th>
                <th>Unapproved</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((dt:any) => {
                return (
                  <tr key={dt.id}>
                    {" "}
                    <td>{dt.name}</td>
                    <td>{dt.approved}</td>
                    <td>{dt.unapproved}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default ApprovedWasteReceptacle;
