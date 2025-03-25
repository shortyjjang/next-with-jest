import { render, screen } from "@testing-library/react";
import { StyleComponent } from "./styledMemo";

describe("StyledMemo", () => {
  it("should render", () => {
    render(<StyleComponent value={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
  it("value가 0일때 배경색은 #000000이어야한다", () => {
    render(<StyleComponent value={0} />);
    expect(screen.getByText("0")).toHaveStyle("background-color: #000000");
  });
});
