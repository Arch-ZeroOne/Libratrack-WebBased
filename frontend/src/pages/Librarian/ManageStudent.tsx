import { useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import client from "../../axiosClient";
import Swal from "sweetalert2";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

//Imported components for crud operations using action buttons

import { ICellRendererParams } from "ag-grid-community";

import { UserDeactivated, PencilIcon } from "../../icons";
import { useNavigate } from "react-router";
interface Student {
  student_id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  phone: string;
  school_id: string;
  created_at: string;
  status: string;
  account_id: number;
}

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

  const onEdit = (row: Student) => {
    console.log("Edit Button Clicked");
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

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="mr-auto ml-auto" style={{ width: "100%", height: "700px" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
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
