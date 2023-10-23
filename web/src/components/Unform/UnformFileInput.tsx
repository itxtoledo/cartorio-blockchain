import { useRef, useEffect } from "react";
import { useField } from "@unform/core";

interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

export default function ImageInput({ name, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "files[0]",
      clearValue(ref: HTMLInputElement) {
        ref.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input type="file" ref={inputRef} {...rest} className="form-control" />
    </>
  );
}
