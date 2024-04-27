import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

function Malyvsen() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span onMouseEnter={() => setIsHovered(true)}>
      {isHovered ? (
        <TypeAnimation
          sequence={[
            "malyvsen",
            "mikołaj",
            1000,
            "bocheński",
            1000,
            "malyvsen",
            () => setIsHovered(false),
          ]}
          preRenderFirstString={true}
          wrapper="span"
          cursor={true}
          repeat={0}
        />
      ) : (
        "malyvsen"
      )}
    </span>
  );
}

export default Malyvsen;
