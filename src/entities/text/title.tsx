import React from "react";

export default function Title({
  children,
  type = "h1",
  className = "",
}: {
  children: React.ReactNode;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}) {
  if (type === "h1")
    return (
      <h1
        className={"font-bold text-[29px] text-center pb-[40px] " + className}
      >
        {children}
      </h1>
    );
  if (type === "h2")
    return (
      <h2
        className={"font-bold text-[24px] text-center pb-[30px] " + className}
      >
        {children}
      </h2>
    );
  if (type === "h3")
    return (
      <h3
        className={"font-bold text-[21px] text-center pb-[20px] " + className}
      >
        {children}
      </h3>
    );
}
