import { ReactNode } from 'react';
import { Paper } from '@mantine/core';
import classes from '@/components/auth/auth.module.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default async function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          {children}
        </Paper>
      </div>
    </>
  );
}