'use client'

import ReportHeader from './ReportHeader';



// Pipe-borne
// Protected hand dug well
// Unprotected hand dug well
// Rain Water
// River/stream
// Tanker service
// Borehole
// Mechanised Borehole
// Not applicable
const WaterSources = ({ data,level }:any) => {
  const handleFormName = (id:any) => {
    try {
      if (id == 1) {
        return `Pipe-borne`;
      } else if (id == 2) {
        return `Protected hand dug well`;
      } else if (id == 3) {
        return `Unprotected hand dug well`;
      } else if (id == 4) {
        return `Rain Water`;
      } else if (id == 5) {
        return `River/stream`;
      } else if (id == 6) {
        return `Tanker service`;
      } else if (id == 7) {
        return `Borehole`;
      } else if (id == 8) {
        return `Mechanised Borehole`;
      } else if (id == 9) {
        return `Not applicable`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  let  title = "WATER SOURCES"


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
              <th>Source</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((dt:any) => {
              return (
                <tr key={dt.id}>
                  {" "}
                  <td>{handleFormName(dt.waterSourceId)}</td>
                  <td>{dt._count.waterSourceId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WaterSources;
