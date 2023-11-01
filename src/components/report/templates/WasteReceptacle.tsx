'use client'

import ReportHeader from './ReportHeader';



const WasteReceptacle = ({ data,level }:any) => {
  const handleFormName = (id:any) => {
    try {
      if (id == 1) {
        return `Colour coded bins`;
      } else if (id == 2) {
        return `Covered bins`;
      } else if (id == 3) {
        return `Open bins`;
      } else if (id == 4) {
        return `Polythene bags`;
      } else if (id == 5) {
        return `Sacks`;
      } else if (id == 6) {
        return `Metal container`;
      } else if (id == 7) {
        return `Bare ground`;
      } 
    } catch (error) {
      console.log(error);
    }
  };

  let  title = "WASTE RECEPTACLE"


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
                  <td>{handleFormName(dt.solidWasteReceptacleId)}</td>
                  <td>{dt._count.solidWasteReceptacleId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WasteReceptacle;
