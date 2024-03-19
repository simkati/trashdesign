import React, { FC, MouseEventHandler, ReactNode, useCallback } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ToolbarButton: FC<Props> = ({
  children,
  active,
  disabled,
  onMouseDown,
  onClick,
}): JSX.Element => {
  const commonClasses =
    "p-2 rounded text-lg hover:scale-110 hover:shadow-md transition bg-gray-200 ";

  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={clsx(commonClasses, {
        "bg-gray-500": active,
      })}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ToolbarButton;
