import React, { useContext, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import { useAppSelector, useAppDispatch } from "hooks";
// import { authenticate } from "modules/app/app.slice";
import { Loader } from "components";
import { UserContext } from "contexts/UserContext";

const Authenticate = lazy(() => import("scenes/Authenticate"));
const Home = lazy(() => import("scenes/Home"));
const PostDetail = lazy(() => import("scenes/PostDetail"));

const AppRoutes = () => {
  const [state] = useContext(UserContext);
  console.log("state.loggedIn", state.loggedIn);

  return (
    <div className="flex">
      <Suspense fallback={<Loader />}>
        <Routes>
          {!state.loggedIn ? (
            <Route path="/" element={<Home />}>
              <Route path=":post_id" element={<PostDetail />} />
            </Route>
          ) : (
            <Route path="/" element={<Authenticate />} />
          )}
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppRoutes;
