// @ts-nocheck

'use client'
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/navigation";

const ReportHeader = ({ title, level }:any) => {
  var dateString = moment().format("DD/MM/yyyy HH:mm a");

  const capitalize = (str:string) => {
    return str.toUpperCase();
  };
  const router = useRouter();

  const downloadInspection = async () => {

    const printContents = document.getElementById("printableArea").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    router.reload(window?.location?.pathname);
  };

  return (
    <>
      {" "}
      <div>
        <button
          type="button"
          className="btn btn-danger btn-label waves-effect right waves-light rounded-pill"
          onClick={() => downloadInspection()}
        >
          <i className="ri-file-pdf-line label-icon align-middle rounded-pill fs-16 ms-2"></i>
          Download Report
        </button>
      </div>
      <br />
      <div className="card-header" style={{ margin: "auto" }}>
        <center>
          <Image
            src="/assets/img/logo.png"
            alt="title"
            width={120}
            height={100}
            quality={100}
          />
        </center>
        <h5 className="card-title mb-0">
          {" "}
          EXPANDED SANITARY INSPECTIONS COMPLIANCE APPLICATION
        </h5>
        <center>
          <h5 className="card-title mb-0">{title}</h5>
        </center>
        <center>{/* <h6 >REPORT FOR {capitalize(level)}</h6> */}</center>
        <center>Report Generated On: {dateString}</center>
      </div>{" "}
    </>
  );
};

export default ReportHeader;
