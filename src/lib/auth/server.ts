import { createNeonAuth } from '@neondatabase/auth/next/server';

export const auth = createNeonAuth({
  baseUrl:
    process.env.NEON_AUTH_BASE_URL ||
    'https://ep-noisy-field-b57zxx3z.neonauth.c-7.us-east-2.aws.neon.tech/neondb/auth',
  cookies: {
    secret:
      process.env.NEON_AUTH_COOKIE_SECRET ||
      'eazi_moni_default_secret_32_chars_min_len',
  },
});
