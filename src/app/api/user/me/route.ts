import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  try {
    if (!session) {
      return NextResponse.json(
        {
          error: {
            name: 'Error',
            message: 'You are not authenticated',
            key: 'ERROR_NOT_AUTHENTICATED',
          },
        },
        { status: 403 }
      );
    }

    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        {
          error: {
            name: 'Error',
            message: 'No user found, you are likely not authenticated',
            key: 'ERROR_NOT_AUTHENTICATED',
          },
        },
        { status: 500 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: {
            name: 'Error',
            message: 'User not found in database',
            key: 'ERROR_USER_NOT_FOUND',
          },
        },
        { status: 404 }
      );
    }

    // Safely clean the user object
    const cleanedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return NextResponse.json({ data: cleanedUser }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error: {
          name: 'Error',
          message: 'Could not fetch user',
          key: 'ERROR_COULD_NOT_FETCH',
        },
      },
      { status: 500 }
    );
  }
}
