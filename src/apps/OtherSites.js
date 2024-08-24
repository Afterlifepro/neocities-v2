import assets from "../Assets";
import { GlobalsContext } from "../Globals";
import { useContext } from "react";

///////////
// Other //
// Sites //
///////////

// gives & copies share button to user clipboard
export function ShareSite() {
  const globals = useContext(GlobalsContext);
  return (
    <>
      <img
        // image of my 88x31 button
        src={assets.system.site88x31.animName}
        alt={
          'An 88x31 pixel art button which contains a windows 95 window. The background is stripped and scrolls. The header reads "Kai/Nico/Alex/Jen", and the body reads "@afterlifepro Any Pronouns"'
        }
      />
      <img
        // the share button
        src={assets.system.site88x31.animShare}
        alt={
          'An 88x31 pixel art button which contains a windows 95 window. The background is stripped and scrolls. The header reads "Click here", and the body reads "To share my site"'
        }
        style={{ cursor: "pointer" }}
        onClick={() => {
          // i manually defined the new app here bc i didnt want to bloat the app list with a context menu
          // lets you choose static or animated version. repetative code but idgaf
          globals.newApp({
            title: "Share",
            icon: assets.system.icons.search,
            size: "min",
            source: "Share Site",
            content: (
              <>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const text = `<a href="https://afterlifepro.neocities.org/"><img src="https://afterlifepro.neocities.org/88x31/88x31%20name.gif" width="88px"/></a>`;
                    navigator.clipboard.writeText(text).then(
                      () => {
                        // success
                        alert(
                          "Copied " +
                            text +
                            " to clipboard! Paste it into your site!!"
                        );
                        console.log(
                          "Copied '" +
                            text +
                            "' to clipboard! Paste it into your site!!"
                        );
                      },
                      () => {
                        // failure
                        alert(
                          "Failed to copy text. Copy paste the following code:"
                        );
                        alert(text);
                        console.log(
                          "Failed to copy text. Copy paste the following code:"
                        );
                        console.log(text);
                      }
                    );
                  }}
                >
                  Animated
                  <img
                    src={assets.system.site88x31.animName}
                    alt={
                      'An 88x31 pixel art button which contains a windows 95 window. The background is stripped and scrolls. The header reads "Kai/Nico/Alex/Jen", and the body reads "@afterlifepro Any Pronouns"'
                    }
                  />
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const text = `<a href="https://afterlifepro.neocities.org/"><img src="https://afterlifepro.neocities.org/88x31/88x31%20name%20static.png" width="88px"/></a>`;
                    navigator.clipboard.writeText(text).then(
                      () => {
                        // success
                        alert(
                          "Copied " +
                            text +
                            " to clipboard! Paste it into your site!!"
                        );
                        console.log(
                          "Copied '" +
                            text +
                            "' to clipboard! Paste it into your site!!"
                        );
                      },
                      () => {
                        // failure
                        alert(
                          "Failed to copy text. Copy paste the following code:"
                        );
                        alert(text);
                        console.log(
                          "Failed to copy text. Copy paste the following code:"
                        );
                        console.log(text);
                      }
                    );
                  }}
                >
                  Static
                  <img
                    src={assets.system.site88x31.staticName}
                    alt={
                      'An 88x31 pixel art button which contains a windows 95 window. The background is stripped. The header reads "Kai/Nico/Alex/Jen", and the body reads "@afterlifepro Any Pronouns"'
                    }
                  />
                </button>
              </>
            ),
          });
        }}
      />
    </>
  );
}

// all sites i like lolol
// simple enough component
export function CoolSites({ buttons }) {
  return (
    <>
      {buttons.map((button, i) => {
        return (
          <a key={i} href={button.site}>
            <img
              style={{
                width: "88px",
              }}
              src={button.src}
              alt={"An 88x31 button to " + button.name + "'s site!"}
            />
          </a>
        );
      })}
    </>
  );
}
