type JwtPayload = {
  sub: {
    id: number,
    username: string,
  };
};

type JwtOptions = {
  expiresIn: string;
  algorithm: 'HS256';
};

export {
  JwtPayload,
  JwtOptions,
};
