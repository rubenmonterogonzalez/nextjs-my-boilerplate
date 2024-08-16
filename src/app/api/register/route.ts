import { getUserByEmail } from '@/actions/email';
import { hashPassword } from '@/lib/password';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const { hashedPassword, salt } = await hashPassword(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return NextResponse.json({ message: "This email is already in use. Please try another." }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      salt,
    }
  });

  return NextResponse.json({ user, message: "User created!" })
}