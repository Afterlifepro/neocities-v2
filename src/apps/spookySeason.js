import assets from "../Assets";

export default function SpookySeason() {
  const spookyScarySkeletons = new Audio(
    "https://archive.org/download/AndrewGoldSpookyScarySkeletons/Andrew%20Gold%20-%20Spooky%20Scary%20Skeletons.mp3"
  );
  spookyScarySkeletons.loop = true;

  const yeah = () => {
    console.log(
        `%cSPOOKY SCARY SKELETONS`,
        `background: #ff4500; color: white;`,
      );
    spookyScarySkeletons.play();
  };
  const hellYeah = () => {
    console.log(
        `%cSPOOKY TIME`,
        `background: #c46210; color: white;`,
      );
    const root = document.documentElement;

    root.style.setProperty("--bg-colour", "#000000");
    root.style.setProperty("--window-cap-colour", "#ff4500");

    const shortcuts = document.getElementsByClassName("shortcut");

    for (let i = 0; i < shortcuts.length; i++) {
      const header = shortcuts[i].children[1];
      header.style.setProperty("color", "white");

      if (header.children.length > 0) {
        header.children[0].style.setProperty("filter", "invert(100%)");
      }
    }
  };

  return (
    <div
      style={{
        padding: 5,
      }}
    >
      <div
        style={{
          height: 30,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={assets.images.gifs.misc.skull.src}
          alt={assets.images.gifs.misc.skull.alt}
          style={{
            aspectRatio: 1,
            height: "100%",
            border: "none",
            marginBlock: 0,
            marginRight: 10,
          }}
        />
        Time to get spooky!
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          paddingTop: 5,
        }}
      >
        <button
          style={{
            padding: 5,
          }}
          onClick={yeah}
        >
          Yeah
        </button>
        <button
          style={{
            padding: 5,
          }}
          onClick={hellYeah}
        >
          Hell Yeah
        </button>
      </div>
    </div>
  );
}
