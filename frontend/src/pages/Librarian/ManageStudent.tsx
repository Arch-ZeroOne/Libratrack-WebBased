import { useState, useEffect, FormEvent } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import client from "../../axiosClient";
import Swal from "sweetalert2";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { Student, GetStudentPayload } from "../../types/student";
import * as util from "../../util/util";
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

//Imported components for crud operations using action buttons

//TODO polishing queries and adding modals
import { ICellRendererParams } from "ag-grid-community";
import { UserDeactivated, PencilIcon } from "../../icons";
import { useNavigate } from "react-router";

//Interface contract for functions
//Action cell component receieved all normal data plus this added two functions edit and delete
//ICellRendererParams<Student> -> ag grid gives the data automatically this line 'types' the data as Student
interface ActionCellProps extends ICellRendererParams<Student> {
  onEdit: (row: Student) => void;
  onDelete: (row: Student) => void;
}

function ManageStudent() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-2 items-center">
      <button
        className="btn btn-primary self-end"
        onClick={() => navigate("/admin/add-student")}
      >
        Add Student
      </button>
      <StudentTable />
    </section>
  );
}

// Create new GridExample component
const StudentTable = () => {
  const [rowData, setRowData] = useState<Student[] | null>(null);
  const [selectedStudent, setSelectedStudent] =
    useState<GetStudentPayload | null>();
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [creationDate, setCreationDate] = useState<Date | string>(new Date());
  const [status, setStatus] = useState("");

  const onEdit = (row: Student) => {
    handleOpen(row.student_id);
  };
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      firstname,
      middlename,
      lastname,
      email,
      phone,
      schoolId,
      creationDate,
      status,
    };

    // Implementing update here

    if (!selectedStudent) {
      return;
    }
    try {
      const response = await client.patch(
        `/students/update/${selectedStudent.student_id}`,
        payload
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error While Updating");
    }
  };

  const onDelete = (row: Student) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deactivate Student!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const request = await client.patch(`/students/${row.student_id}`);
          const data = request.data;

          if (data) {
            Swal.fire({
              title: "Student Deactivted!",
              text: "Student has been deactivated.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error Deleting Student:", error);
        }
      }
    });
  };

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await client.get("/students");
        setRowData(response.data);
      } catch (error) {
        console.error("Error Retrieving Data:", error);
      }
    };
    getStudents();
  }, []);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<Student>[]>([
    { field: "firstname", headerName: "First Name" },
    { field: "middlename", headerName: "Middle Name" },
    { field: "lastname", headerName: "Last Name" },
    {
      field: "email",
      headerName: "Email",
    },
    {
      field: "school_id",
      headerName: "School ID",
    },
    {
      field: "status",
      headerName: "Student Status",
    },
    {
      headerName: "Actions",
      cellRendererParams: {
        onEdit,
        onDelete,
      },
      cellRenderer: ActionCell,
    },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  const handleOpen = async (id: number) => {
    // Added alia for typescript to recognize this
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    try {
      const response = await client.get(`/students/${id}`);
      const json: GetStudentPayload = response.data;
      setSelectedStudent(json);
      if (!response.data) {
        return;
      }
      const {
        firstname,
        middlename,
        lastname,
        email,
        phone,
        school_id,
        created_at,
        status,
      } = json;

      setFirstname(firstname);
      setMiddleName(middlename);
      setLastname(lastname);
      setEmail(email);
      setPhone(phone);
      setSchoolId(school_id);
      setCreationDate(util.getFormattedDate(created_at));
      setStatus(status);
    } catch (error) {
      console.error("Error Occured While Auto Filling:", error);
    }

    if (modal) modal.showModal();
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <>
      {/* Modal for updating */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box flex flex-col ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Update Student</h3>
          {/* Form Elements */}
          <form className="grid grid-cols-2 gap-2" onSubmit={onSubmit}>
            <div>
              <label className="text-xs">Firstname</label>
              <input
                type="text"
                placeholder="New Firstname"
                className="input"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              ></input>
            </div>
            <div>
              <label className="text-xs">Middle Name</label>
              <input
                type="text"
                placeholder="New Middlename"
                className="input"
                value={middlename}
                onChange={(event) => setMiddleName(event.target.value)}
              ></input>
            </div>
            <div>
              <label className="text-xs">Last Name</label>
              <input
                type="text"
                placeholder="New Lastname"
                className="input"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              ></input>
            </div>
            <div>
              <label className="text-xs">Gmail</label>
              <input
                type="text"
                placeholder="New Gmail"
                className="input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div>
              <label className="text-xs">Phone</label>
              <input
                type="text"
                placeholder="New Phone"
                className="input"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              ></input>
            </div>
            <div>
              <label className="text-xs"> School ID</label>
              <input
                type="text"
                placeholder="New School ID"
                className="input"
                value={schoolId}
                onChange={(event) => setSchoolId(event.target.value)}
              ></input>
            </div>
            <div>
              <label className="text-xs">Creation Date</label>
              <input
                type="date"
                className="input"
                value={`${creationDate}`}
                onChange={(event) => setCreationDate(event.target.value)}
              />
            </div>
            <div>
              <label className="text-xs">Status</label>
              <input
                type="text"
                className="input"
                placeholder="Update Status"
                list="statuses"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              />
              <datalist id="statuses">
                <option value="Active"></option>
                <option value="Inactive"></option>
                <option value="Deactivated"></option>
                <option value="Banned"></option>
              </datalist>
            </div>
            <button className="btn btn-primary mt-3 self-center">
              Update Student
            </button>
          </form>
        </div>
      </dialog>

      {/* Table Component */}
      <div
        className="mr-auto ml-auto"
        style={{ width: "100%", height: "700px" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </>
  );
};

//Action buttons

const ActionCell: React.FC<ActionCellProps> = ({ data, onEdit, onDelete }) => {
  //Returns if there is no data
  if (!data) return null;

  return (
    <div className="flex gap-2 justify-center items-center cursor-pointer">
      <div onClick={() => onEdit(data)}>
        <PencilIcon fontSize={28} />
      </div>
      <div>
        <UserDeactivated fontSize={25} onClick={() => onDelete(data)} />
      </div>
    </div>
  );
};

export default ManageStudent;
