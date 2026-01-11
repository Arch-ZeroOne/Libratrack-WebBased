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
  //TODO continuing to implement this
  const [showPassword, setShowPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleSubmit = async (event: FormEvent) => {};

  return (
    <ComponentCard title="Add New Student">
      <form>
        <div className="space-y-6">
          <div>
            <Label htmlFor="inputTwo">Firstname</Label>
            <Input type="text" placeholder="Firstname" />
          </div>
          <div>
            <Label htmlFor="inputTwo">Middlename</Label>
            <Input type="text" placeholder="Middlename" />
          </div>
          <div>
            <Label htmlFor="inputTwo">Lastname</Label>
            <Input type="text" placeholder="Lastname" />
          </div>
          <div>
            <Label htmlFor="inputTwo">Gmail</Label>
            <Input type="text" placeholder="example@gmail.com" />
          </div>
          <div>
            <Label htmlFor="inputTwo">Phone</Label>
            <Input type="text" placeholder="ex:091234567890" />
          </div>
          <div>
            <Label htmlFor="inputTwo">School ID</Label>
            <Input type="text" placeholder="ex:091234567890" />
          </div>

          <div>
            <Label>Password Input</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="btn btn-primary">Add Student</button>
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
