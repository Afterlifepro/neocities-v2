import { useContext } from "react";
import { GlobalsContext } from "./Globals";
import assets from "./Assets";

export default function AppShortcut({ icon, title, href, externalShortcut }) {
  // external shortcut determines whether its an app or a link
  const globals = useContext(GlobalsContext);

  return (
    <button
      className="shortcut"
      onClick={
        !externalShortcut
          ? () => {
              globals.newApp({ name: href, source: title + " app shortcut" });
            }
          : () => {
              window.open(href);
            }
      }
    >
      <img src={icon} alt="" />
      <h1>
        {title}
        {externalShortcut ? (
          <img src={assets.system.buttons.external} alt="external" />
        ) : null}
      </h1>
    </button>
  );
}
