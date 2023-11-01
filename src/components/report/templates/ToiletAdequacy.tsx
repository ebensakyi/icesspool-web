'use client'

import ReportHeader from "./ReportHeader";

// Pipe-borne
// Protected hand dug well
// Unprotected hand dug well
// Rain Water
// River/stream
// Tanker service
// Borehole
// Mechanised Borehole
// Not applicable
const ToiletAdequacy = ({ data,level }:any) => {
 
  let title = "TOILET ADEQUACY";

  return (
    <div className="card" id="printableArea">
    <ReportHeader title={title} level={level}/>
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
              <th>Adequate</th>
              <th>Not Adequate</th>
              {/* <th>Total</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((dt:any) => {
              return (
                <tr key={dt.id}>
                  {" "}
                  <td>{dt.name}</td>
                  <td>{dt.adequate}</td>
                  <td>{dt.inadequate}</td>
                  {/* <td>{dt.available + dt.notAvailable}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToiletAdequacy;
