// my components/assets/etc
import { App } from "./App";
import { GlobalsContext, GlobalsImport } from "./Globals";
import assets from "./Assets";
import { CloseButton } from "./Windows";
import AppShortcut from "./AppShortcut";

// base react features
import { useContext, useRef, useState } from "react";

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
function Player({ src }) {
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
function Gallery({ images, cover }) {
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

function Rss({ rss }) {
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

///////////
// Debug //
///////////

// Debug to open Debug apps
// this is a simple component, just long and repetative
function Debug() {
  const globals = useContext(GlobalsContext);

  return (
    <>
      <h2>Debug Menu</h2>
      <h4>Open debug apps</h4>
      <ul>
        <li>
          Test Windows
          <ul>
            <li>
              <button
                onClick={() => {
                  globals.newApp({ name: "debugtest", source: "debug menu" });
                }}
              >
                Generic Window
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  globals.newApp({ name: "debugmicro", source: "debugger" });
                }}
              >
                Micro
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  globals.newApp({ name: "debugsmall", source: "debugger" });
                }}
              >
                Small
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  globals.newApp({ name: "debugnormal", source: "debugger" });
                }}
              >
                Normal
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  globals.newApp({ name: "debuglarge", source: "debugger" });
                }}
              >
                Large
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  globals.newApp({ name: "debughuge", source: "debugger" });
                }}
              >
                Huge
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  globals.newApp({
                    name: "debugLargeAudio",
                    source: "debugger",
                  });
                }}
              >
                MP3 Player
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  globals.newApp({ name: "debugGallery", source: "debugger" });
                }}
              >
                Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  globals.newApp({ name: "debugRSS", source: "debugger" });
                }}
              >
                RSS
              </button>
            </li>
          </ul>
        </li>
        <li>
          System Apps
          <ul>
            <li>
              <button
                onClick={() => {
                  globals.newApp({ name: "debugIDs", source: "debugger" });
                }}
              >
                Task Manager
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  globals.newApp({ name: "debugApps", source: "debugger" });
                }}
              >
                App Manager
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  globals.apps.map((apps) => {
                    return globals.deleteApp(apps.key);
                  });
                }}
              >
                Close All Apps
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}

// Test html components for css
// simple component for testing css features
function Test() {
  return (
    <>
      ttttttt debug lorem ipsum dolor sit amet!!!!
      <h1>Lorem ipsum, dolor sit</h1>
      <h2>Lorem ipsum dolor sit amet consectetur</h2>
      <h3>Lorem ipsum</h3>
      <img
        src={assets.images.doctorWho2.image}
        className="fill"
        alt={assets.images.doctorWho2.alt}
      />
      <h4>Lorem ipsum dolor sit amet consectetur</h4>
      <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
      <h6>Lorem ipsum</h6>
      <ul>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Nulla cum dolore eaque recusandae. esse?</li>
        <li>Mollitia, quas. Nisi recusandae provident,</li>
        <li>Inventore vero itaque suscipit modi cumque</li>
        <li>Vero illum quaerat quo sint</li>
        <li>
          <a
            href="/"
            onClick={(e) => {
              // if you click the link dont do anything
              e.preventDefault();
            }}
          >
            Lorem ipsum dolor sit amet
          </a>
        </li>
        <li>
          {" "}
          Lorem
          <ol>
            <li>Lorem ipsum dolor sit amet consectetur</li>
            <li>Ipsam,</li>
          </ol>
        </li>
      </ul>
      <button>Lorem ipsum dolor sit amet</button>
      <br />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        defaultValue="Lorem ipsum dolor sit amet consectetur"
      ></textarea>
      <form>
        <label htmlFor="name">Name</label>
        <br />
        <input name="name" type="text" defaultValue="Frank" /> <br />
        <input
          defaultChecked="checked"
          name="gender"
          type="radio"
          defaultValue="male"
        />
        guy <br />
        <input name="gender" type="radio" defaultValue="female" /> gal <br />
        <input name="gender" type="radio" defaultValue="enby" /> enby pal <br />
        <textarea cols="30" rows="2" defaultValue={"long text"}></textarea>
        <br />
        <select>
          <option defaultValue="selected" value="yes">
            Yes
          </option>
          <option value="no">No</option>
        </select>
        <br />
        <input
          name="demoSwitch"
          id="demoSwitch"
          type="checkbox"
          // this makes it a toggle switch rather than a check box
          className="switch"
          defaultValue="1"
        />
        <label htmlFor="demoSwitch">Switch </label>
        <input
          name="demoCheck"
          id="demoCheck"
          type="checkbox"
          defaultValue="1"
        />
        <label htmlFor="demoCheck">Check </label>
        <br />
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
      <details>
        <summary>Lorem, ipsum dolor</summary>
        Dolorum odio saepe impedit quae hic aperiam animi nihil quas? Illo porro
        aliquid saepe rerum eveniet architecto, minus doloremque ab corporis
        facere.
      </details>
    </>
  );
}

