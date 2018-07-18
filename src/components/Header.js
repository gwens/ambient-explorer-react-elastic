import React from "react";
import Wave from "../images/wave-icon.png";

const Header = () => {
  return (
    <header className="tooltip">
      <img className="icon" src={Wave} alt="sound wave" /><span className="tooltiptext">http://music.hyperreal.org/lists/ambient/archives/ </span>
    </header>     
  )
}

export default Header;
