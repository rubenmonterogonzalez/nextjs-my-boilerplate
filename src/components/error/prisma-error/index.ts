export function handlePrismaError(error: any) {
  console.error('handlePrismaError', error);

  const isPrismaError = error?.code && error?.meta && error?.clientVersion;

  if (isPrismaError) {
    return {
      data: undefined,
      error: {
        name: 'PrismaError',
        code: error.code,
        message: error.message,
        key: 'PRISMA_ERROR',
        meta: error.meta,
        clientVersion: error.clientVersion,
      },
    };
  }
  return {
    data: undefined,
    error: {
      name: 'ServerError',
      code: '500',
      message: error.message || 'An unexpected error occurred',
      key: 'UNKNOWN_ERROR',
    },
  };
}
