'use client';

import { useForm } from '@mantine/form';
import { Button, Checkbox, Group, PasswordInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { handleLogin, handleRegister } from "@/utils/auth-handlers";
import { AuthResult } from '@/types/auth-types';

const REDIRECT_TIMEOUT = 2000;

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      keepLogged: true,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid Email'),
      password: (value) => (value.length > 6 ? null : 'Password must be at least 6 characters long'),
      ...(type === 'register' && {
        name: (value: string) => (value.trim() ? null : 'Name is required'),
      }),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const { email, password, name } = values;
    try {
      let result: AuthResult;
      if (type === "login") {
        result = await handleLogin(email, password);
        if (result.success) {
          notifications.show({
            title: 'Login',
            message: 'Login successful' || result.messageKey,
            color: "green",
          });
          router.push(result.redirectUrl || '/');
        } else {
          throw new Error(result.error || "Login failed");
        }
      } else {
        result = await handleRegister(name, email, password);
        if (result.success) {
          notifications.show({
            title: 'Register',
            message: 'Please login with your accont!' || result.messageKey,
            color: "green",
          });
          setTimeout(() => {
            router.push(result.redirectUrl || '/');
          }, REDIRECT_TIMEOUT);
        } else {
          throw new Error(result.error || "Registration failed");
        }
      }
    } catch (error) {
      notifications.show({
        title: "ERROR",
        message: `${error}`,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
      {type === 'register' && (
        <TextInput
          label='Name'
          placeholder='Name'
          size="md"
          {...form.getInputProps('name')}
          required
          withAsterisk={false}
        />
      )}
      <TextInput
        label='Email Address'
        placeholder="your@email.com"
        mt="md"
        size="md"
        {...form.getInputProps('email')}
        required
        withAsterisk={false}
      />
      <PasswordInput
        label='Password'
        placeholder='Password'
        mt="md"
        size="md"
        {...form.getInputProps('password')}
        required
        withAsterisk={false}
      />
      {type === "login" && (
        <Group justify="space-around" mt="lg">
          <Checkbox
            label='Remember me'
            size="md"
            checked={form.values.keepLogged}
            {...form.getInputProps('keepLogged')}
          />
          <Button
            component={Link}
            href={"/forgot-password"}
            variant="transparent"
            fw={700}
            size="md">
            Forgot Password
          </Button>
        </Group>
      )}
      <Button
        fullWidth
        mt="xl"
        size="md"
        color="black"
        type="submit"
        loading={loading}
      >
        {loading ? 'Processing' : type === "login" ? 'Login' : 'Register'}
      </Button>
    </form>
  );
}
