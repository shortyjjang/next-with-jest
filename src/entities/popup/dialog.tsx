import React from "react";

export default function Dialog({
  visible,
  onClose,
  children,
  title,
}: {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  title?: string;
}) {
  if (!visible) return null;
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full bg-white border border-black">
        {title && <div>{title}</div>}
        <button onClick={onClose}></button>
        {children}
      </div>
    </>
  );
}
