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

interface FilterArticles {
  title?: boolean;
  content?: boolean;
  shortContent?: boolean;
  author?: boolean;
}

export { Article, User, UserLoggedIn, FilterArticles };