// lists all apps open when created (idk why it doesnt update lolol)
function TaskManager() {
  const globals = useContext(GlobalsContext);

  return (
    <>
      {/* snapshot included as it doesnt sync with updates for some reason lol */}
      Snapshot taken at: {new Date().toLocaleString()} <br />
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Title</th>
            <th>End Task</th>
          </tr>
        </thead>
        <tbody>
          {/* for every open app */}
          {globals.apps.map((app, i) => {
            return (
              <tr key={i}>
                {/* return it in key | title | close button */}
                <td>{String(app.key).padStart(2, "0")}</td>
                <td>{app.title}</td>
                <td>
                  <CloseButton delID={app.key} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

// lists all the defined apps in globals.pages and lets you open them
function AppManager() {
  const globals = useContext(GlobalsContext);

  // component to get apps so it can be embeded in returned jsx
  const GetApps = () => {
    // row component so app is stored per row not per window
    const Row = ({ app }) => {
      // return a content of row
      return (
        <tr>
          <td>{app}</td>
          <td>{globals.pages[app].title}</td>
          <td>
            <img
              style={{ height: "1.2em", aspectRatio: 1, objectFit: "cover" }}
              src={globals.pages[app].icon}
              alt={""}
            />
          </td>
          <td>
            <button
              onClick={() => {
                console.log(app);
                globals.newApp({ name: app, source: "debugger" });
              }}
            >
              Open
            </button>
          </td>
        </tr>
      );
    };

    // store a list of the final response
    const response = [];
    // get a list of the page keys
    const keys = Object.keys(globals.pages);
    // keep track of the key
    let app = "";
    // loop over each key
    for (let i = 0; i < keys.length; i++) {
      app = keys[i];
      // add the row to the response list
      response.push(<Row app={app} key={i} />);
    }
    // return it (still in Get Apps)
    return <>{response}</>;
  };

  // return the original component code
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Title</th>
            <th>Icon</th>
            <th>Open App</th>
          </tr>
        </thead>
        <tbody>
          {/* get the list of apps */}
          <GetApps />
        </tbody>
      </table>
    </>
  );
}

///////////
//  RSS  //
// Index //
///////////
const RssIndex = () => {
  const globals = useContext(GlobalsContext);
  return (
    <>
      The RSS feeds I have hooked up to my site! Currently they're a little
      glitchy when you open new ones but I'll deal w that later!
      <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)"
        }}>
        <button
          onClick={() => {
            globals.newApp({ name: "rssSite", source: "rss index" });
          }}
        >
          Site Updates 💻
        </button>
        <button
          onClick={() => {
            globals.newApp({ name: "rssBlog", source: "rss index" });
          }}
        >
          Blog Posts 📜
        </button>
        <button
          onClick={() => {
            globals.newApp({ name: "rssMicro", source: "rss index" });
          }}
        >
          Mini Posts 🦐
        </button>
      </div>
    </>
  );
};

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
        <li>Add an RSS feed of website updates</li>
        <li>Add an RSS feed of personal updates</li>
        <li>...</li>
      </ul>
      <p>
        Finally, heres a link to my
        <a href="/archive/v1/"> Old site (17/07/2024 and before)</a>
      </p>
    </>
  );
}

