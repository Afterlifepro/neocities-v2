import assets from "./Assets";

export default function MobileWarn() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
        >
        <div
          className="renderIfTouchScreen window"    
          style={{
            zIndex: 999,
            minWidth: "150px",
            maxWidth: "600px",
            width: "90%",
          }}
        >
          <div className="cap">
            <div>
              <img src={assets.system.icons.windows} alt="" /> Mobile Users Beware!
            </div>
          </div>
          <div className="winBody">
            <h1>This site is not sutiable for touch devices!</h1>
            <p>
              Dragging windows doesn't work (idk why) and I can't guarantee that
              windows will always open onscreen {":("}
            </p>
            <h4>To get rid if this popup, use a mouse or other "fine" pointer.</h4>
          </div>
        </div>
      </div>
    </>
  );
}
