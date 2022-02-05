import React, { useContext, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader } from "components";
import { UserContext } from "contexts";

const Authenticate = lazy(() => import("scenes/Authenticate"));
const Home = lazy(() => import("scenes/Home"));
const PostDetails = lazy(() => import("scenes/PostDetails"));

const AppRoutes = () => {
  const [state] = useContext(UserContext);

  return (
    <div className="container mx-auto px-4 py-4 h-full">
      <Suspense fallback={<Loader />}>
        {state.user?.auth ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:postId" element={<PostDetails />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Authenticate />} />
          </Routes>
        )}
      </Suspense>
    </div>
  );
};

export default AppRoutes;
