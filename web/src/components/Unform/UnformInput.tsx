import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import classNames from "classnames";

type InputProps = JSX.IntrinsicElements["input"];

const UnformInput: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(
    name as string
  );
  useEffect(() => {
    registerField({
      name: fieldName,
      path: "value",
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);
  return (
    <>
      <input
        className={classNames("form-control", {
          "is-invalid": !!error,
        })}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
};
export default UnformInput;
