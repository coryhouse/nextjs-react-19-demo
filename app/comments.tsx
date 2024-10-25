import { use } from "react";
import { Comment } from "./types";

interface CommentsProps {
  commentsPromise: Promise<Response>;
}

export function Comments({ commentsPromise }: Readonly<CommentsProps>) {
  // Suspense fallback renders until this promise resolves
  const commentsResponse = use(commentsPromise);
  const comments = use(commentsResponse.json()) as Comment[];

  return (
    <>
      <h2>Comments</h2>
      <ul>
        {comments.map(({ id, body }) => (
          <li key={id}>{body}</li>
        ))}
      </ul>
    </>
  );
}
