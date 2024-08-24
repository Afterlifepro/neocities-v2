// my components/assets/etc
import { App } from "./App";
import { GlobalsContext, GlobalsImport } from "./Globals";
import assets from "./Assets";
import AppShortcut from "./AppShortcut";

// base react features
import { useContext, useState } from "react";

// import app assets
import { Rss, Gallery, Player } from "./AppAssets";

// import components
import { Welcome } from "./apps/Welcome";
import { AppManager, Debug, TaskManager, Test } from "./apps/Debug";
import { RssIndex } from "./apps/RSS";
import { Settings } from "./apps/Settings";
import { ShareSite,CoolSites } from "./apps/OtherSites";
import { standardPages } from "./apps/standardPages";



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
