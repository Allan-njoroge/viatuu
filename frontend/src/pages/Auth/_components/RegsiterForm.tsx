import { ChangeEvent, FormEvent, useState } from "react";
import AuthForm, { InputProps } from "./AuthForm";
import { registerUser } from "@/redux/thunks/userThunks";
import { useDispatch } from "react-redux";
import { AppDispatch  } from "@/redux/store";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const inputs: InputProps[] = [
    { label: "First Name", name: "first_name", type: "text", placeholder: "John" },
    { label: "Last Name", name: "last_name", type: "text", placeholder: "Doe" },
    { label: "Email Address", name: "email", type: "email", placeholder: "Johndoe@gmail.com" },
    { label: "Password", name: "password", type: "password", placeholder: "Password" },
  ];

  const registerFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formData)).unwrap();
  };

  return (
    <>
      <AuthForm
        title={"login to your account"}
        inputs={inputs}
        btnText="Regsiter"
        onChange={registerFormChange}
        onSubmit={registerFunction}
      />
    </>
  );
};

export default RegisterForm;
