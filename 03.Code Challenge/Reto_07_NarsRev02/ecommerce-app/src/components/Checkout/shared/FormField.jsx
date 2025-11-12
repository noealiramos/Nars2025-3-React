import React from "react";

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  autoComplete,
  ...rest
}) {
  const id = `ff-${name}`;
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring focus:ring-indigo-200 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {!!error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}