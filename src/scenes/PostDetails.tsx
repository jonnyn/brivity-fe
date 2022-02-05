import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";
import {
  getPostDetails,
  getPostComments,
  editExistingPost,
  deletePost,
  createComment,
  editExistingComment,
  deleteComment,
} from "utils/api";
import { UserContext } from "contexts";
import { Button } from "components";

export default function PostDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  const postId = params?.postId || "";
  const [commentPage, setCommentPage] = useState<number>(1);
  const [editPost, setEditPost] = useState<Post>({
    id: 0,
    title: "",
    body: "",
  });
  const [disabledEdit, setDisabledEdit] = useState<boolean>(true);
  const [editComment, setEditComment] = useState<PostComment>({
    id: -1,
    content: "",
  });

  const queryClient = useQueryClient();
  // Queries
  const { status, data } = useQuery<{ post: Post }, Error>(
    ["postDetails", postId],
    () => getPostDetails(parseInt(postId, 10))
  );
  const commentsQuery = useQuery<
    { comments: PostComment[]; meta: Meta },
    Error
  >(["postComments", postId, commentPage], () =>
    getPostComments(parseInt(postId, 10), commentPage)
  );

  // Mutations
  const editPostMutation = useMutation(
    (data: Post) => editExistingPost(state.user?.auth, data),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("postDetails");
      },
    }
  );
  const deletePostMutation = useMutation(
    (postId: number) => deletePost(state.user?.auth, postId),
    {
      onSuccess: () => {
        navigate(-1);
        queryClient.invalidateQueries("posts");
      },
    }
  );
  const postCommentMutation = useMutation(
    (data: PostComment) => createComment(state.user?.auth, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("postComments");
        setNewComment({
          post_id: data?.post.id,
          content: "",
        });
      },
    }
  );
  const editCommentMutation = useMutation(
    (data: PostComment) => editExistingComment(state.user?.auth, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("postComments");
        setEditComment({
          post_id: -1,
          content: "",
        });
      },
    }
  );
  const deleteCommentMutation = useMutation(
    (commentId: number) => deleteComment(state.user?.auth, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("postComments");
      },
    }
  );

  const [newComment, setNewComment] = useState<PostComment>({
    post_id: data?.post.id,
    content: "",
  });

  useEffect(() => {
    if (status === "success") {
      setEditPost({
        id: data?.post?.id || 0,
        title: data?.post?.title || "",
        body: data?.post?.body || "",
      });
      setNewComment({
        post_id: data?.post.id,
        content: "",
      });
    }
  }, [status, data]);

  const { created_at, user } = data?.post || {};
  const { comments, meta } = commentsQuery.data || {};
  const hasMoreComments = useMemo(() => {
    return meta
      ? meta.current_page * meta.per_page < meta.total_entries
      : false;
  }, [meta]);

  const onPostInputChange = (name: string, value: string) => {
    setEditPost((prev: Post) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSavePost = () => {
    if (!disabledEdit) {
      // save edited post
      editPostMutation.mutate(editPost);
    }
    setDisabledEdit((prev) => !prev);
  };

  const handleEditSaveComment = (comment: PostComment) => {
    if (editComment.id === comment.id) {
      // save edited comment
      editCommentMutation.mutate(editComment);
    } else {
      setEditComment({ id: comment.id, content: comment.content });
    }
  };

  return (
    <div className="flex flex-col">
      <Button
        text="Back"
        style={{ width: "6rem" }}
        onClick={() => navigate(-1)}
      />
      <div className="h-full w-full p-4">
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
          value={editPost.title}
          disabled={disabledEdit}
          onChange={(x) => onPostInputChange("title", x.target.value)}
        />
        <div className="flex items-center justify-between py-2">
          <span>Created at: {new Date(created_at).toUTCString()}</span>
          <span>By {user?.display_name}</span>
        </div>
        <textarea
          className="appearance-none border rounded w-full py-2 px-3 h-48 overflow-y-scroll text-grey-darker mb-3"
          value={editPost.body}
          disabled={disabledEdit}
          onChange={(x) => onPostInputChange("body", x.target.value)}
        />
        <div
          className="flex items-center justify-between"
          style={{
            display: state.user.id === user?.id ? "" : "none",
          }}
        >
          <Button
            text={disabledEdit ? "Edit" : "Save"}
            onClick={handleEditSavePost}
          />
          <Button
            className="bg-rose-300 hover:bg-rose-600"
            text="Delete"
            onClick={() => deletePostMutation.mutate(data?.post?.id || -1)}
          />
        </div>
      </div>
      <div className="h-full w-full p-4">
        <div className="py-4">
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
            value={newComment.content}
            placeholder="Write Comment"
            onChange={(x) =>
              setNewComment((prev) => ({ ...prev, content: x.target.value }))
            }
          />
          <Button
            onClick={() => postCommentMutation.mutate(newComment)}
            text="Post Comment"
          />
        </div>
        <div className="py-2">Comments ({meta?.total_entries})</div>
        <div className="appearance-none border rounded w-full py-2 px-3 text-grey-darker h-80 overflow-y-scroll">
          {comments?.map((comment) => (
            <div key={comment.id} className="py-2 px-4">
              <textarea
                className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                defaultValue={comment.content}
                disabled={editComment.id !== comment.id}
                onChange={(x) =>
                  setEditComment({ id: comment.id, content: x.target.value })
                }
              />
              <div>
                Created at: {new Date(comment.created_at).toUTCString()} - By:{" "}
                {comment.user?.display_name}
              </div>
              <div
                className="pr-6 py-4 text-right text-sm font-medium flex"
                style={{
                  display: state.user.id === comment?.user?.id ? "" : "none",
                }}
              >
                <button
                  className="text-indigo-600 hover:text-indigo-900 pr-4"
                  onClick={() => handleEditSaveComment(comment)}
                >
                  {editComment.id !== comment.id ? "Edit" : "Save"}
                </button>
                <button
                  className="text-indigo-600 hover:text-indigo-900 pr-4"
                  onClick={() => deleteCommentMutation.mutate(comment.id || 0)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between py-4">
          <Button
            text="Previous Page"
            disabled={commentPage === 1}
            onClick={() => setCommentPage((prev) => Math.max(prev - 1, 0))}
          />
          <div>
            <span>Current Page: {commentPage}</span>
            {commentsQuery.isFetching ? <span> Loading...</span> : null}{" "}
          </div>
          <Button
            text="Next Page"
            onClick={() => {
              if (!commentsQuery.isPreviousData && hasMoreComments) {
                setCommentPage((prev) => prev + 1);
              }
            }}
            disabled={commentsQuery.isPreviousData || !hasMoreComments}
          />
        </div>
      </div>
    </div>
  );
}
