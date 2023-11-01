'use client'

import ReportHeader from "./ReportHeader";

const SubmissionSummary = ({ data, level }: any) => {

  
  const handleFormName = (formId: any) => {
    try {
      if (formId == 1) {
        return `RESIDENTIAL PREMISES`;
      } else if (formId == 2) {
        return `EATING & DRINKING PREMISES`;
      } else if (formId == 3) {
        return `HEALTH PREMISES`;
      } else if (formId == 4) {
        return `HOSPITALITY PREMISES`;
      } else if (formId == 5) {
        return `INSTITUTION PREMISES`;
      } else if (formId == 6) {
        return `INDUSTRY PREMISES`;
      } else if (formId == 7) {
        return `MARKETS & LORRY PARK PREMISES`;
      } else if (formId == 8) {
        return `SANITARY FACILITY PREMISES`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  let title = "SUBMISSION SUMMARY";
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
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt: any) => {
              return (
                <tr key={dt.id}>
                  {" "}
                  <td>{handleFormName(dt.inspectionFormId)}</td>
                  <td>{dt._count.inspectionFormId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionSummary;
