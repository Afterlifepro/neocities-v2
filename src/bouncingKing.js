import { useContext, useEffect, useRef, useState } from "react";
import assets from "./Assets";
import {GlobalsContext} from "./Globals";

export default function BouncingKing() {

  const globals = useContext(GlobalsContext);

  const [x, setX] = useState(100);
  const [y, setY] = useState(100);

  const timeStarted = useRef(undefined);
  const velocity = useRef({ x: 1, y: 1 });

  const bounceAround = (timestamp) => {
    if (!timeStarted.current) {
      console.log("timestarted");
      if (typeof timestamp === "number") {
        console.log("set timestarted");
        timeStarted.current = timestamp;
      } else {
        console.log("ignore timestarted");
        requestAnimationFrame(bounceAround);
      }
    }

    const elapsed = timestamp - timeStarted.current;

    setX((old) => {
      if (Number.isNaN(old) || typeof old === "undefined") return 0;

      let nextX = old + velocity.current.x;

      if (window.innerWidth < nextX + 100) velocity.current.x = -1;
      if (0 > nextX) velocity.current.x = 1;

      return old + velocity.current.x;
    });


    setY((old) => {
      if (Number.isNaN(old) || typeof old === "undefined") return 0;

      let nextX = old + velocity.current.y;

      if (window.innerHeight < nextX + 100) velocity.current.y = -1;
      if (0 > nextX) velocity.current.y = 1;

      return old + velocity.current.y;
    });

    requestAnimationFrame(bounceAround);
  };


  return (
    <img
      src={assets.images.gifs.misc.skull.src}
      alt={assets.images.gifs.misc.skull.alt}
      style={{
        position: "absolute",
        left: x,
        top: y,
        border: "none",
        width: "100px",
        height: "100px",
        zIndex: 0,
      }}
      onLoad={bounceAround}
      onClick={() => {
        console.log("clicked")
        globals.newApp({ name: "seasonalSpooky", source: "bouncing king" });
      }}
    />
  );
}
