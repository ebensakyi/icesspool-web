'use client'

import ReportHeader from './ReportHeader';

const ActionSummary = ({ data,level }:any) => {

  const handleFormName = (id:any) => {
    try {
      if (id == 1) {
        return `Hygiene Education`;
      } else if (id == 2) {
        return `Notice Served`;
      } else if (id == 3) {
        return `Criminal Summons`;
      }
    } catch (error) {
      console.log(error);
    }
  };



  let  title = "ACTIONS TAKEN SUMMARY"


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
              <th>Action</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((dt:any) => {
              return (
                <tr key={dt.id}>
                  {" "}
                  <td>{handleFormName(dt.actionId)}</td>
                  <td>{dt._count.actionId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActionSummary;
