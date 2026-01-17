import { useEffect } from "react";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { CreateConfigProps, ComponentCallbackProps } from "../../types/qrcode";
import { Log } from "../../types/logs";
import client from "../../axiosClient";
import { useRow } from "../../context/LogsRowContext";
import toast, { Toaster } from "react-hot-toast";
import * as util from "../../util/util";
//TODO
//Implement Logging of student through qr

// React Grid Logic
import { useState, useRef } from "react";
// Theme
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

import { QRCodeIcon, BarcodeScannerIcon, CrossIcon } from "../../icons";

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
        verbose,
      );

      //Executes functions wether error or not
      html5QrcodeScanner.render(
        props.qrCodeSuccessCallback,
        props.qrCodeErrorCallback,
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
  const { rowData, setRowData } = useRow();
  const [qrValue, setQrValue] = useState<string>();
  const modalRef = useRef<HTMLDialogElement>(null);

  const onNewScanResult = async (
    decodedText: string,
    decodedResult: Html5QrcodeResult,
  ) => {
    try {
      //Logs in or Logs out the Student
      const response = await client.post("/logs/login", { id: decodedText });
      const { data } = response;

      nofify();
      getData();
    } catch (error) {
      console.error("Error Logging Student:", error);
    }
  };

  const getData = () => {
    try {
      const fetchLogs = async () => {
        const response = await client.get("/logs");
        const { data } = response;
        data.map((data: Log) => {
          data.date_logged = util.getFullDate(data.date_logged);
        });

        setRowData(data);
      };
      fetchLogs();
    } catch (error) {
      console.error("Error Fetching Logs:", error);
    }
  };

  const onError = () => {};
  const handleBarcodePrompt = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    modalRef.current = modal;
    modal.showModal();
  };

  const onKeyDown = async (e: React.KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Enter") {
      try {
        //Logs in or Logs out the Student
        const response = await client.post("/logs/login", { id: qrValue });
        const { data } = response;

        nofify();
        getData();
        setQrValue("");
        if (modalRef.current) modalRef.current.close();
      } catch (error) {
        console.error("Error While Scanning in barcode:", error);
      }
    }
  };

  const nofify = () => toast.success("Student Logged In");
  return (
    <section className="flex flex-col">
      <Toaster />
      {/* Modal for barcode prompt */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            <QRCodeIcon fontSize={50} />
          </h3>
          <p className="py-4 text-xl text-center text-primary">
            Scan the student QR using the device
            <input
              type="text"
              value={qrValue}
              onChange={(e) => setQrValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              style={{ opacity: 0 }}
            ></input>
          </p>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="flex items-center gap-3">
        <QRCodeIcon fontSize={50} />
        <h1 className="text-2xl font-bold">Student Logs</h1>
      </div>
      <section className="flex items-center justify-around gap-3">
        <div className="w-full self-start mt-3 flex  flex-col gap-2">
          <div className="flex gap-2">
            <button
              className="btn btn-outline btn-primary"
              onClick={() => handleBarcodePrompt()}
            >
              Use Scanner
              <BarcodeScannerIcon fontSize={30} />
            </button>
            <button className="btn btn-outline btn-success">
              Add Log <CrossIcon fontSize={30} color="white" />
            </button>
          </div>
          <HTML5QrCodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
            qrCodeErrorCallback={onError}
          />
        </div>
        <div className="flex justify-center">
          <LogsTable />
        </div>
      </section>
    </section>
  );
}

// Create new GridExample component
const LogsTable = () => {
  // Row Data: The data to be displayed.
  const { rowData, setRowData } = useRow();

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<Log>[]>([
    { field: "school_id" },
    { field: "time_in" },
    { field: "time_out" },
    { field: "date_logged" },
  ]);

  useEffect(() => {
    try {
      const fetchLogs = async () => {
        const response = await client.get("/logs");
        let { data } = response;
        data.map((data: Log) => {
          data.date_logged = util.getFullDate(data.date_logged);
        });

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
