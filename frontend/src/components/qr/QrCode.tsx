import React from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router";
function QrCode() {
  const { id } = useParams();
  return (
    <div>
      <QRCode value="1234" />
    </div>
  );
}

export default QrCode;
