import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent } from "react";

export interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

interface Props {
  title: string;
  btnText: string;
  inputs: InputProps[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const AuthForm = ({
  onSubmit,
  title,
  inputs,
  onChange,
  btnText,
}: Props) => {
  return (
    <form action="" className="grid gap-5 mt-5" onSubmit={onSubmit}>
      <h1 className="text-center font-semibold text-xl md:text-2xl">
        {title.toUpperCase()}
      </h1>
      {inputs.map((input, index) => (
        <div key={index}>
          <label htmlFor={input.name} className="pl-2">
            {input.label}
          </label>
          <Input
            type={input.type}
            placeholder={input.placeholder}
            id={input.name}
            name={input.name}
            required
            onChange={onChange}
          />
        </div>
      ))}
      <Button>{btnText}</Button>
    </form>
  );
};

export default AuthForm;
