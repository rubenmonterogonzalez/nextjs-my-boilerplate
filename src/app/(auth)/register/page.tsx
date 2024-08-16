import AuthCard from "@/components/auth/auth-card";
import { AuthCopyright } from "@/components/auth/auth-copyright";
import { Logo } from "@/components/logo";

export const dynamic = 'force-dynamic';

export default async function RegisterPage() {
  return (
    <>
      <Logo width={150} height={30} />
      <AuthCard type={"register"} />
      <AuthCopyright />
    </>
  );
}
