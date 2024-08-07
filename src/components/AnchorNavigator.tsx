import { useEffect, useState } from "react";
import { NavigationData } from "../types";

//a voir si on peut utiliser le dsfr

type AnchorNavigatorProps = {
  data: NavigationData;
};
export const AnchorNavigator: React.FC<AnchorNavigatorProps> = ({ data }) => {
  const [navClass, setNavClass] = useState<string>("fixed-navigation");

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={navClass}>
      {data.ancre.map((a) => (
        <a href={"#" + a.ancre} key={a.ancre}>
          <div className="anchor">{a.titre}</div>
        </a>
      ))}
    </div>
  );
};
