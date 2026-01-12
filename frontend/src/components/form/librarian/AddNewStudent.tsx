import { FormEvent, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import DatePicker from "../date-picker.tsx";
import client from "../../../axiosClient.ts";
import Swal from "sweetalert2";
export default function AddNewStudent() {
  //TODO polishing the ui here and will add modals or alerts

  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolId, setSchoolId] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const payload = {
        firstname,
        middlename,
        lastname,
        email,
        phone,
        schoolId,
      };

      const response = await client.post("/students", payload);
      console.log(response);
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
            <Label htmlFor="inputTwo">School ID</Label>
            <Input
              type="text"
              placeholder="ex:2023-6018"
              value={schoolId}
              onChange={(event) => setSchoolId(event.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button className="btn btn-primary">Add Student</button>
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
