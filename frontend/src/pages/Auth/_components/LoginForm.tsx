import { ChangeEvent, FormEvent, useState } from "react";
import AuthForm, { InputProps } from "./AuthForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/thunks/userThunks";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const inputs: InputProps[] = [
    { label: "Email Address", name: "email", type: "email", placeholder: "Johndoe@gmail.com" },
    { label: "Password", name: "password", type: "password", placeholder: "Password",},
  ];

  // ===== Login User Functionality
  const loginFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Login function
  const loginFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(formData)).unwrap()
  };

  return (
    <>
      <AuthForm
        title={"login to your account"}
        inputs={inputs}
        btnText="Regsiter"
        onChange={loginFormChange}
        onSubmit={loginFunction}
      />
    </>
  );
};

export default LoginForm;
