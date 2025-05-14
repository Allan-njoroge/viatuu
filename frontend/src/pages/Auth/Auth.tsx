import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./_components/LoginForm";
import RegisterForm from "./_components/RegsiterForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MdErrorOutline, MdOutlineCheckCircle } from "react-icons/md";
import LoadingSpinner from "@/components/LoadingSpinner";

const Auth = () => {
  const { isAuthenticated, error, message } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full min-h-[80vh] flex justify-center flex-col items-center px-10">
      {/* --- authentication error dispay --- */}
      {error && (
        <Alert className="md:w-1/3 mb-3" variant="error">
        <div className="py-2 flex gap-2 items-center">
          <MdErrorOutline className="h-6 w-6" />
          <AlertDescription>{error}</AlertDescription>
        </div>
      </Alert>
      )}
      {/* --- authentication success display --- */}
      {message && (
        <Alert className="md:w-1/3 mb-3" variant="success">
        <div className="py-2 flex gap-2 items-center">
          <MdOutlineCheckCircle className="h-6 w-6" />
          <AlertDescription>{message}</AlertDescription>
        </div>
      </Alert>
      )}
      <Tabs
        defaultValue="register"
        className="w-full md:w-1/3 border border-muted-foreground/20 px-5 md:px-10 py-10  rounded-md"
      >
        <TabsList className="w-full">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        {/* ----- Sign Up ----- */}
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
        {/* ----- Log In ----- */}
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
