import React from "react";

type ButtonType = {
  text: string;
  disabled?: boolean;
  className?: string;
  style?: {};
  onClick: () => void;
};

const Button = ({
  text,
  disabled = false,
  className,
  style = {},
  onClick,
}: ButtonType) => {
  return (
    <button
      className={
        disabled
          ? `bg-sky-600/50 hover:bg-sky-700/50 text-white font-bold py-2 px-4 rounded ${className}`
          : `bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ${className}`
      }
      style={style}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
