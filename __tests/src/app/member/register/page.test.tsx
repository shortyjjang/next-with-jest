import React from "react";
import "@testing-library/jest-dom";
import Register from "@/app/member/register/page";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AppRouterProvider } from "@/shared/hooks/next-router-provider-mock";

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
describe("회원가입", () => {
  it("회원가입 페이지가 렌더링 되어야 합니다.", async() => {
    
    const push = jest.fn();
    render(<AppRouterProvider router={push as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const heading = screen.getByRole("heading", { name: "회원가입" });
    await waitFor(() => {
      expect(heading).toBeInTheDocument();
    });
  });
  it("필수 사항을 입력하지 않으면 가입하기 버튼이 비활성화 되어야 합니다.", async () => {
    
    const push = jest.fn();
    render(<AppRouterProvider router={push as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const button = screen.getByRole("button", { name: "가입하기" });
    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
  it("필수 사항을 입력하면 가입하기 버튼이 활성화 되어야 합니다.", () => {
    
    const push = jest.fn();
    render(<AppRouterProvider router={push as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const loginId = screen.getByPlaceholderText("아이디를 입력해주세요");
    fireEvent.change(loginId, { target: { value: "test" } });
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    fireEvent.change(password, { target: { value: "test" } });
    const passwordConfirm = screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요");
    fireEvent.change(passwordConfirm, { target: { value: "test" } });
    const name = screen.getByPlaceholderText("이름을 입력해주세요");
    fireEvent.change(name, { target: { value: "test" } });
    const hpNum = screen.getByPlaceholderText("휴대폰번호를 입력해주세요");
    fireEvent.change(hpNum, { target: { value: "010-1234-5678" } });
    const useMallCheck = screen.getByRole("checkbox", { name: "(필수) 이용약관 동의" });
    fireEvent.click(useMallCheck, { target: { checked: true } });
    const provideInfoCheck = screen.getByRole("checkbox", { name: "(필수) 개인정보 처리방침 동의" });
    fireEvent.click(provideInfoCheck, { target: { checked: true } });
    const button = screen.getByRole("button", { name: "가입하기" });
    waitFor(() => {
    expect(button).toBeEnabled();
    });
    // expect(mockRouter.pathname).toEqual("/");
  });
});