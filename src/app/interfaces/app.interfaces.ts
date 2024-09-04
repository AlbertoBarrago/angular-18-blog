interface Article {
  _id: string;
  author: string;
  title: string;
  content: string;
  shortContent: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
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

export { Article, User, UserLoggedIn };
