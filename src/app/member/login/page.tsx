"use client";
import Button from "@/entities/form/button";
import Input from "@/entities/form/input";
import Title from "@/entities/text/title";
import useUserInfo from "@/shared/store/user";
import { validatationPassword } from "@/shared/utils/validatation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LoginLanding() {
  const { setUser } = useUserInfo();
  const router = useRouter();
  const loginIdRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [body, setBody] = useState<LoginParams>({
    username: "",
    password: "",
  });
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatationPassword(body.password)) {
      alert(
        "비밀번호는 8자 이상, 16자 이하,\n영문, 숫자, 특수문자 중 두가지를 포함해야 합니다."
      );
      return;
    }
    localStorage.setItem("token", "token");
    setUser(body.username, "token");
    router.push("/");
  };
  useEffect(() => {
    if (!loginIdRef.current) return;
    loginIdRef.current?.focus();
  }, [loginIdRef]);
  return (
    <div className="max-w-[400px] mx-auto p-8">
      <Title>로그인</Title>
      <form onSubmit={handleLogin}>
        <Input
          ref={loginIdRef}
          value={body.username}
          onChange={(value) => setBody({ ...body, username: value })}
          styleType="border"
          className="mb-[10px]"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              passwordRef.current?.focus();
            }
          }}
          required={true}
          placeholder="아이디"
        />
        <Input
          ref={passwordRef}
          type="password"
          styleType="border"
          className="mb-[10px]"
          value={body.password}
          onChange={(value) => setBody({ ...body, password: value })}
          required={true}
          placeholder="비밀번호"
        />
        <Button
          disabled={!body.username || !body.password}
          styleType="primary"
          size="lg"
          type="submit"
          className="w-full"
        >
          로그인
        </Button>
      </form>
    </div>
  );
}
