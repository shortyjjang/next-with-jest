import React, { forwardRef, useId } from "react";

function CheckBox(
  {
    checked = false,
    onChange,
    id,
    disabled = false,
    value,
    required,
    name = ''
  }: {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    id?: string;
    disabled?: boolean;
    value?: string;
    required?: boolean;
    name?: string;
  },
  ref: React.Ref<HTMLInputElement>
) {
  const valueId = useId();
  return (
    <span
      ref={ref}
      className={`relative inline-block border w-[16px] h-[16px] rounded-full ${checked ? "bg-[#009e48] border-[#009e48]" : "bg-white border-gray-300"}`}
    >
      <input
        id={value && valueId ? valueId : id}
        required={required}
        disabled={disabled}
        name={name || id}
        type="checkbox"
        className="absolute top-0 left-0 w-full h-full"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {value && <label htmlFor={valueId}>{value}</label>}
    </span>
  );
}

export default forwardRef(CheckBox);
