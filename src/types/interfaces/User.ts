interface UserRequest {
  username: string;
  classe: string;
  level: number;
  password: string;
}

interface User extends Omit<UserRequest, 'password'> {
  id: number;
  password?: string;
}

interface UserFullProps extends Omit<User, 'password'> {
  password: string;
}

export {
  User,
  UserFullProps,
  UserRequest,
};
