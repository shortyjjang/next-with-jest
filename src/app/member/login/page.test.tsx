import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "@/app/member/login/page";
import { AppRouterProvider } from "@/shared/hooks/next-router-provider-mock";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

describe("로그인", () => {
  it("로그인 페이지가 렌더링 되어야 합니다.", () => {
    const push = jest.fn();
    render(<AppRouterProvider router={push as Partial<AppRouterInstance>}><Login /></AppRouterProvider>);
    const heading = screen.getByRole("heading", { name: "로그인" });
    waitFor(() => {
      expect(heading).toBeInTheDocument();
    });
  });
  it("모든 사항을 입력하지 않으면 로그인 버튼이 비활성화 되어야 합니다.", () => {
    
    const push = jest.fn();
    render(<AppRouterProvider router={push as Partial<AppRouterInstance>}><Login /></AppRouterProvider>);
    const button = screen.getByRole("button", { name: "로그인" });
    expect(button).toBeDisabled();
  });
  it("아이디를 입력후 엔터를 누르면 비밀번호 입력창으로 포커스가 이동되어야 합니다.", () => {
    
    const push = jest.fn();
    render(<AppRouterProvider router={push as Partial<AppRouterInstance>}><Login /></AppRouterProvider>);
    const loginId = screen.getByPlaceholderText("아이디");
    fireEvent.change(loginId, { target: { value: "test" } });
    fireEvent.keyDown(loginId, { key: "Enter", code: "Enter" });
    const password = screen.getByPlaceholderText("비밀번호");
    expect(password).toHaveFocus();
  });
  it("아이디와 비밀번호를 입력하면 로그인 버튼이 활성화 되어야 합니다.", () => {
    
    const push = jest.fn();
    render(<AppRouterProvider router={push as Partial<AppRouterInstance>}><Login /></AppRouterProvider>);
    const loginId = screen.getByPlaceholderText("아이디");
    fireEvent.change(loginId, { target: { value: "test" } });
    const password = screen.getByPlaceholderText("비밀번호");
    fireEvent.change(password, { target: { value: "test" } });
    const button = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(button);
  });
});
