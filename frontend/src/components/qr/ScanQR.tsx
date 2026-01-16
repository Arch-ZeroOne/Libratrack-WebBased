import { useEffect } from "react";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { CreateConfigProps, ComponentCallbackProps } from "../../types/qrcode";
import { Log } from "../../types/logs";
import client from "../../axiosClient";
//TODO
//Implement Logging of student through qr

// React Grid Logic
import { useState, useRef } from "react";
// Theme
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

import { QRCodeIcon } from "../../icons";

ModuleRegistry.registerModules([AllCommunityModule]);

//settings for camera
const createConfig = (props: ComponentCallbackProps) => {
  let config: CreateConfigProps = {
    fps: 0,
    qrbox: 0,
    aspectRatio: 0,
    disableFlip: false,
  };

  //How fast camera looks for qr codes
  if (props.fps) {
    config.fps = props.fps;
  }

  //The size of the square that we will aim or the actual qr code
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }

  //Width or height for camera display
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }

  //Wether tp prevent horizontal flippinf
  if (props.disableFlip) {
    config.disableFlip = props.disableFlip;
  }

  return config;
};

const HTML5QrCodePlugin = (props: ComponentCallbackProps) => {
  const qrCodeRegionId = "html5qr-code-full-region";

  //Declare ref for scanner as it is asynchronous
  const scannerRef = useRef<Html5QrcodeScanner | null | undefined>(null);
  const scannerStart = useRef(false);
  //Initialized to hold a global reference

  useEffect(() => {
    console.log(scannerStart.current);
    const startScan = () => {
      //Creates the configuration
      const config = createConfig(props);
      //Wether to display extra information
      const verbose = props.verbose === true;

      //Runs when a qr code is found
      if (!props.qrCodeSuccessCallback) {
        throw "qrCodeSuccessCallback is required callback";
      }

      //Guard lock to prevent double cameras rendered

      //Creates the instance of the scanner
      const html5QrcodeScanner = new Html5QrcodeScanner(
        qrCodeRegionId,
        config,
        verbose
      );

      //Executes functions wether error or not
      html5QrcodeScanner.render(
        props.qrCodeSuccessCallback,
        props.qrCodeErrorCallback
      );

      scannerStart.current = true;

      return html5QrcodeScanner;
    };

    const initScanner = () => {
      if (scannerStart.current) return;
      scannerRef.current = startScan();
    };

    initScanner();

    //cleanup function
    return () => {
      const clearScanner = () => {
        try {
          if (scannerRef.current) scannerRef.current.clear();
        } catch (error) {
          console.error("Failed to clear html5QrCodeScanner", error);
        }
      };
      clearScanner();
      scannerStart.current = false;
    };
  }, []);

  return <div id={qrCodeRegionId}></div>;
};
function ScanQR() {
  const onNewScanResult = async (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    try {
      console.log(decodedText);
      const response = await client.post("/logs/login", { id: decodedText });
      const { data } = response;
      console.log(data);
    } catch (error) {
      console.error("Error Logging Student:", error);
    }
  };

  const getData = async () => {};

  const onError = () => {};
  return (
    <section>
      <div className="flex items-center gap-3">
        <QRCodeIcon fontSize={50} />
        <h1 className="text-2xl font-bold">Student Logs</h1>
      </div>
      <div className="flex flex-col items-center w-full">
        <HTML5QrCodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
          qrCodeErrorCallback={onError}
        />
        <div className="flex justify-center">
          <GridExample />
        </div>
      </div>
    </section>
  );
}

// Create new GridExample component
const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<Log[] | null>(null);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<Log>[]>([
    { field: "school_id" },
    { field: "time_in" },
    { field: "time_out" },
  ]);

  useEffect(() => {
    try {
      const fetchLogs = async () => {
        const response = await client.get("/logs");
        let { data } = response;

        console.log(data);
        setRowData(data);
      };
      fetchLogs();
    } catch (error) {
      console.error("Error Fetching Logs:", error);
    }
  }, []);

  return (
    <div style={{ width: 800, height: 800 }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
};

export default ScanQR;
