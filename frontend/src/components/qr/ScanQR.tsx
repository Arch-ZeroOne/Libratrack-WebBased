import { useEffect } from "react";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import {
  CreateConfigProps,
  ComponentCallbackProps,
  HandleAddProps,
} from "../../types/qrcode";
import { Log } from "../../types/logs";
import client from "../../axiosClient";
import { useRow } from "../../context/LogsRowContext";
import * as util from "../../util/util";
import CourseFilter from "../filters/CourseFilter";
import DateFilter from "../filters/DateFilter";
import { useCourse } from "../../context/CourseContext";

//TODO
//Implement Logging of student through qr

// React Grid Logic
import { useState, useRef } from "react";
// Theme
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";

import {
  QRCodeIcon,
  BarcodeScannerIcon,
  CrossIcon,
  IdIcon,
  CalenderIcon,
} from "../../icons";

import { API_STATUS } from "../../constants/statuses";
import Swal from "sweetalert2";
import { useDate } from "../../context/DateContext";
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
  const [schoolId, setSchoolId] = useState<string>();
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
      const { status } = error.response;
      if (status === API_STATUS.NOT_FOUND) {
        Swal.fire({
          title: "Error Logging Student",
          text: "Student logging unsuccessful",
          icon: "error",
        });
      }

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

  const handleLogPrompt = () => {
    const modal = document.getElementById("addModal") as HTMLDialogElement;
    modalRef.current = modal;
    modal.showModal();
  };

  //For barcode scan event function
  const onKeyDown = async (e: React.KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Enter") {
      try {
        //Logs in or Logs out the Student
        const response = await client.post("/logs/login", { id: qrValue });
        const { data } = response;

        getData();
        setQrValue("");
        if (modalRef.current) modalRef.current.close();
      } catch (error) {
        const { status } = error.response;
        if (status === API_STATUS.NOT_FOUND) {
          Swal.fire({
            title: "Error Logging Student",
            text: "Student logging unsuccessful",
            icon: "error",
          });
        }
        console.error("Error While Scanning in barcode:", error);
      }
    }
  };

  const onSubmit = async () => {
    try {
      const response = await client.post("/logs/login", {
        id: `STU-${schoolId}`,
      });
      const { data } = response;

      console.log(data);

      if (modalRef.current) modalRef.current.close();
      Swal.fire({
        title: "Student SuccessFully",
        text: "Student logging unsuccessful",
        icon: "success",
      });
      getData();
      setSchoolId("");
    } catch (error) {
      const { status } = error.response;

      if (status === API_STATUS.NOT_FOUND) {
        Swal.fire({
          title: "Error Logging Student",
          text: "Student logging unsuccessful",
          icon: "error",
        });
      }

      if (modalRef.current) modalRef.current.close();
      setSchoolId("");
    }
  };

  return (
    <section className="flex flex-col">
      <AddLogModal
        schoolId={schoolId}
        setSchoolId={setSchoolId}
        handleSubmit={onSubmit}
      />
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
      {/* Table parent and components */}
      <section className="flex items-center justify-around gap-3 flex-col">
        <div className="w-full self-start mt-3 flex  flex-col gap-2">
          <section className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 ">
              <button
                className="btn btn-outline btn-primary"
                onClick={() => handleBarcodePrompt()}
              >
                Use Scanner
                <BarcodeScannerIcon fontSize={30} />
              </button>
              <button
                className="btn btn-outline btn-success"
                onClick={() => handleLogPrompt()}
              >
                Add Log <CrossIcon fontSize={30} color="white" />
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <CourseFilter />
              <DateFilter />
            </div>
          </section>

          {/* QR Code Scanning */}
          {/* <HTML5QrCodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
            qrCodeErrorCallback={onError}
          /> */}
        </div>
        <div className="flex justify-center w-full">
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
  const { preferedCourse } = useCourse();
  const { logDate } = useDate();

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<Log>[]>([
    {
      field: "school_id",
      headerName: "School ID",
      filter: true,
      sortable: true,
    },
    { field: "time_in", headerName: "Time In", filter: true, sortable: true },
    { field: "time_out", headerName: "Time Out", filter: true, sortable: true },
    {
      field: "date_logged",
      headerName: "Date Logged",
      filter: true,
      sortable: true,
    },
    {
      field: "course",
      headerName: "Course",
      filter: true,
      sortable: true,
    },
  ]);

  const defaultColDef = {
    flex: 3,
  };

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

  useEffect(() => {
    try {
      if (preferedCourse) {
        const fetchLogs = async () => {
          const response = await client.get("/logs");
          let { data } = response;

          data.map((data: Log) => {
            data.date_logged = util.getFullDate(data.date_logged);
          });

          if (preferedCourse === "ALL") {
            setRowData(data);
            return;
          }

          const filtered = data.filter(
            (log: Log) =>
              preferedCourse?.trim().toLowerCase() ===
              log.course?.trim().toLowerCase(),
          );

          setRowData(filtered);
        };
        fetchLogs();
      }

      //TODO currently handling date change and conversion
      if (logDate) {
        if (rowData) {
          const filtered = rowData.filter(
            (log: Log) => log.date_logged === logDate,
          );
          console.log(filtered);
          setRowData(filtered);
        }
      }
    } catch (error) {
      console.error("Error Fetching Logs:", error);
    }
  }, [preferedCourse, logDate]);

  return (
    <div className="w-full h-100">
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

const AddLogModal = ({
  handleSubmit,
  setSchoolId,
  schoolId,
}: HandleAddProps) => {
  return (
    <>
      <dialog id="addModal" className="modal ">
        <div className="modal-box w-100">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <section className="flex flex-col items-center gap-3">
            <div className="flex ">
              <h3 className="font-bold text-lg ">Enter Student School ID</h3>
              <IdIcon fontSize={30} />
            </div>
            <div className="flex items-center gap-3">
              <label>STU - </label>
              <input
                type="text"
                placeholder="Type here"
                className="input w-70 p-5"
                autoFocus
                value={schoolId}
                onChange={(event) => setSchoolId(event.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Add Log
            </button>
          </section>
        </div>
      </dialog>
    </>
  );
};

export default ScanQR;
