import React from "react";
import "@testing-library/jest-dom";
import Register from "@/app/member/register/page";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { alert, AppRouterProvider, push, router } from "@/shared/hooks/next-router-provider-mock";

describe("회원가입", () => {
  it("회원가입 페이지가 렌더링 되어야 합니다.", async() => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const heading = screen.getByRole("heading", { name: "회원가입" });
    await waitFor(() => {
      expect(heading).toBeInTheDocument();
    });
  });
  it("필수 사항을 입력하지 않으면 가입하기 버튼이 비활성화 되어야 합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const button = screen.getByRole("button", { name: "가입하기" });
    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
  it("아이디를 입력하고 중복확인을 누르면 중복확인이 되어야합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const loginId = screen.getByPlaceholderText("아이디를 입력해주세요");
    fireEvent.change(loginId, { target: { value: "test" } });
    const checkIdButton = screen.getByRole("button", { name: "중복확인" });
    fireEvent.click(checkIdButton);
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("사용 가능한 아이디 입니다.");
    });
  })
  it("핸드폰 번호를 13글자 이상 입력하면 값이 입력되지 않아야합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const hpNum = screen.getByPlaceholderText("휴대폰번호를 입력해주세요");
    fireEvent.change(hpNum, { target: { value: "010-1234-56789" } });
    await waitFor(() => {
      expect(hpNum).toHaveValue("010-1234-5678");
    });
  });
  it("핸드폰 번호를 3글자 이상 입력하면 세번째 글자 뒤에 -가 붙어야합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const hpNum = screen.getByPlaceholderText("휴대폰번호를 입력해주세요");
    fireEvent.change(hpNum, { target: { value: "0101" } });
    await waitFor(() => {
      expect(hpNum).toHaveValue("010-1");
    });
  });
  it("비밀번호가 다를 경우 alert가 노출되어야합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const loginId = screen.getByPlaceholderText("아이디를 입력해주세요");
    fireEvent.change(loginId, { target: { value: "test" } });
    const checkIdButton = screen.getByRole("button", { name: "중복확인" });
    fireEvent.click(checkIdButton);
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    fireEvent.change(password, { target: { value: "test1234" } });
    const passwordConfirm = screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요");
    fireEvent.change(passwordConfirm, { target: { value: "test12345" } });
    const name = screen.getByPlaceholderText("이름을 입력해주세요");
    fireEvent.change(name, { target: { value: "test" } });
    const hpNum = screen.getByPlaceholderText("휴대폰번호를 입력해주세요");
    fireEvent.change(hpNum, { target: { value: "010-1234-5678" } });
    const useMallCheck = screen.getByRole('checkbox' ,{name:'이용약관 동의'})
    fireEvent.click(useMallCheck);
    const provideInfoCheck = screen.getByRole('checkbox' ,{name:'개인정보 처리방침 동의'})
    fireEvent.click(provideInfoCheck);
    const button = screen.getByRole("button", { name: "가입하기" });
    fireEvent.click(button);
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("비밀번호를 확인해주세요");
    });
  })
  it("핸드폰번호가 13글자 이하이면 가입이 되지 않아야합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const loginId = screen.getByPlaceholderText("아이디를 입력해주세요");
    fireEvent.change(loginId, { target: { value: "test" } });
    const checkIdButton = screen.getByRole("button", { name: "중복확인" });
    fireEvent.click(checkIdButton);
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    fireEvent.change(password, { target: { value: "test1234" } });
    const passwordConfirm = screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요");
    fireEvent.change(passwordConfirm, { target: { value: "test1234" } });
    const name = screen.getByPlaceholderText("이름을 입력해주세요");
    fireEvent.change(name, { target: { value: "test" } });
    const hpNum = screen.getByPlaceholderText("휴대폰번호를 입력해주세요");
    fireEvent.change(hpNum, { target: { value: "010-1234-5" } });
    const useMallCheck = screen.getByRole('checkbox' ,{name:'이용약관 동의'})
    fireEvent.click(useMallCheck);
    const provideInfoCheck = screen.getByRole('checkbox' ,{name:'개인정보 처리방침 동의'})
    fireEvent.click(provideInfoCheck);
    const button = screen.getByRole("button", { name: "가입하기" });
    fireEvent.click(button);
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("휴대폰 번호를 확인해주세요");
    });
  });
  it("이메일 형식이 아니면 가입이 되지 않아야합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const loginId = screen.getByPlaceholderText("아이디를 입력해주세요");
    fireEvent.change(loginId, { target: { value: "test" } });
    const checkIdButton = screen.getByRole("button", { name: "중복확인" });
    fireEvent.click(checkIdButton);
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    fireEvent.change(password, { target: { value: "test1234" } });
    const passwordConfirm = screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요");
    fireEvent.change(passwordConfirm, { target: { value: "test1234" } });
    const name = screen.getByPlaceholderText("이름을 입력해주세요");
    fireEvent.change(name, { target: { value: "test" } });
    const email = screen.getByPlaceholderText("이메일을 입력해주세요");
    fireEvent.change(email, { target: { value: "email" } });
    const hpNum = screen.getByPlaceholderText("휴대폰번호를 입력해주세요");
    fireEvent.change(hpNum, { target: { value: "010-1234-5678" } });
    const useMallCheck = screen.getByRole('checkbox' ,{name:'이용약관 동의'})
    fireEvent.click(useMallCheck);
    const provideInfoCheck = screen.getByRole('checkbox' ,{name:'개인정보 처리방침 동의'})
    fireEvent.click(provideInfoCheck);
    const button = screen.getByRole("button", { name: "가입하기" });
    fireEvent.click(button);
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("이메일을 확인해주세요");
    });
  })

  it("전체 동의 합니다.를 클릭하면 모든 체크박스가 체크되어야합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const allCheck = screen.getByRole('checkbox' ,{name:'전체 동의 합니다.'})
    fireEvent.click(allCheck);

    const useMallCheck = screen.getByRole('checkbox' ,{name:'이용약관 동의'})
    const provideInfoCheck = screen.getByRole('checkbox' ,{name:'개인정보 처리방침 동의'})
    const customerCollectInfoYn= screen.getByRole('checkbox' ,{name:"개인정보 수집 · 이용 동의"})
    const customerSmsRcvYn= screen.getByRole('checkbox' ,{name:"SMS 수신 동의"})
    const customerMailRcvYn= screen.getByRole('checkbox' ,{name:"이메일 수신 동의"})
    expect(useMallCheck).toBeChecked();
    expect(provideInfoCheck).toBeChecked();
    expect(customerCollectInfoYn).toBeChecked();
    expect(customerSmsRcvYn).toBeChecked();
    expect(customerMailRcvYn).toBeChecked();
  });

  it("체크박스를 클릭했을때 값이 변경되어야합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const customerSmsRcvYn= screen.getByRole('checkbox' ,{name:"SMS 수신 동의"})
    fireEvent.click(customerSmsRcvYn);
    expect(customerSmsRcvYn).toBeChecked();
    fireEvent.click(customerSmsRcvYn);
    expect(customerSmsRcvYn).not.toBeChecked();
  })

  it("광고성 정보 수신 동의를 클릭하면 광고 관련 checkbox가 체크되어야합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const allCheck = screen.getByRole('checkbox' ,{name:'광고성 정보 수신 동의'})
    fireEvent.click(allCheck);
    const customerSmsRcvYn= screen.getByRole('checkbox' ,{name:"SMS 수신 동의"})
    const customerMailRcvYn= screen.getByRole('checkbox' ,{name:"이메일 수신 동의"})
    expect(customerSmsRcvYn).toBeChecked();
    expect(customerMailRcvYn).toBeChecked();
  });


  it("필수 사항을 입력하면 가입이 되어야합니다.", async () => {
    render(<AppRouterProvider router={router as Partial<AppRouterInstance>}><Register /></AppRouterProvider>);
    const loginId = screen.getByPlaceholderText("아이디를 입력해주세요");
    fireEvent.change(loginId, { target: { value: "test" } });
    const checkIdButton = screen.getByRole("button", { name: "중복확인" });
    fireEvent.click(checkIdButton);
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    fireEvent.change(password, { target: { value: "test1234" } });
    const passwordConfirm = screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요");
    fireEvent.change(passwordConfirm, { target: { value: "test1234" } });
    const name = screen.getByPlaceholderText("이름을 입력해주세요");
    fireEvent.change(name, { target: { value: "test" } });
    const hpNum = screen.getByPlaceholderText("휴대폰번호를 입력해주세요");
    fireEvent.change(hpNum, { target: { value: "010-1234-5678" } });
    const useMallCheck = screen.getByRole('checkbox' ,{name:'이용약관 동의'})
    fireEvent.click(useMallCheck);
    const provideInfoCheck = screen.getByRole('checkbox' ,{name:'개인정보 처리방침 동의'})
    fireEvent.click(provideInfoCheck);
    const button = screen.getByRole("button", { name: "가입하기" });
    fireEvent.click(button);
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/');
    });
  });

});