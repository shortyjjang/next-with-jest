import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "@/app/page";

describe("로그인", () => {
  it("로그인 페이지가 렌더링 되어야 합니다.", () => {
    render(<Page />);
    const button = screen.getByText(/로그인/i);
    expect(button).toBeInTheDocument();
  });
});
