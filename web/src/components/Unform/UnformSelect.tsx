import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

type InputProps = JSX.IntrinsicElements["select"];

const UnformSelect: React.FC<InputProps> = ({ name, children, ...rest }) => {
  const inputRef = useRef<HTMLSelectElement>(null);
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
      <select
        className="form-select"
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
       { ...rest}
      >
        {children}
      </select>
      {error && <span>{error}</span>}
    </>
  );
};
export default UnformSelect;
