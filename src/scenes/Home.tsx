import React, { useContext, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { UserContext } from "contexts/UserContext";
import { fetchPosts, createNewPost, deletePost } from "utils/api";
import { Button, Loader } from "components";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [state, dispatch] = useContext(UserContext);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    useQuery<{ posts: Post[]; meta: Meta }, Error>(
      ["posts", page],
      () => fetchPosts(page),
      {
        keepPreviousData: true,
      }
    );

  // Mutations
  const createPostMutation = useMutation(
    (data: { post: Post }) => createNewPost(state.user?.auth, data),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("posts");
        setNewPost({ title: "", body: "" });
      },
    }
  );
  const deletePostMutation = useMutation(
    (postId: number) => deletePost(state.user?.auth, postId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const hasMorePost = useMemo(() => {
    return data?.meta
      ? data.meta.current_page * data.meta.per_page < data.meta.total_entries
      : false;
  }, [data]);

  const onInputChange = (name: string, value: string | number | boolean) => {
    setNewPost((prev: Post) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex">
        <div>Error: {error?.message}</div>;
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="h-full overflow-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
          <div className="mb-3 xl:w-96">
            <input
              className="appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              type="text"
              placeholder="Post title"
              onChange={(x) => onInputChange("title", x.target.value)}
            />
            <textarea
              className="form-control block w-full py-2 px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Add your new post message"
              value={newPost.body}
              onChange={(x) => onInputChange("body", x.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <Button
              text="New Post"
              onClick={() => createPostMutation.mutate({ post: newPost })}
            />
            <Button
              text="Logout"
              onClick={() =>
                dispatch({
                  type: "SET_USER",
                  payload: null,
                })
              }
            />
          </div>
          <div className="py-4">
            <table className="shadow border-b border-gray-200 sm:rounded-lg divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Body
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Comment Count
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.posts?.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{post.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{post.body}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.comment_count}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium flex">
                      <Link
                        className="text-indigo-600 hover:text-indigo-900 pr-4"
                        to={`/posts/${post.id}`}
                      >
                        View
                      </Link>
                      <button
                        style={{
                          display:
                            state.user.id === post?.user?.id ? "" : "none",
                        }}
                        className="text-indigo-600 hover:text-indigo-900 pr-4"
                        onClick={() => deletePostMutation.mutate(post.id || -1)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-4">
        <Button
          text="Previous Page"
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        />
        <div>
          <span>Current Page: {page}</span>
          {isFetching ? <span> Loading...</span> : null}{" "}
        </div>
        <Button
          text="Next Page"
          onClick={() => {
            if (!isPreviousData && hasMorePost) {
              setPage((prev) => prev + 1);
            }
          }}
          disabled={isPreviousData || !hasMorePost}
        />
      </div>
    </div>
  );
}
