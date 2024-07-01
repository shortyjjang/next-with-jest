'use client'
import Link from "next/link";

export default function Home() {

  return (
    <div className="w-[400px] mx-auto">
      <Link href="/member/register">회원가입</Link>
      <Link href="/member/login">로그인</Link>
    </div>
  );
}
