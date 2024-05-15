export const COOKIE_SETTINGS = {
  REFRESH_TOKEN: {
    httpOnly: true,
    maxAge: 6048e5, // 7 дней
  },
};

export const ACCESS_TOKEN_EXPIRATION = 18e5; // 30 минут