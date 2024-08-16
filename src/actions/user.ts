'use server';

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from '@/components/error/prisma-error';
import { hashPassword } from "@/lib/password";

export async function getUser(args: Prisma.UserFindUniqueArgs) {
  try {
    const data = await prisma.user.findUnique(args);
    return { data, error: null };
  } catch (error) {
    return null;
  }
}

export async function createUser(args: Prisma.UserCreateArgs) {
  try {
    const { hashedPassword, salt } = await hashPassword(args.data.hashedPassword || '');

    const newUserArgs = {
      ...args,
      data: {
        ...args.data,
        hashedPassword: hashedPassword,
        salt: salt,
      },
    };

    const data = await prisma.user.create(newUserArgs);
    return { data, error: null };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const data = await prisma.user.delete({ where: { id } });
    return { data, error: null };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function updateUser(args: Prisma.UserUpdateArgs) {
  try {
    const data = await prisma.user.update(args);
    return { data, error: null };
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function upsertUser(args: Prisma.UserUpsertArgs) {
  try {
    const data = await prisma.user.upsert(args);
    return { data, error: null };
  } catch (error) {
    return handlePrismaError(error);
  }
}