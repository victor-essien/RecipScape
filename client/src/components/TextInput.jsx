import React from "react";

const TextInput = React.forwardRef(
  (
    { type, placeholder, styles, label, labelStyles, register, name, errors },
    ref
  ) => {
    // console.log('type', type)
    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-black font-semibold text-sm mb-2 ${labelStyles}`}>
            {label}
          </p>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={` rounded   outline-none   px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            aria-invalid={errors ? "true" : "false"}
          />
        </div>
        {errors && (
          <span className="text-xs text-[#f64949fe] mt-0.5">{errors}</span>
        )}
      </div>
    );
  }
);

export default TextInput;
