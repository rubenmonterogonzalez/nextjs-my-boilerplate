import { auth } from "@/auth"
import { SignOutButton } from "@/components/buttons/sign-out"

export default async function Platform() {
  const session = await auth()

  return (
    <>
      <div>Welcome {session?.user?.name} to the protected area</div>
      <div>Thanks for register</div>
      <SignOutButton />
    </>
  )
}