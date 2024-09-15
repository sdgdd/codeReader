import { useRoutes, Navigate } from "react-router-dom";
import Answer from "../pages/Answer";
import Books from "../pages/Books";
import FaceQuestion from "../pages/FaceQuestion";
import VideoTeach from "../pages/VideoTeach";
import AddQuestion  from "../pages/AddQuestion";
import QuestionDetail from "../pages/QuestionDetail";

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
    {
      path: "/addQuestion",
      element: <AddQuestion ></AddQuestion>,
    },
    {
      path: "/questionDetail/:id",
      element: <QuestionDetail></QuestionDetail>,
    }
  ]);
}
