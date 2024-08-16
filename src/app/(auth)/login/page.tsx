import AuthCard from "@/components/auth/auth-card";
import { AuthCopyright } from "@/components/auth/auth-copyright";
import { Logo } from "@/components/logo";

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <>
      <Logo width={150} height={30} />
      <AuthCard type={"login"} />
      <AuthCopyright />
    </>
  );
}