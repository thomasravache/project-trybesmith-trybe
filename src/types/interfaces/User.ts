interface User {
  username: string;
  classe: string;
  level: number;
  password: string;
}

interface UserFullProps extends User {
  id: number;
}

export {
  User,
  UserFullProps,
};
