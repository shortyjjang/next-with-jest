"use client";

import Button from "@/entities/form/button";
import CheckBox from "@/entities/form/checkBox";
import Input from "@/entities/form/input";
import Title from "@/entities/text/title";
import useUserInfo from "@/shared/store/user";
import {
  validatationPassword,
  validationEmail,
} from "@/shared/utils/validatation";
import React, { useId, useState } from "react";

export default function RegisterLanding() {
  const id = useId();
  const { setUser } = useUserInfo();
  const [checkedId, setCheckedId] = useState(false);
  const [body, setBody] = useState<RegisterUserType>({
    customerMallId: "",
    password: "",
    passwordConfirm: "",
    customerName: "",
    customerHpNum: "010-",
    customerEmail: "",
    customerMallUseYn: false,
    customerProvideInfoYn: false,
    customerCollectInfoYn: false,
    customerSmsRcvYn: false,
    customerMailRcvYn: false,
  });
  const handleCheckedId = () => {
    setCheckedId(true);
  };
  const onChange = (
    key: keyof RegisterUserType,
    value: string,
    type: string = "text"
  ) => {
    let changeValue = type === "tel" ? value.replace(/[^0-9]/g, "") : value;
    if (type === "tel") {
      if (changeValue.length > 11) {
        changeValue = String(body[key as keyof RegisterUserType]);
      } else if (changeValue.length > 7) {
        changeValue =
          changeValue.substring(0, 3) +
          "-" +
          changeValue.substring(3, 7) +
          "-" +
          changeValue.substring(7);
      } else if (changeValue.length > 3) {
        changeValue =
          changeValue.substring(0, 3) + "-" + changeValue.substring(3);
      }
    }
    setBody({
      ...body,
      [key]: changeValue,
    });
  };
  const handleJoinMember = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(body);
    if (!validatationPassword(body.password, body.passwordConfirm)) {
      alert("비밀번호를 확인해주세요");
      return;
    }
    if (body.customerHpNum.length < 13) {
      alert("휴대폰 번호를 확인해주세요");
      return;
    }
    if (body.customerEmail && validationEmail(body.customerEmail)) {
      alert("이메일을 확인해주세요");
      return;
    }
    setUser(body.customerMallId, "token");
    alert("회원가입이 완료되었습니다.");
  };
  return (
    <div className="max-w-[500px] mx-auto">
      <Title>회원가입</Title>
      <form onSubmit={handleJoinMember}>
        <Title type="h3">일반 회원가입</Title>
        {formArray.slice(0, 3).map((item, i) => (
          <div
            key={item?.key}
            className={`grid px-[15px] py-[5px] ${i > 0 ? "" : "border-t"} border-x border-b border-gray-300`}
            style={{
              gridTemplateColumns: "100px auto",
            }}
          >
            <label
              htmlFor={id + item?.key}
              className="items-center flex text-gray-600"
            >
              {item?.label}{" "}
              {item?.required && <span className="text-[#009e48]">*</span>}
            </label>
            <div className="flex items-center justify-between gap-[8px]">
              <Input
                type={item?.type}
                id={id + item?.key}
                placeholder={item?.placeholder}
                required={item?.required}
                className="font-bold"
                value={String(body[item?.key as keyof RegisterUserType])}
                onChange={(value) =>
                  onChange(
                    item?.key as keyof RegisterUserType,
                    value,
                    item?.type
                  )
                }
              />
              {item?.key === "customerMallId" && (
                <Button size="sm" onClick={handleCheckedId}>
                  중복확인
                </Button>
              )}
            </div>
          </div>
        ))}
        <p className="text-gray-400 text-right pt-[4px] pb-[20px] text-[13px]">
          최소 8글자에서 16글자, 영문 대소문자/숫자/특수문자 중 2가지 이상 조합
        </p>
        {formArray.slice(3, 5).map((item, i) => (
          <div
            key={item?.key}
            className={`grid px-[15px] py-[5px] ${i > 0 ? "" : "border-t"} border-x border-b border-gray-300`}
            style={{
              gridTemplateColumns: "100px auto",
            }}
          >
            <label
              htmlFor={id + item?.key}
              className="items-center flex text-gray-600"
            >
              {item?.label}{" "}
              {item?.required && <span className="text-[#009e48]">*</span>}
            </label>
            <div className="flex items-center justify-between gap-[8px]">
              <Input
                type={item?.type}
                id={id + item?.key}
                placeholder={item?.placeholder}
                required={item?.required}
                className="font-bold"
                value={String(body[item?.key as keyof RegisterUserType])}
                onChange={(value) =>
                  onChange(
                    item?.key as keyof RegisterUserType,
                    value,
                    item?.type
                  )
                }
              />
            </div>
          </div>
        ))}
        <Title type="h2" className="pt-[40px]">
          이용 약관 동의
        </Title>
        <div className="flex border-t border-black gap-[6px] text-[19px] items-center">
          <CheckBox
            id={id + "agree0"}
            checked={
              body.customerMallUseYn &&
              body.customerProvideInfoYn &&
              body.customerCollectInfoYn &&
              body.customerSmsRcvYn &&
              body.customerMailRcvYn
            }
            onChange={(checked) => {
              setBody({
                ...body,
                customerMallUseYn: checked,
                customerProvideInfoYn: checked,
                customerCollectInfoYn: checked,
                customerSmsRcvYn: checked,
                customerMailRcvYn: checked,
              });
            }}
          />
          <label htmlFor={id + "agree0"} className="pt-[15px] pb-[10px]">
            전체 동의 합니다.
          </label>
        </div>
        <p className="border-b border-black pb-[15px] text-[13px] text-gray-500">
          전체 동의에는 필수 및 선택 정보에 대한 동의가 포함되어 있으며,
          <br />
          개별적으로 동의를 선택 할 수 있습니다.
          <br />
          선택 항목에 대한 동의를 거부하는 경우에도 서비스 이용이 가능합니다.
        </p>
        {agreeArray.slice(0, 3).map((item, i) => (
          <div
            key={item?.key}
            className={`flex justify-between items-center text-[18px] ${i > 0 ? "border-t border-gray-300" : ""}`}
          >
            <div className="flex gap-[6px] items-center">
              <CheckBox
                id={id + item?.key}
                name={item?.key}
                checked={
                  body[item?.key as keyof RegisterUserType] ? true : false
                }
                onChange={(checked) => {
                  setBody({
                    ...body,
                    [item?.key]: checked,
                  });
                }}
              />
              <label htmlFor={id + item?.key} className="py-[15px]">
                <span
                  className={
                    item?.required ? "text-[#009e48]" : "text-gray-500"
                  }
                >
                  ({item?.required ? "필수" : "선택"})
                </span>{" "}
                {item?.label}
              </label>
            </div>
            <button>약관 보기 &gt;</button>
          </div>
        ))}
        <div
          className={`flex justify-between items-center text-[18px] border-t border-gray-300`}
        >
          <div className="flex gap-[6px] items-center">
            <CheckBox
              id={id + "agree34"}
              checked={body.customerSmsRcvYn && body.customerMailRcvYn}
              onChange={(checked) => {
                setBody({
                  ...body,
                  customerSmsRcvYn: checked,
                  customerMailRcvYn: checked,
                });
              }}
            />
            <label htmlFor={id + "agree34"} className="py-[15px]">
              <span className="text-gray-500">(선택)</span> 광고성 정보 수신
              동의
            </label>
          </div>
          <button>약관 보기 &gt;</button>
        </div>
        <div className="py-[10px] border-y border-gray-300">
          {agreeArray.slice(3, 5).map((item, i) => (
            <div
              key={item?.key}
              className={`flex gap-[6px] items-center text-[18px]`}
            >
              <CheckBox
                id={id + item?.key}
                name={item?.key}
                checked={
                  body[item?.key as keyof RegisterUserType] ? true : false
                }
                onChange={(checked) => {
                  setBody({
                    ...body,
                    [item?.key]: checked,
                  });
                }}
              />
              <label htmlFor={id + item?.key} className="py-[7px]">
                <span
                  className={
                    item?.required ? "text-[#009e48]" : "text-gray-500"
                  }
                >
                  ({item?.required ? "필수" : "선택"})
                </span>{" "}
                {item?.label}
              </label>
            </div>
          ))}
        </div>
        <Button
          type="submit"
          // disabled={
          //   !body.customerMallId ||
          //   !body.password ||
          //   !body.passwordConfirm ||
          //   !body.customerName ||
          //   !body.customerHpNum ||
          //   !body.customerMallUseYn ||
          //   !body.customerProvideInfoYn ||
          //   !checkedId
          //     ? true
          //     : false
          // }
          styleType="secondary"
          size="xl"
          className="w-full mt-[40px] max-w-[360px] mx-auto block"
        >
          가입하기
        </Button>
      </form>
    </div>
  );
}

