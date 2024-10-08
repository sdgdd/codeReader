import React from "react";
import GrenerateAvatar from "../components/GrenerateAvatar";

export default function Books() {
  const [isShown, setIsShow] = React.useState(false);
  return <div>
    <button onClick={()=>{setIsShow(!isShown)}}>change</button>
    {isShown? <GrenerateAvatar /> : null}
    </div>;
}
