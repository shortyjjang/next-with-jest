'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/member/login");
  }, []);
  return (
    <div className="w-[400px] mx-auto">
      <Link href="/member/register">회원가입</Link>
      <Link href="/member/login">로그인</Link>
    </div>
  );
}
