import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";


const Auth = () => {
    const registerFields = [
        { label: "First Name", name: "first_name", type: "text", placeholder: "John" },
        { label: "Last Name", name: "last_name", type: "text", placeholder: "Doe" },
        { label: "Email Address", name: "email", type: "email", placeholder: "Johndoe@gmail.com" },
        { label: "Password", name: "password", type: "password", placeholder: "Password" }
    ]

    const loginFields = [
        { label: "Email Address", name: "email", type: "email", placeholder: "Johndoe@gmail.com" },
        { label: "Password", name: "password", type: "password", placeholder: "Password" }
    ]


  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center px-10">
      <Tabs defaultValue="register" className="w-full md:w-1/3 border border-muted-foreground/20 px-5 md:px-10 py-10  rounded-md">
        <TabsList className="w-full">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        {/* ===== Sign Up For Account ===== */}
        <TabsContent value="register">
          <form action="" className="grid gap-5 mt-5">
            <h1 className="text-center font-semibold text-xl md:text-2xl">CREATE AN ACCOUNT</h1>
            {registerFields.map((item, index) => (
                <div key={index}>
                    <label htmlFor={item.name} className="pl-2">{item.label}</label>
                    <Input
                        type={item.type}
                        placeholder={item.placeholder}
                        id={item.name}
                        required
                    />
                </div>
            ))}
            <Button>Register</Button>
          </form>
        </TabsContent>
        {/* ===== Log In to Your Account ===== */}
        <TabsContent value="login">
        <form action="" className="grid gap-5 mt-5">
            <h1 className="text-center font-semibold text-xl md:text-2xl">LOGIN TO YOUR ACCOUNT</h1>
            {loginFields.map((item, index) => (
                <div key={index}>
                    <label htmlFor={item.name} className="pl-2">{item.label}</label>
                    <Input
                        type={item.type}
                        placeholder={item.placeholder}
                        id={item.name}
                        required
                    />
                </div>
            ))}
            <Button>Register</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
