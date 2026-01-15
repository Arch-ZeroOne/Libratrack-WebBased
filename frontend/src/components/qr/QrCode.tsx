import React from "react";
import QRCode from "react-qr-code";
import { DownloadIcon } from "../../icons";

import { useParams } from "react-router";
function QrCode() {
  const { id } = useParams();
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <div>
        <h1 className="text-2xl font-bold">Student QR Code</h1>
        <p>Scan the qr to log student</p>
      </div>
      <div className="flex flex-col items-center gap-7">
        <QRCode value={String(id)} size={200} />
        <button className="btn btn-neutral">
          Download Student QR <DownloadIcon fontSize={30} />
        </button>
      </div>
    </div>
  );
}

export default QrCode;
