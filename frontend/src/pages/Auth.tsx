import { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { redirect } from "react-router";

const Auth = () => {
  const [message, setMessage] = useState<string>("");
  const [registerInputs, setRegisterInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const registerFields = [
    {
      label: "First Name",
      name: "first_name",
      type: "text",
      placeholder: "John",
    },
    { label: "Last Name", name: "last_name", type: "text", placeholder: "Doe" },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Johndoe@gmail.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

  const loginFields = [
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Johndoe@gmail.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

  // ===== Register User Functionality
  const registerFormChange = (e: any) => {
    setRegisterInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(registerInputs);
  };

  const registerFunction = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/register/customer`,
        registerInputs
      );
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  // ===== Login User Functionality
  const loginFormChange = (e: any) => {
    setLoginInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(loginInputs);
  };

  // import login function from context
  const { login } = useContext(AuthContext);

  // Login function
  const loginFunction = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Reset message state before login attempt

    try {
      const response = await login(loginInputs);

      if (response?.data) {
        setMessage(response.data.message);
        console.log("Login Successful:", response.data);

        // Redirect after successful login
        redirect("/");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      setMessage(errorMessage);
      console.error("Login Error:", errorMessage);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center px-10">
      <Tabs
        defaultValue="register"
        className="w-full md:w-1/3 border border-muted-foreground/20 px-5 md:px-10 py-10  rounded-md"
      >
        <TabsList className="w-full">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        {/* ===== Sign Up For Account ===== */}
        <TabsContent value="register">
          <form
            action=""
            className="grid gap-5 mt-5"
            onSubmit={registerFunction}
          >
            <h1 className="text-center font-semibold text-xl md:text-2xl">
              CREATE AN ACCOUNT
            </h1>
            {registerFields.map((item, index) => (
              <div key={index}>
                <label htmlFor={item.name} className="pl-2">
                  {item.label}
                </label>
                <Input
                  type={item.type}
                  placeholder={item.placeholder}
                  id={item.name}
                  name={item.name}
                  required
                  onChange={registerFormChange}
                />
              </div>
            ))}
            <Button>Register</Button>
          </form>
        </TabsContent>
        {/* ===== Log In to Your Account ===== */}
        <TabsContent value="login">
          <form action="" className="grid gap-5 mt-5">
            <h1 className="text-center font-semibold text-xl md:text-2xl">
              LOGIN TO YOUR ACCOUNT
            </h1>
            {loginFields.map((item, index) => (
              <div key={index}>
                <label htmlFor={item.name} className="pl-2">
                  {item.label}
                </label>
                <Input
                  type={item.type}
                  placeholder={item.placeholder}
                  id={item.name}
                  name={item.name}
                  required
                  onChange={loginFormChange}
                />
              </div>
            ))}
            <Button onClick={loginFunction}>Login</Button>
          </form>
        </TabsContent>
        {message && <p className="w-full py-5 text-center">{message}</p>}
      </Tabs>
    </div>
  );
};

export default Auth;
