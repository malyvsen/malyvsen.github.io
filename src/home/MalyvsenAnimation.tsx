import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

function MalyvsenAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <span onMouseEnter={() => setIsAnimating(true)}>
      {isAnimating ? (
        <TypeAnimation
          sequence={[
            "malyvsen",
            "mikołaj",
            1000,
            "bocheński",
            1000,
            "malyvsen",
            () => setIsAnimating(false),
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

export default MalyvsenAnimation;
