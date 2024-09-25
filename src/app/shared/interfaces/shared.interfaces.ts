interface Article {
  _id: string;
  author: string;
  title: string;
  content: string;
  shortContent: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
}

enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

type UserRole = 'ADMIN' | 'USER';

interface User {
  _id: string;
  username: string;
  email: string;
  role: RoleEnum;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface UserLoggedIn {
  username: string;
  password: string;
  token: string;
  user: User;
}

interface FilterArticles {
  q: string;
}

interface DisplayedColumns {
  key: string;
  label: string;
}

interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
  role: UserRole;
}

export {
  Article,
  User,
  UserLoggedIn,
  FilterArticles,
  PaginatedResponse,
  DisplayedColumns,
  UserRole,
  RoleEnum,
  JwtPayload,
};
