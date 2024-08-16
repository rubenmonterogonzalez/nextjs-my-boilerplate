import type { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { ModalsProvider } from '@mantine/modals';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './auth-provider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <AuthProvider>
          <MantineProvider>
            <ModalsProvider>
              <NavigationProgress />
              <Notifications />
              {children}
            </ModalsProvider>
          </MantineProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  );
}
