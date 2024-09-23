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

enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: Role;
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

export {
  Article,
  User,
  UserLoggedIn,
  FilterArticles,
  PaginatedResponse,
  DisplayedColumns,
  Role,
};
