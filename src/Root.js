import React, { useContext } from "react";
import { GlobalsContext } from "./Globals";
import "./style.scss";
import AppShortcuts from "./AppList";

function Root() {
  // grab globals via context as it is most likely more stable
  const globals = useContext(GlobalsContext);

  return (
    <>
      <AppShortcuts />
      {/* apps list */}
      {globals.apps.length > 0
        ? // if globals.apps is longer than 0
          globals.apps.map((app) => {
            // get the JSX for each child
            return app.getJSX();
          })
        : null}
    </>
  );
}

export default Root;
