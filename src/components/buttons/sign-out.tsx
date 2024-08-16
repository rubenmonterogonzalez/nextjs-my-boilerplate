import { signOut } from "@/auth"
import { Button } from "@mantine/core"

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button
        color="black"
        type="submit"
      >Sign Out</Button>
    </form>
  )
}