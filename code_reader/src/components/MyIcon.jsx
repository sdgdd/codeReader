import React from 'react';
import style from "../css/MyIcon.module.css";

function MyIcon({name, color = "unset", hoverColor = "unset", size = "14px",onClick}) {
    const [iconColor, setIconColor] = React.useState(color);

    const handleClick = () => {
        console.log("click");
        onClick?.()
    }

    const handleMouseOver = () => {
        console.log("mouse over");
        setIconColor(hoverColor)
    }
    const handleMouseLeave = () => {
        console.log("mouse leave");
        setIconColor(color)
    }

    return (
        <div style={{height: size, width: size,cursor: hoverColor==="unset"?"":"pointer"}}>
            <svg aria-hidden="true"
                 className={style.giveLike}
                 style={{fill: iconColor, width: "100%", height: "100%"}}
                 onClick={handleClick}
                 onMouseOver={handleMouseOver}
                 onMouseLeave={handleMouseLeave}>
                <use href={"#icon-" + name}></use>
            </svg>
        </div>


    );
}

export default MyIcon;