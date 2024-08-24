import { useContext } from "react";
import { GlobalsContext } from "../Globals";


///////////
//  RSS  //
// Index //
///////////
export const RssIndex = () => {
  const globals = useContext(GlobalsContext);
  return (
    <>
      The RSS feeds I have hooked up to my site! Currently they're a little
      glitchy when you open new ones but I'll deal w that later!
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        <button
          onClick={() => {
            globals.newApp({ name: "rssSite", source: "rss index" });
          } }
        >
          Site Updates 💻
        </button>
        <button
          onClick={() => {
            globals.newApp({ name: "rssBlog", source: "rss index" });
          } }
        >
          Blog Posts 📜
        </button>
        <button
          onClick={() => {
            globals.newApp({ name: "rssMicro", source: "rss index" });
          } }
        >
          Mini Posts 🦐
        </button>
      </div>
    </>
  );
};
