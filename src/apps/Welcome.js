import { useContext } from "react";
import { GlobalsContext } from "./../Globals";

//////////////
// Standard //
//   Pages  //
//////////////

export function Welcome() {
  const globals = useContext(GlobalsContext);
  return (
    <>
      <h1>Welcome!!</h1>
      <p>I spent a while making this site, so hopefully you enjoy it!</p>
      <p>You can drag the windows around by clicking the bar at the top!</p>
      <p>
        If you want to share it click{" "}
        <button
          className="link"
          style={{ cursor: "pointer" }}
          onClick={() => {
            globals.newApp({
              name: "shareSite",
              source: "welcome",
            });
          }}
        >
          here
        </button>
        , or if you want to see other sites I liked, click{" "}
        <button
          className="link"
          style={{ cursor: "pointer" }}
          onClick={() => {
            globals.newApp({
              name: "coolSites",
              source: "welcome",
            });
          }}
        >
          here!
        </button>
      </p>
      <p>
        Theres a few other things to look at, so feel free to have a snoop! You
        can click any of the things on the side to open them!
      </p>
      <p>
        If you want to share a link to a specific app (for example: gifs, or
        music), use the link{" "}
        <code>https://afterlifepro.neocities.org/?app=[app key]</code>,
        replacing <code>[app key]</code> with the key of an app, which can be
        found in{" "}
        <button
          className="link"
          onClick={() => {
            globals.newApp({
              name: "debugApps",
              source: "welcome app manager button",
            });
          }}
        >
          Debug {">"}App Manager
        </button>
        ! (Make sure its text and not a number, as the text is used to represent
        the contents etc, whereas the numerical key is a unique identifier for
        that instance of a window)
      </p>
      <p>
        I made this site using React, so using the dev tools doesnt work well.
        Because I dont care about my code being stolen by ppl (companies can
        fuck off tho) i put it on github! (see down the side)
      </p>
      <p>
        Heres a list of the future planned features (in no particular order):
      </p>
      <ul>
        <li>Getting my old fanfic stuff added</li>
        <li>Add themes</li>
        <li className="done"><button className="link" onclick={() => { globals.newApp({ name: "rssSite", source: "welcome app" }); }}>Add an RSS feed of website updates</button></li>
        <li className="done"><button className="link" onclick={() => { globals.newApp({ name: "rssBlog", source: "welcome app" }); }}>Add an RSS feed of personal updates</button></li>
        <li>Write some blog posts</li>
        <li>D&D Character Pages</li>
        <li>...</li>
      </ul>
      <p>
        Finally, heres a link to my
        <a href="/archive/v1/"> Old site (17/07/2024 and before)</a>
      </p>
    </>
  );
}
