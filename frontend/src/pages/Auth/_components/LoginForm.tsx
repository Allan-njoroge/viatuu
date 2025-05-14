import { ChangeEvent, FormEvent, useState } from "react";
import AuthForm, { InputProps } from "./AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loginUser } from "@/redux/thunks/userThunks";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

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

  if (loading) {
  return <h1 className="p-3">Loading...</h1>;
  }

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
