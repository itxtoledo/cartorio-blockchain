import { useRef, useEffect } from "react";
import { useField } from "@unform/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactInputMask, { Props } from "react-input-mask";
import classNames from "classnames";

type InputProps = Props & JSX.IntrinsicElements["input"];

export default function UnformMaskedInput({ name, ...rest }: InputProps) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue("");
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <ReactInputMask
        className={classNames("form-control", {
          "is-invalid": !!error,
        })}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}
