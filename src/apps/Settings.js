import { useRef } from "react";

///////////////////
// Accessability //
//   Settings    //
///////////////////
export function Settings() {
  const root = document.documentElement;
  // useref points to an html object
  const fontRef = useRef(null);
  const goobRef = useRef(null);

  // when you click the font toggle, change the font lol
  const fontClick = () => {
    root.style.setProperty(
      "font-family",
      (fontRef.current.checked ? "w95faregular, " : "") + "sans-serif"
    );
  };
  // when you click the goober toggle make em invisible
  const goobClick = () => {
    root.style.setProperty(
      "--goober-opacity",
      goobRef.current.checked ? "1" : "0"
    );
  };

  return (
    <div style={{ width: "max-content" }}>
      <input
        type="checkbox"
        className="switch"
        ref={fontRef}
        id="fontSet"
        onClick={fontClick}
        defaultChecked={true} />
      <label htmlFor="fontSet">Use Custom Font?</label>
      <br />
      <input
        type="checkbox"
        className="switch"
        ref={goobRef}
        id="goobSet"
        onClick={goobClick}
        defaultChecked={true} />
      <label htmlFor="goobSet">Allow Goobers?</label>
    </div>
  );
}