const standardPages = {
  // homepage
  Home: () => {
    // hoverable images you see in interests
    const ImgIcon = ({ image, altVals, href }) => {
      return (
        <a href={href}>
          <img
            style={{
              width: "1em",
              aspectRatio: 1,
              borderRadius: "100%",
              border: "none",
              margin: "0 2px 0 0",
              objectFit: "cover",
            }}
            // i would do this inline if i could it is much nicer code/css that way
            className="hoverGrow"
            src={image}
            alt={"A photo of " + altVals}
          />
        </a>
      );
    };

    return (
      <>
        <div style={{ display: "inline-block", width: "80%" }}>
          <h1>Welcome!</h1>
          <p>
            I'm Kai/Nico/Jen/Alex [any pronouns except he/him] and this is my
            website!!
          </p>
        </div>
        <img
          style={{ float: "right", width: 70 }}
          src={assets.images.doctorWho3.image}
          alt={assets.images.doctorWho3.alt}
        />
        <br />
        <br />
        <div
          style={{
            display: "grid",
            gridAutoColumns: "1fr 1fr",
            gridAutoFlow: "column",
          }}
        >
          <div
            style={{
              borderRight: "1px dotted black",
              margin: "1px",
            }}
          >
            <p>
              I'm multifandom so here are some of my current
              fandoms/hyperfixations!
            </p>
            <ul>
              <li>
                <ImgIcon
                  image={assets.images.notOC.doctorWho}
                  altVals="the Doctor Who logo"
                  href="https://tardis.wiki/"
                />
                Doctor Who
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.d20}
                  altVals="a red d20"
                  href="https://dndbeyond.com/"
                />
                D&D
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.hwfwm}
                  altVals="the cover of HWFWM book 1"
                  href="https://www.amazon.co.uk/He-Who-Fights-Monsters-Adventure-ebook/dp/B08WCT9W26"
                />
                HWFWM
              </li>
              <li>MCYT</li>
              <ul>
                <li>
                  <ImgIcon
                    image={assets.images.notOC.hc}
                    altVals="the Hermitcraft logo"
                    href="https://hermitcraft.com/"
                  />
                  Hermitcraft (Grian, Gem, Mumbo, Etho, Pearl)
                </li>
                <li>Traffic SMP</li>
                <li>
                  <ImgIcon
                    image={assets.images.notOC.skyblock}
                    altVals="a skyblock island"
                    href="https://www.youtube.com/playlist?list=PLOOuOHIm_DNlYGOdMXj0NXpd27K30O_wW"
                  />
                  Skyblock Kingdoms (Doovid)
                </li>
                <li>
                  <ImgIcon
                    image={assets.images.notOC.pn}
                    altVals="the pn logo"
                    href="https://www.youtube.com/playlist?list=PLOPTPqrotfhUHJ53seoan2pyWaUhSXI6w"
                  />
                  Project: Nexus
                </li>
                <li>
                  <ImgIcon
                    image={assets.images.notOC.mianite}
                    altVals="the mianite logo"
                    href="https://www.youtube.com/playlist?list=PLSUHnOQiYNg0D2eT4nVpzax4eANCzgGIS"
                  />
                  Mianite (CapitanSparkles) (I need to start binging again
                  goddamn)
                </li>
                <li>
                  <ImgIcon
                    image={assets.images.notOC.squiddo}
                    altVals="squiddo"
                    href="https://www.youtube.com/@Squiddo"
                  />
                  <ImgIcon
                    image={assets.images.notOC.rekrap}
                    altVals="rekrap"
                    href="https://www.youtube.com/@Rekrap2"
                  />
                  Squiddo/Rekrap (similar vibe)
                </li>
                <li>
                  <ImgIcon
                    image={assets.images.notOC.content}
                    altVals="the content SMP logo"
                    href="https://linktr.ee/thecontentsmp"
                  />
                  Content SMP (Doctorr4t, Luxintrus, whoever yt reccomends)
                </li>
              </ul>
            </ul>
          </div>
          <div
            style={{
              margin: "1px",
            }}
          >
            <p>
              I also really like music!! I play cornet (small trumpet) and
              drums, and i also really enjoy listening to it!! Heres all the
              artists i listen to regularly!!!! (sorted by when i found em bc
              this is my{" "}
              <a href="https://open.spotify.com/playlist/6CvQKKxXeBsAY1Y9lI9pBQ?si=7ec9816d14a44f6d">
                massive playlist
              </a>{" "}
              and you can find all the artists in there! )
            </p>
            <ul>
              <li>
                <ImgIcon
                  image={assets.images.notOC.goodkid}
                  altVals="the good kid logo"
                />
                Good Kid
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.phoneboy}
                  altVals="the phoneboy logo"
                />
                Phone Boy
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.james}
                  altVals="the james marriot logo"
                />
                James Marriot
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.naethan}
                  altVals="the naethan apollo logo"
                />
                Naethan Apollo
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.mickey}
                  altVals="the mickey darling logo"
                />
                Mickey Darling
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.bears}
                  altVals="the bears in trees logo"
                />
                Bears in Trees
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.rickym}
                  altVals="the ricky montgomery logo"
                />
                Ricky Montgomery
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.rickyj}
                  altVals="the ricky jamaraz logo"
                />
                Ricky Jamaraz
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.los}
                  altVals="the los campesinos logo"
                />
                Los Campesinos
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.rare}
                  altVals="the rare occasions logo"
                />
                The Rare Occasions
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.mei}
                  altVals="the madeline mei logo"
                />
                Madilyn Mei
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.noah}
                  altVals="the NoahFinnce logo"
                />
                NoahFinnce
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.dutch}
                  altVals="the dutch criminal record logo"
                />
                Dutch Criminal Record
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.pilot}
                  altVals="the twenty one pilots logo"
                />
                Twenty One Pilots
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.shane}
                  altVals="the shane garcia logo"
                />
                Shane Garcia
              </li>
              <li>
                <ImgIcon
                  image={assets.images.notOC.carter}
                  altVals="the carter vail logo"
                />
                Carter Vail
              </li>
            </ul>
          </div>
        </div>
        <p>You can also chat w me over on: </p>
        <div style={{ display: "block", margin: "5px" }}>
          <a
            className="button"
            href="https://what-if-doctor-who-was-yuri.tumblr.com"
          >
            Tumblr
          </a>
          ,
          <a
            className="button"
            href="https://archiveofourown.org/users/afterlifepro"
          >
            AO3
          </a>
          ,
          <a
            className="button"
            href="https://www.planetminecraft.com/member/afterlifepro/"
          >
            Planet Minecraft
          </a>
          ,
          <a className="button" href="https://en.pronouns.page/@afterlifepro">
            Pronouns Page
          </a>
        </div>
      </>
    );
  },
  Music: () => {
    return (
      <Player
        src={[
          assets.audios.break,
          assets.audios.postal,
          assets.audios.cest,
          assets.audios.lemon,
          assets.audios.anything,
          assets.audios.scumbag,
          assets.audios.dirtMan,
          assets.audios.call,
          assets.audios.paladin,
          assets.audios.dancing,
          assets.audios.cassiopeia,
          assets.audios.ricky,
          assets.audios.crow,
          assets.audios.night,
          assets.audios.wallow,
          assets.audios.coward,
        ]}
      />
    );
  },
  // gifs category
  gifs: {
    // simple components
    Index: () => {
      const globals = useContext(GlobalsContext);
      return (
        <>
          <button
            onClick={() => {
              globals.newApp({ name: "gifsEleven", source: "gifs menu" });
            }}
          >
            Eleventh Doctor!!
          </button>
          <button
            onClick={() => {
              globals.newApp({ name: "gifsOtherDoctors", source: "gifs menu" });
            }}
          >
            Doctor Who!!!!
          </button>
          <button
            onClick={() => {
              globals.newApp({ name: "gifsHermitcraft", source: "gifs menu" });
            }}
          >
            Hermitcraft :0
          </button>
          <button
            onClick={() => {
              globals.newApp({ name: "gifsZelda", source: "gifs menu" });
            }}
          >
            Zelda 🗡
          </button>
        </>
      );
    },
    Eleven: () => {
      return (
        <>
          <Gallery images={[...assets.images.gifs.eleven]} cover />
        </>
      );
    },
    OtherDoctors: () => {
      return (
        <>
          <Gallery images={[...assets.images.gifs.otherDoctors]} cover />
        </>
      );
    },
    Hermitcraft: () => {
      return (
        <>
          <Gallery images={[...assets.images.gifs.hermitcraft]} cover />
        </>
      );
    },
    Zelda: () => {
      return (
        <>
          <Gallery images={[...assets.images.gifs.zelda]} cover />
        </>
      );
    },
  },
};

