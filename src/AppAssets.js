// basic imports
import { useState, useContext } from "react";
import { GlobalsContext, GlobalsImport } from "./Globals";
import assets from "./Assets";

// audio player
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

// react-query for rss
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

////////////
// Assets //
////////////

// Audio Player
export function Player({ src }) {
  // keep track of current song
  let [playlistIndex, setPlaylistIndex] = useState(0);
  // keep track of the current song. get the item in the array if its an array
  let currentSong = Array.isArray(src) ? src[playlistIndex] : src;

  // go to next/prev song + loop back if number to big/small
  const prev = () => {
    setPlaylistIndex((old) => (old > 0 ? old - 1 : src.length - 1));
  };
  const next = () => {
    setPlaylistIndex((old) => (old + 1 < src.length ? old + 1 : 0));
  };

  return (
    <div
      className="audioPlayer"
      style={{
        // add the gradient above the album cover. is decorative - screen readers don't need to see the cover
        backgroundImage:
          'linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0,0,0,0) 50%), url("' +
          currentSong.cover +
          '")',
        backgroundSize: "100%",
        aspectRatio: "1/1",
        // make sure content is at bottom
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* if theres a song title and artist add it */}
      {currentSong.title && currentSong.artist ? (
        <h3
          style={{
            margin: "5px",
            filter: "drop-shadow(2.5px 2.5px 2.5px #00000080)",
          }}
        >
          "{currentSong.title} by "{currentSong.artist}"
        </h3>
      ) : null}

      <AudioPlayer
        // don't show how downloaded it is
        showDownloadProgress={false}
        showFilledVolume
        // only show skip controls if its an array
        showSkipControls={Array.isArray(src)}
        onClickNext={next}
        onClickPrevious={prev}
        // go to next song when it ends
        onEnded={next}
        src={currentSong.audio}
        // overwrites default css values
        customIcons={{
          play: (
            <img
              className="noBorder"
              alt="play"
              src={assets.system.buttons.audio.play}
            />
          ),
          pause: (
            <img
              className="noBorder"
              alt="pause"
              src={assets.system.buttons.audio.pause}
            />
          ),
          forward: (
            <img
              className="noBorder"
              alt="forward"
              src={assets.system.buttons.audio.forward}
            />
          ),
          rewind: (
            <img
              className="noBorder"
              alt="rewind"
              src={assets.system.buttons.audio.rewind}
            />
          ),
          previous: (
            <img
              className="noBorder"
              alt="previous"
              src={assets.system.buttons.audio.previous}
            />
          ),
          next: (
            <img
              className="noBorder"
              alt="next"
              src={assets.system.buttons.audio.next}
            />
          ),
          loop: (
            <img
              className="noBorder"
              alt="loop"
              src={assets.system.buttons.audio.loop}
            />
          ),
          loopOff: (
            <img
              className="noBorder"
              alt="loop off"
              src={assets.system.buttons.audio.noloop}
            />
          ),
          volume: (
            <img
              className="noBorder"
              alt="volume"
              src={assets.system.buttons.audio.volume}
            />
          ),
          volumeMute: (
            <img
              className="noBorder"
              alt="volume mute"
              src={assets.system.buttons.audio.novolume}
            />
          ),
        }}
      />
    </div>
  );
}

// Gallery
export function Gallery({ images, cover }) {
  // keep track of current picture
  let [index, setIndex] = useState(0);
  let currentImage = images[index];
  // cover determines whether image is scaled off width or height. in cover mode all images are as tall as possible
  let usingCover = cover;
  // unzoom means show whole image, even in cover mode
  if (currentImage.position === "unzoom") {
    usingCover = false;
  }
  return (
    <>
      <div
        style={{
          width: "100%",
          aspectRatio: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={currentImage.image}
          alt={currentImage.alt}
          // take up as much space as possible
          className="fill"
          onClick={() => {
            // open the image source (where i found it not where it was bundled)
            window.open(currentImage.src);
          }}
          style={{
            // undefined means not set
            aspectRatio: usingCover ? 1 : undefined,
            objectFit: usingCover ? "cover" : "contain",
            backgroundColor: usingCover ? undefined : "#000000",
            height: "fit-content",
            cursor: "pointer",
            objectPosition: currentImage.position,
            transition: "none",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <button
          className="micro"
          onClick={() => {
            // decrement image index and loop to end if too small
            setIndex((old) => (old > 0 ? old - 1 : images.length - 1));
          }}
        >
          ←
        </button>
        <div
          style={{
            width: "5cap",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          {index + 1}/{images.length}
        </div>
        <button
          className="micro"
          onClick={() => {
            // increment, looping to start
            setIndex((old) => (old + 1 < images.length ? old + 1 : 0));
          }}
        >
          →
        </button>
      </div>
    </>
  );
}

// used to do queries via react router
const queryClient = new QueryClient();

export function Rss({ rss }) {
  const globals = useContext(GlobalsContext);

  // component that actually does rss parsing etc
  function RssComponent({ rss }) {
    // used to interprit the feed
    const parser = new DOMParser();

    // retrive the feed
    const { isPending, error, data } = useQuery({
      queryKey: ["rssFeed"],
      queryFn: () => fetch(rss).then((res) => res.text()),
    });

    // loading state
    if (isPending) return <div style={{ cursor: "wait" }}>Loading...</div>;

    // error state
    if (error)
      return (
        <div
          style={{
            background: "#ff000080",
            cursor: "not-allowed",
          }}
        >
          An error occoured when retriving the RSS feed: {error.message}
        </div>
      );

    console.log(data);
    const parsed = parser.parseFromString(data, "text/xml");

    const channel = parsed.documentElement.children[0];

    const title = channel.children[0].textContent.trim();
    const description = channel.children[1].textContent.trim();
    const lastBuildDate = new Date(channel.children[3].textContent.trim());
    let items = [];
    for (let i = 5; i < channel.children.length; i++) {
      items.push(channel.children[i]);
    }

    console.log(
      parsed,
      channel,
      channel.children,
      title,
      description,
      lastBuildDate,
      items
    );

    const urlSearchString = window.location.search;

    const params = new URLSearchParams(urlSearchString);

    const postIndex = parseInt(params.get("post"));
    if (!Number.isNaN(postIndex) && items[postIndex]) {
      const i = postIndex;
      const item = items[i];
      GlobalsImport.newApp({
        title: item.children[0].textContent,
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: item.children[1].textContent,
            }}
          ></div>
        ),
        icon: assets.system.icons.paper,
        size: "large",
        source: "RSS Auto opener",
      });
    }

    return (
      <div>
        <h1>{title}</h1>
        <a
          className="button"
          href={rss}
          style={{
            height: "1.75em",
            width: "1.75em",
            padding: "0",
            position: "absolute",
            top: "calc(1.5em + 5px)",
            right: "5px",
          }}
        >
          <img
            style={{
              width: "80%",
              aspectRatio: 1,
              border: 0,
              marginBlock: "10%",
              marginInline: "10%",
            }}
            src={assets.system.icons.rss}
            alt="Rss Feeds"
          />
        </a>
        <h6>
          {lastBuildDate.getDate()}/{lastBuildDate.getMonth()}/
          {lastBuildDate.getFullYear()} {lastBuildDate.getHours()}:
          {lastBuildDate.getMinutes()}
        </h6>
        <p>{description}</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {items.map((item, i) => {
            return (
              <button
                onClick={() => {
                  globals.newApp({
                    title: item.children[0].textContent,
                    content: (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.children[1].textContent,
                        }}
                      ></div>
                    ),
                    icon: assets.system.icons.paper,
                    size: "large",
                    source: "RSS component",
                  });
                }}
                key={i}
              >
                {item.children[0].textContent}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  // react router boilerplate
  return (
    <QueryClientProvider client={queryClient}>
      <RssComponent rss={rss} />
    </QueryClientProvider>
  );
}
