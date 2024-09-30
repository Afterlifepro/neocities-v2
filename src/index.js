// look up the react docs it just slaps it in #app
import { createRoot } from "react-dom/client";
import Root from "./Root";
import { GlobalsContextComponent } from "./Globals";
const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <GlobalsContextComponent>
    <Root />
  </GlobalsContextComponent>
);
