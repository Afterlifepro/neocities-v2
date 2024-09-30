import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { GlobalsContext } from "./Globals";
import assets from "./Assets";
import { contrastingColor } from "./colourUtils";

// this is the component for goobers!
// its like. really messy
// im sorry abt that ill do my best to comment but im gonna be real im done w commenting everything i didnt do it as i went which was my mistake its tiring lmao
function Goobers({ len }) {
  // preserve the state of the goobers in state so it doesnt change when the component is re-rendered
  const goobersState = useState(
    // create an empty array of empty strings
    Array.apply(null, Array(len))
      .map(function () {
        return "";
      })
      // then for every empty string (the length in len)
      .map((_, i) => {
        // the goober is a random goober in the list
        let goober =
          assets.goobers[Math.floor(Math.random() * assets.goobers.length)];
        return (
          <Fragment key={i + 2 * len}>
            {/* chance to be empty */}
            {Math.floor(Math.random() * 2.5) === 0 ? (
              <div key={i + len} id={i + len} className={"goober clear"}></div>
            ) : null}
            {/* add the goober if its not empty */}
            <img
              className={
                "goober" +
                goober.tags
                  // 50% chance to remove flip tag
                  .map((tag) =>
                    tag === "flip"
                      ? Math.floor(Math.random() * 2) === 1
                        ? " " + tag
                        : null
                      : " " + tag
                  )
                  .join([])
              }
              // src is a random image from the options
              src={goober.imgs[Math.floor(Math.random() * goober.imgs.length)]}
              // its decorative - screen readers dont need it
              alt=""
              key={i}
              id={i}
            />
          </Fragment>
        );
      })
  );

  return <div className="goobers">{goobersState[0].map((val) => val)}</div>;
}

// when you click close, close the app
export function CloseButton({ delID }) {
  const global = useContext(GlobalsContext);

  return (
    <button
      data-closes-id={delID}
      onClick={() => {
        global.deleteApp(delID);
      }}
    >
      <img
        src={assets.system.buttons.close}
        alt="Close Button"
        className="close"
      />
    </button>
  );
}

export function Window({
  title,
  icon,
  content,
  children,
  delID,
  size = "normal",
  colour = null,
  source,
}) {
  // state for coords
  const coordsRange = Math.min(
    Math.min(window.innerWidth, window.innerHeight) * 0.8,
    600
  );
  const [posX, setPosX] = useState(
    Math.floor(Math.random() * coordsRange + 50)
  );
  const [posY, setPosY] = useState(
    Math.floor(Math.random() * coordsRange + 50)
  );

  // object thats dragged
  const draggableRef = useRef(null);
  // is dragging?
  const dragging = useRef(false);

  // when clicked make it drag
  const onMouseDown = useCallback((e) => {
    if (draggableRef.current) {
      dragging.current = true;
    }
  }, []);

  // make it not drag
  const onMouseUp = useCallback((e) => {
    if (dragging.current) {
      dragging.current = false;
    }
  }, []);

  // when you move the mouse update the coords if its being dragged
  const onMouseMove = useCallback((e) => {
    if (dragging.current) {
      setPosX((pos) => pos + e.movementX);
      setPosY((pos) => pos + e.movementY);
    }
  }, []);

  // the first time this component renders run this code
  // add the event listeners
  // the window tracks mouse up and move becuase it doesnt do anything when clicked
  // the cap tracks being clicked bc it needs to be per component
  useEffect(() => {
    let thisElement = draggableRef.current;

    window.addEventListener("pointerup", onMouseUp);
    thisElement.addEventListener("pointerdown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);

    // this is the cleanup function
    return () => {
      window.removeEventListener("pointerup", onMouseUp);
      thisElement.removeEventListener("pointerdown", onMouseDown);
      window.removeEventListener("pointermove", onMouseMove);
    };
  }, [onMouseUp, onMouseDown, onMouseMove, delID, draggableRef]);

  return (
    // add size based on size classes in object
    <div
      data-title={title}
      data-id={delID}
      data-source={source}
      className={"window " + size}
      style={{
        // apply coords :D
        left: `${posX.toString().concat("px")}`,
        top: `${posY.toString().concat("px")}`,
        transition: "0s",
        "--cap-colour": colour ? "#" + colour : null,
        "--cap-text-colour": colour ? "#" + contrastingColor(colour) : null,
      }}
    >
      <Goobers
        len={
          // set number of goobers based on size
          size.includes("micro") || size.includes("min")
            ? 1
            : size.includes("small")
            ? 2
            : size.includes("normal")
            ? 3
            : size.includes("large")
            ? 4
            : size.includes("huge")
            ? 5
            : 3
        }
      />
      <div className="cap" onMouseDown={onMouseDown} ref={draggableRef}>
        <div>
          <img src={icon} alt="" /> {title}{" "}
        </div>{" "}
        <CloseButton delID={delID} />
      </div>
      <div className="winBody">
        {content ? content : null}
        {children ? children : null}
      </div>
    </div>
  );
}