////////////
// Fanfic //
////////////
export const writing = {
  Index: () => {
    const globals = useContext(GlobalsContext);
    return (
      <>
        <button
          onClick={() => {
            globals.newApp({
              name: "writingnothing",
              source: "writing index",
            });
          }}
        >
          Click
        </button>
      </>
    );
  },
  genericWriting: ({ ao3, metadata, chapters, singChapt }) => {
    return (
      <>
        <h1>{metadata.title}</h1>
        <a href={ao3}>Open on AO3!</a> <br />
        <table>
          <tbody>
            {metadata.rating ? (
              <tr>
                <th>Rating: </th>
                <td>{metadata.rating}</td>
              </tr>
            ) : null}
            {metadata.warning ? (
              <tr>
                <th>Archive Warning: </th>
                <td>{metadata.warning.join(", ")}</td>
              </tr>
            ) : null}
            {metadata.category ? (
              <tr>
                <th>Category: </th>
                <td>{metadata.category.join(", ")}</td>
              </tr>
            ) : null}
            {metadata.fandom ? (
              <tr>
                <th>Fandom: </th>
                <td>{metadata.fandom.join(", ")}</td>
              </tr>
            ) : null}
            {metadata.relationships ? (
              <tr>
                <th>Relationships: </th>
                <td>{metadata.relationships.join(", ")}</td>
              </tr>
            ) : null}
            {metadata.characters ? (
              <tr>
                <th>Characters: </th>
                <td>{metadata.characters.join(", ")}</td>
              </tr>
            ) : null}
            {metadata.additionalTags ? (
              <tr>
                <th>Additional Tags: </th>
                <td>
                  {metadata.additionalTags.length > 3 ? (
                    <details>
                      <summary>
                        {metadata.additionalTags.slice(0, 3).join(", ")}
                      </summary>
                      {metadata.additionalTags
                        .slice(3, metadata.additionalTags.length)
                        .join(", ")}
                    </details>
                  ) : (
                    metadata.additionalTags.join(", ")
                  )}
                </td>
              </tr>
            ) : null}
            <tr>
              <th>Stats: </th>
              <td>
                Published: {metadata.stats.published}{" "}
                {metadata.stats.completed ? (
                  <> Completed: {metadata.stats.completed}</>
                ) : null}{" "}
                Words: {metadata.stats.words} Chapters:{" "}
                {metadata.stats.chapters}
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h3>Summary: </h3>
        {metadata.summary}
        <hr />
        {chapters ? chapters : null}
        {singChapt ? (
          <>
            <h3>Notes:</h3>
            {singChapt.startNotes}
            {singChapt.endNotes ? (
              <>
                <br />
                (More notes at end)
              </>
            ) : null}
            <hr />
            {singChapt.story}
            <hr />
            <h3>Notes:</h3>
            {singChapt.endNotes}
          </>
        ) : null}
      </>
    );
  },
};

