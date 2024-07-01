import React, { forwardRef } from "react";

function Input(
  {
    value = "",
    onChange,
    placeholder = "",
    disabled = false,
    type = "text",
    readOnly = false,
    name,
    id,
    onKeyDown,
    styleType = "default",
    className = "",
    required = false,
  }: {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    type?: string;
    readOnly?: boolean;
    name?: string;
    id?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    styleType?: "default" | "border";
    className?: string;
    required?: boolean;
  },
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      onKeyDown={onKeyDown}
      className={`w-full px-[16px] py-[14px] ${styleType === "border" ? "border-gray-300 border bg-white" : "bg-transparent"} ${className}`}
      type={type}
      value={value}
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}
      required={required}
      readOnly={readOnly}
      disabled={disabled}
      name={name}
      id={id}
      placeholder={placeholder}
    />
  );
}

export default forwardRef(Input);
