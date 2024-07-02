import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "@/app/member/login/page";
import {
  alert,
  AppRouterProvider,
  push,
  router,
} from "@/shared/hooks/next-router-provider-mock";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";

describe("로그인", () => {
  it("로그인 페이지가 렌더링 되면 아이디창에 포커스가 이동되어야합니다.", async () => {
    render(
      <AppRouterProvider router={router as Partial<AppRouterInstance>}>
        <Login />
      </AppRouterProvider>
    );
    const heading = screen.getByRole("heading", { name: "로그인" });
    await waitFor(() => {
      expect(heading).toBeInTheDocument();
    });
    const loginId = screen.getByPlaceholderText("아이디");
    expect(loginId).toHaveFocus();
  });
  it("모든 사항을 입력하지 않으면 로그인 버튼이 비활성화 되어야 합니다.", async () => {
    render(
      <AppRouterProvider router={router as Partial<AppRouterInstance>}>
        <Login />
      </AppRouterProvider>
    );
    const button = screen.getByRole("button", { name: "로그인" });
    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
  it("아이디를 입력후 엔터를 누르면 비밀번호 입력창으로 포커스가 이동되어야 합니다.", () => {
    render(
      <AppRouterProvider router={router as Partial<AppRouterInstance>}>
        <Login />
      </AppRouterProvider>
    );
    const loginId = screen.getByPlaceholderText("아이디");
    fireEvent.change(loginId, { target: { value: "test" } });
    fireEvent.keyDown(loginId, { key: "Enter", code: "Enter" });
    const password = screen.getByPlaceholderText("비밀번호");
    expect(password).toHaveFocus();
  });
  it("아이디와 비밀번호를 입력하면 로그인 버튼이 활성화 되어야 합니다.", async () => {
    render(
      <AppRouterProvider router={router as Partial<AppRouterInstance>}>
        <Login />
      </AppRouterProvider>
    );
    const loginId = screen.getByPlaceholderText("아이디");
    fireEvent.change(loginId, { target: { value: "test" } });
    const password = screen.getByPlaceholderText("비밀번호");
    fireEvent.change(password, { target: { value: "test1234" } });
    const button = screen.getByRole("button", { name: "로그인" });
    await waitFor(() => {
      expect(button).toBeEnabled();
    });
  });
  it("비밀번호가 8글자이상 16이자 이하이거나, 영어/숫자/특수문자 2가지 이상 조합이 아니라면 alert가 노출됩니다.", async () => {
    render(
      <AppRouterProvider router={router as Partial<AppRouterInstance>}>
        <Login />
      </AppRouterProvider>
    );
    const loginId = screen.getByPlaceholderText("아이디");
    fireEvent.change(loginId, { target: { value: "test" } });
    const password = screen.getByPlaceholderText("비밀번호");
    fireEvent.change(password, { target: { value: "test" } });
    const button = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(button);
    expect(alert).toHaveBeenCalledWith(
      "비밀번호는 8자 이상, 16자 이하,\n영문, 숫자, 특수문자 중 두가지를 포함해야 합니다."
    );

    alert.mockRestore();
  });
  it("아이디와 비밀번호를 context에 토큰을 세팅하고 로그인에 성공해야합니다.", async () => {
    render(
      <AppRouterProvider router={router as Partial<AppRouterInstance>}>
        <Login />
      </AppRouterProvider>
    );
    const loginId = screen.getByPlaceholderText("아이디");
    fireEvent.change(loginId, { target: { value: "test" } });
    const password = screen.getByPlaceholderText("비밀번호");
    fireEvent.change(password, { target: { value: "test1234*" } });
    const button = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(button);
    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("token");
    });
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/");
    });
  });
});
