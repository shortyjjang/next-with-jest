import React from "react";

export default function SubTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-bold text-center text-[21px]">{children}</h2>;
}
