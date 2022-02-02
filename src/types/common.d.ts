// declare module 'react-helmet'

type User = {
  id?: number;
  email?: string;
  password?: string;
  display_name?: string;
  auth?: string | null;
};

type Post = {
  id?: number;
  title: string;
  body: string;
  created_at?: date;
  updated_at?: date;
  comment_count?: number;
  user?: User;
};

type PostComment = {
  id?: number;
  post_id?: number;
  content: string;
  created_at?: date;
  updated_at?: date;
  user?: User;
};

type Meta = {
  current_page: number;
  per_page: number;
  total_entries: number;
};

type Action = {
  type: string;
  payload: any;
};