///////////
// Other //
// Sites //
///////////

// gives & copies share button to user clipboard
function ShareSite() {
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
function CoolSites({ buttons }) {
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

///////////////////
// Accessability //
//   Settings    //
///////////////////

function Settings() {
  const root = document.documentElement;
  // useref points to an html object
  const fontRef = useRef(null);
  const goobRef = useRef(null);

  // when you click the font toggle, change the font lol
  const fontClick = () => {
    root.style.setProperty(
      "font-family",
      (fontRef.current.checked ? "w95faregular, " : "") + "sans-serif"
    );
  };
  // when you click the goober toggle make em invisible
  const goobClick = () => {
    root.style.setProperty(
      "--goober-opacity",
      goobRef.current.checked ? "1" : "0"
    );
  };

  return (
    <div style={{ width: "max-content" }}>
      <input
        type="checkbox"
        className="switch"
        ref={fontRef}
        id="fontSet"
        onClick={fontClick}
        defaultChecked={true}
      />
      <label htmlFor="fontSet">Use Custom Font?</label>
      <br />
      <input
        type="checkbox"
        className="switch"
        ref={goobRef}
        id="goobSet"
        onClick={goobClick}
        defaultChecked={true}
      />
      <label htmlFor="goobSet">Allow Goobers?</label>
    </div>
  );
}

//////////
// Site //
//  Dev //
// Logs //
//////////

// function Updates() {
//   return <></>;
// }

/////////////
// Expose  //
//  Page   //
//   To    //
// Globals //
/////////////

function onGlobalsLoad() {
  // when globals is defined
  console.log(GlobalsImport.init);
  if (!GlobalsImport.init) {
    console.log(GlobalsImport.init);
    // if globals isnt defined yet, check in 250ms
    // this is included as this file executes BEFORE globals gets defined as it isnt a component
    // basically theres some complex load order fuckery and i need to check if its ready to get the app list or not
    setTimeout(onGlobalsLoad, 250);
  }
  GlobalsImport.pages = {
    // // An example of a window
    // // define its name for the codebase
    // home: new App({
    //   // define the title for the user
    //   title: "Home",
    //   // define the icon for the user
    //   icon: assets.system.icons.test,,,,,,,,,,,,,,,,,,,,
    //   // JSX for window content
    //   content: <standardPages.Home />,
    //   // size of the window
    //   // can be
    //   // [micro, small, normal, large, huge, min] and can append " nomax" to disable max height/scrolling
    //   size: "large",
    // }),

    // standard pages
    home: new App({
      title: "Home",
      icon: assets.system.icons.pc,
      content: <standardPages.Home />,
      size: "large",
    }),
    welcome: new App({
      title: "Welcome!!",
      icon: assets.system.icons.cube,
      content: <Welcome />,
      size: "normal",
    }),
    music: new App({
      title: "Music 🎶🎶",
      icon: assets.system.icons.music,
      content: <standardPages.Music />,
      size: "huge nomax",
    }),

    // rss feeds
    rss: new App({
      title: "RSS Feeds!",
      icon: assets.system.icons.paper,
      content: <RssIndex />,
      size: "normal nomax",
    }),
    rssSite: new App({
      title: "Site Updates",
      icon: assets.system.icons.paper,
      content: <Rss rss={process.env.PUBLIC_URL + "/rss/feeds/site.rss"} />,
      size: "normal",
    }),
    rssBlog: new App({
      title: "Blog Posts",
      icon: assets.system.icons.paper,
      content: <Rss rss={process.env.PUBLIC_URL + "/rss/feeds/blog.rss"} />,
      size: "normal",
    }),
    rssMicro: new App({
      title: "Micro Posts",
      icon: assets.system.icons.paper,
      content: <Rss rss={process.env.PUBLIC_URL + "/rss/feeds/micro.rss"} />,
      size: "normal",
    }),

    // gifs
    gifs: new App({
      title: "Gifs",
      icon: assets.system.icons.imgs,
      content: <standardPages.gifs.Index />,
      size: "normal",
    }),

    gifsEleven: new App({
      title: "Eleventh Doctor!!",
      icon: assets.system.icons.imgs,
      content: <standardPages.gifs.Eleven />,
      size: "large",
    }),
    gifsOtherDoctors: new App({
      title: "Doctor Who !!!!",
      icon: assets.system.icons.imgs,
      content: <standardPages.gifs.OtherDoctors />,
      size: "large",
    }),
    gifsHermitcraft: new App({
      title: "Hermitcraft :0",
      icon: assets.system.icons.imgs,
      content: <standardPages.gifs.Hermitcraft />,
      size: "large",
    }),
    gifsZelda: new App({
      title: "Zelda 🗡",
      icon: assets.system.icons.imgs,
      content: <standardPages.gifs.Zelda />,
      size: "large",
    }),

    // writing
    // writing: new App({
    //   title: "Writing",
    //   icon: assets.system.icons.word,
    //   content: <writing.Index />,
    //   size: "small",
    // }),
    // writingnothing: new App({
    //   title: "Nothing",
    //   icon: assets.system.icons.word,
    //   content: <writing.genericWriting
    //   ao3={assets.works.nothing.ao3}
    //   metadata={assets.works.nothing.metadata}
    //   singChapt={assets.works.nothing.singChapt}
    //   />,
    //   size: "huge",
    // }),
    // writingforever: new App({
    //   title: "forever",
    //   icon: assets.system.icons.word,
    //   content: <standardPages.writing.nothing />,
    //   size: "huge",
    // }),
    // writingbreeze: new App({
    //   title: "breeze",
    //   icon: assets.system.icons.word,
    //   content: <standardPages.writing.nothing />,
    //   size: "huge",
    // }),
    // writinghouse: new App({
    //   title: "house",
    //   icon: assets.system.icons.word,
    //   content: <standardPages.writing.nothing />,
    //   size: "huge",
    // }),
    // writingmoments: new App({
    //   title: "moments",
    //   icon: assets.system.icons.word,
    //   content: <standardPages.writing.nothing />,
    //   size: "huge",
    // }),

    // system
    shareSite: new App({
      title: "Share my site!",
      icon: assets.system.icons.search,
      content: <ShareSite />,
      size: "min",
    }),
    coolSites: new App({
      title: "Other sites",
      icon: assets.system.icons.search,
      content: <CoolSites buttons={assets.coolSites} />,
      size: "min",
    }),
    settings: new App({
      title: "Settings ⚙",
      icon: assets.system.icons.cog,
      content: <Settings />,
      size: "min",
    }),
    // updates: new App({
    //   title: "Site updates!!",
    //   icon: assets.system.icons.test2,,,,,,,,,,,,,,,,,,,,
    //   content: <Updates />,
    //   size: "large",
    // }),

    // debug windows
    debug: new App({
      title: "debug menu",
      icon: assets.system.icons.help,
      content: <Debug />,
      size: "small",
    }),

    debugtest: new App({
      title: "test",
      icon: assets.system.icons.help,
      content: <Test />,
      size: "large",
    }),

    debugmicro: new App({
      title: "micro",
      icon: assets.system.icons.help,
      content: (
        <>
          micro
          <img
            src={assets.images.doctorWho.image}
            className="micro"
            alt={assets.images.doctorWho.alt}
          />
        </>
      ),
      size: "micro",
    }),

    debugsmall: new App({
      title: "small",
      icon: assets.system.icons.help,
      content: <>Small</>,
      size: "small",
    }),

    debugnormal: new App({
      title: "normal",
      icon: assets.system.icons.help,
      content: <>normal</>,
      size: "normal",
    }),

    debuglarge: new App({
      title: "large",
      icon: assets.system.icons.help,
      content: <>Large</>,
      size: "large",
    }),

    debughuge: new App({
      title: "huge",
      icon: assets.system.icons.help,
      content: "huge",
      size: "huge",
    }),

    debugLargeAudio: new App({
      title: "MP3 Player 😎",
      icon: assets.system.icons.help,
      content: (
        <>
          <Player src={[assets.audios.dirtMan, assets.audios.break]} />
        </>
      ),
      size: "large",
    }),

    debugGallery: new App({
      title: "Gallery",
      icon: assets.system.icons.help,
      content: (
        <Gallery
          images={[
            assets.images.doctorWho3,
            assets.images.doctorWho,
            assets.images.doctorWho2,
          ]}
          cover
        />
      ),
      size: "large",
    }),

    debugIDs: new App({
      title: "Task Manager",
      icon: assets.system.icons.help,
      content: <TaskManager />,
      size: "small",
    }),

    debugApps: new App({
      title: "All Avaliable Apps",
      icon: assets.system.icons.help,
      content: <AppManager />,
      size: "normal",
    }),

    debugRSS: new App({
      title: "RSS Debugger",
      icon: assets.system.icons.help,
      content: <Rss rss={process.env.PUBLIC_URL + "/rss/test.rss"} />,
      size: "normal ",
    }),
  };

  const urlSearchString = window.location.search;

  const params = new URLSearchParams(urlSearchString);

  const paramsApps = params.get("app") ? params.get("app") : "welcome";

  GlobalsImport.newApp({ name: paramsApps, source: "startup" });
}

// start looking for the globals load
onGlobalsLoad();

// export the app shortcuts
export default function AppShortcuts() {
  return (
    <div className="appShortcuts">
      <AppShortcut title="Home" href="home" icon={assets.system.icons.pc} />
      <AppShortcut
        title="Welcome"
        href="welcome"
        icon={assets.system.icons.cube}
      />
      <AppShortcut
        title="Settings"
        href="settings"
        icon={assets.system.icons.cog}
      />
      <AppShortcut title="Gifs" href="gifs" icon={assets.system.icons.imgs} />
      {/* <AppShortcut
        title="Writing"
        href="writing"
        icon={assets.system.icons.word}
      /> */}
      <AppShortcut
        title="Music"
        href="music"
        icon={assets.system.icons.music}
      />
      <AppShortcut
        title="Tumblr"
        href="https://what-if-doctor-who-was-yuri.tumblr.com/"
        icon={assets.system.icons.globe}
        externalShortcut
      />
      <AppShortcut title="Debug" href="debug" icon={assets.system.icons.help} />
      <AppShortcut title="RSS" href="rss" icon={assets.system.icons.paper} />
      <AppShortcut
        title="Github"
        href="https://github.com/Afterlifepro/neocities"
        icon={assets.system.icons.folder}
        externalShortcut
      />
    </div>
  );
}
