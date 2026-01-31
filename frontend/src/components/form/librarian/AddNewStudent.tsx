import { FormEvent, useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import client from "../../../axiosClient.ts";
import Swal from "sweetalert2";
import { API_STATUS } from "../../../constants/statuses.ts";
import { useNavigate } from "react-router";
import { Dropdown } from "../../ui/dropdown/Dropdown.tsx";
export default function AddNewStudent() {
  //TODO polishing the ui here and will add modals or alerts

  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("BSIT");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(course);
  }, [course]);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const payload = {
        firstname,
        middlename,
        lastname,
        email,
        phone,
        course,
      };

      const response = await client.post("/students", payload);
      const { status } = response;

      if (status === API_STATUS.CREATED) {
        Swal.fire({
          title: "Student Has Been Created?",
          text: "Do you want to go back?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes Please",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/admin/students");
          }
        });
      }
      if (status === API_STATUS.SERVER_ERROR) {
        Swal.fire({
          title: "Error Creating Student",
          text: "Student adding unsuccessfull",
          icon: "error",
        });
      }

      setFirstname("");
      setMiddleName("");
      setLastname("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error Adding Student:", error);
    }
  };

  return (
    <ComponentCard title="Add New Student">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="inputTwo">Firstname</Label>
            <Input
              type="text"
              placeholder="Firstname"
              eCommerce
              Analytics
              Marketing
              CRM
              Stocks
              SaaS
              New
              Logistics
              New
              AI
              Assistant
              New
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="inputTwo">Middlename</Label>
            <Input
              type="text"
              placeholder="Middlename"
              value={middlename}
              onChange={(event) => setMiddleName(event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="inputTwo">Lastname</Label>
            <Input
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="inputTwo">Gmail</Label>
            <Input
              type="text"
              placeholder="example@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="inputTwo">Phone</Label>
            <Input
              type="text"
              placeholder="ex:091234567890"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="inputTwo">Course</Label>
            <select
              defaultValue="BSIT"
              className="select w-full"
              onChange={(e) => setCourse(e.target.value)}
            >
              <option disabled={true}>Student Course</option>
              <option value="BSIT">BSIT</option>
              <option value="BSBA">BSBA</option>
              <option value="BSA">BSA</option>
              <option value="BTLED">BTLED</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button className="btn btn-primary">Add Student</button>
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
