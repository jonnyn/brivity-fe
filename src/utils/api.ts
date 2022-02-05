import { apiEndpoints } from "utils/config";

// Create an Account and User sign in
export const signInSignUp = async (newUser: boolean, data: User) => {
  const url = newUser ? apiEndpoints.create_user : apiEndpoints.sign_in;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: data }),
  });
  const auth = response.headers.get("Authorization");
  const result = await response.json();
  return { ...result, auth };
};

// Get Posts Index - Paginated
export const fetchPosts = async (page: number) => {
  const response = await fetch(`${apiEndpoints.posts}?page=${page}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Get post details
export const getPostDetails = async (postId: number) => {
  const response = await fetch(`${apiEndpoints.posts}/${postId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Get Post Comments - Paginated
export const getPostComments = async (postId: number, page: number) => {
  const response = await fetch(
    `${apiEndpoints.posts}/${postId}/comments?page=${page}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Create a Post - Protected
export const createNewPost = async (token: string, data: Post) => {
  const response = await fetch(apiEndpoints.posts, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: data }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Edit an Existing Post - Protected
export const editExistingPost = async (token: string, data: Post) => {
  const { id, ...param } = data;
  const response = await fetch(`${apiEndpoints.posts}/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: param }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Delete a Post - Protected
export const deletePost = async (token: string, id: number) => {
  const response = await fetch(`${apiEndpoints.posts}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.status;
};

// Create a Comment - Protected
export const createComment = async (token: string, data: PostComment) => {
  const response = await fetch(apiEndpoints.comments, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment: data }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Edit an Existing Comment - Protected
export const editExistingComment = async (token: string, data: PostComment) => {
  const { id, ...param } = data;
  const response = await fetch(`${apiEndpoints.comments}/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment: param }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Delete a Comment - Protected
export const deleteComment = async (token: string, commentId: number) => {
  const response = await fetch(`${apiEndpoints.comments}/${commentId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.status;
};
