'use client'

import ReportHeader from "./ReportHeader";

const WasteCollectionType = ({ data, level }:any) => {
  const handleFormName = (id:any) => {
    try {
      if (id == 1) {
        return `Communal container`;
      } else if (id == 2) {
        return `Door to door`;
      } else if (id == 3) {
        return `Not serviced`;
      } else if (id == 4) {
        return "Communal Dump Site";
      }
    } catch (error) {
      console.log(error);
    }
  };

  let title = "WASTE COLLECTION TYPE";
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
              <th>Collection Type</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((dt:any) => {
              return (
                <tr key={dt.id}>
                  {" "}
                  <td>{handleFormName(dt.wasteCollectionTypeId)}</td>
                  <td>{dt._count.wasteCollectionTypeId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WasteCollectionType;
