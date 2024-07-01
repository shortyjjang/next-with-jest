import React from "react";

export default function useToggle() {
  const [visible, setVisible] = React.useState(false);
  const toggle = () => setVisible((prev) => !prev);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return {
    visible,
    toggle,
    show,
    hide,
  };
}