const formArray = [
  {
    key: "customerMallId",
    label: "아이디",
    type: "text",
    placeholder: "아이디를 입력해주세요",
    required: true,
  },
  {
    key: "password",
    label: "비밀번호",
    type: "text",
    placeholder: "비밀번호를 입력해주세요",
    required: true,
  },
  {
    key: "passwordConfirm",
    label: "비밀번호 확인",
    type: "text",
    placeholder: "비밀번호를 한번 더 입력해주세요",
    required: true,
  },
  {
    key: "customerName",
    label: "이름",
    type: "text",
    placeholder: "이름을 입력해주세요",
    required: true,
  },
  {
    key: "customerHpNum",
    label: "휴대폰번호",
    type: "tel",
    placeholder: "휴대폰번호를 입력해주세요",
    required: true,
  },
  {
    key: "customerEmail",
    label: "이메일",
    type: "text",
    placeholder: "이메일을 입력해주세요",
    required: false,
  },
];
const agreeArray = [
  { key: "customerMallUseYn", label: "이용약관 동의", required: true },
  {
    key: "customerProvideInfoYn",
    label: "개인정보 처리방침 동의",
    required: true,
  },
  {
    key: "customerCollectInfoYn",
    label: "개인정보 수집 · 이용 동의",
    required: false,
  },
  { key: "customerSmsRcvYn", label: "SMS 수신 동의", required: false },
  { key: "customerMailRcvYn", label: "이메일 수신 동의", required: false },
];
