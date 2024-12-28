import React from "react";
import MyIcon from "../components/MyIcon";
import style from "../css/MyIcon.module.css";
export default function FaceQuestion() {
  return <div style={{height:"20px",width:"20px"}}>
    <MyIcon name="giveLike" color="red" hoverColor="green"></MyIcon>
  </div>;
}
