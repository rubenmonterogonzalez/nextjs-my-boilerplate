'use client'

import { Button, Title, Text, } from '@mantine/core';
import classes from '@/components/auth/auth.module.css';
import Link from 'next/link';
import AuthForm from '@/components/forms/auth/auth-form';


export default function AuthCard({ type }: { type: "login" | "register" }) {
  return (
    <>
      <Title
        order={2}
        className={classes.title}
        ta="center"
        mt="md"
        mb={50}
        size={25}
        fw={500}
      >
        Welcome {type === "login" ? "back" : ""} to your App!
      </Title>

      <AuthForm type={type} />

      <Text ta="center" mt={12}>
        {type === "login" ? "Do not have an account yet?" : "Already have an account?"}{' '}
        <Button
          variant="transparent"
          component={Link}
          href={type === "login" ? "/register" : "/login"}
          fw={700}
          size="md"
        >
          {type === "login" ? "Register" : "Log in"}
        </Button>
      </Text>
    </>

  );
}