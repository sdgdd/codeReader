import { useRoutes, Navigate } from "react-router-dom";
import Answer from "../pages/Answer";
import Books from "../pages/Books";
import FaceQuestion from "../pages/FaceQuestion";
import VideoTeach from "../pages/VideoTeach";

export default function HomeRouter() {
  return useRoutes([
    {
      path: "/answer",
      element: <Answer></Answer>,
    },
    {
      path: "/books",
      element: <Books></Books>,
    },
    {
      path: "/faceQuestion",
      element: <FaceQuestion></FaceQuestion>,
    },
    {
      path: "/videoTeach",
      element: <VideoTeach></VideoTeach>,
    },
    {
      path: "/",
      element: <Navigate to="/answer"></Navigate>,
    },
  ]);
}
