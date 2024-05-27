import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AnchorNavigator = ({ data }) => {
  const [navClass, setNavClass] = useState("fixed-navigation");

  window.addEventListener("scroll", () => {
    if (
      window.scrollY >= 162 &&
      window.scrollY <= document.body.scrollHeight - 750
    ) {
      setNavClass("fixed-navigation fixed-nav");
    } else if (window.scrollY > document.body.scrollHeight - 750) {
      setNavClass("fixed-navigation ty450");
    } else {
      setNavClass("fixed-navigation");
    }
  });

  return (
    <div className={navClass}>
      {data.ancre.map((a) => {
        return (
          <a href={"#" + a.ancre}>
            <div className="anchor">{a.titre}</div>
          </a>
        );
      })}
    </div>
  );
};
