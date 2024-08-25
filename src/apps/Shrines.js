import { useContext } from "react";
import { GlobalsContext } from "../Globals";
import assets from "../Assets";

export function Shrine({ title, url }) {
  return (
    <>
      <div className="wrap">
        <iframe
          src={url}
          style={{ "--scale": 0.25 }}
          title={title}
          className="frame"
        />
      </div>
      <a style={{width: "100%", display: "block", textAlign: "center"}} href={url} target="_blank" rel="noopener noreferrer">
        Open Fullscreen
      </a>
    </>
  );
}

export function Shrines() {
  const globals = useContext(GlobalsContext);

  const ShrineLayer = ({ id, display, img = { src: null, alt: null } }) => {
    return (
      <button
        style={{
          width: "100%",
          height: "50px",
          padding: 0,
          display: "flex block",
          flexDirection: "row",
          boxSizing: "border-box",
        }}
        onClick={() => {
          globals.newApp({
            name: id,
            source: "shrine index",
          });
        }}
      >
        {img.src ? (
          <img
            {...img}
            style={{ aspectRatio: 1, height: "100%", boxSizing: "border-box", marginBlock: 0, marginInline: 0 }}
          />
        ) : null}
        <div style={{margin: "auto"}}>{display}</div>
      </button>
    );
  };

  return (
    <div>
      {[
        {
          id: "shrinesTaynil",
          display: "Taynil",
          img: {
            src: "/shrines/taynil/assets/taynil-DzoAgLNT.png",
            alt: "a picture of taynil. she has pink hair, a black jacket, a yellow jumper, and is holding up a peace sign",
          },
        },
      ].map((x, i) => (
        <ShrineLayer
          key={i}
          id={x.id}
          display={x.display}
          img={x.img || null}
        />
      ))}
    </div>
  );
}
