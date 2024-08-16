import { Montserrat } from "next/font/google";
import { AppProviders } from "@/providers";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/spotlight/styles.css';
import './globals.css'
import { ColorSchemeScript } from "@mantine/core";
import { Metadata } from "next";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Next Boilerplate',
  description: 'Next.js boilerplate with Authjs, TypeScript, ESLint, Prisma, Mantine, and more.',
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${montserrat.variable}`} suppressHydrationWarning={true}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

