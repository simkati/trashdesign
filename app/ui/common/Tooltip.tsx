import { ReactNode } from "react";

type TooltipProp = {
  message: string;
  children: ReactNode;
};

export default function Tooltip({ message, children }: TooltipProp) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-5 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}
