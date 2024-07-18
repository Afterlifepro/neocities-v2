import React, { createContext, useState } from "react";
import { App } from "./App";
import assets from "./Assets";
import { Welcome } from "./Welcome";

// new class for global objects
class GlobalsClass {
  // predefine all variables to avoid some errors
  apps;
  setApps;
  keys;
  setKeys;
  setRenderPropState;
  pages;

  constructor() {
    // default this.apps to an empty array
    this.apps = [];
    // fallback function for this.setApps
    this.setApps = (value) => {
      console.error("not a state. failed to setApps() to:", value);
      return;
    };
    // default value for this.keys
    this.keys = 0;
    // fallback for setKeys
    this.setKeys = (value) => {
      console.error("not a state. failed to setKeys() to:", value);
      return;
    };
  }

  // function to get a new key
  getKey() {
    this.setKeys((old) => old + 1);
    return this.keys;
  }

  // deleting an app - mainly for close button
  deleteApp(i) {
    this.setApps((old) => {
      return old.filter(function (obj) {
        return obj.key !== i;
      });
    });
  }

  // function to create a new app
  newApp({
    name = undefined, // used in looking up a page
    source = undefined, // used for custom apps
    title = undefined, // used for custom apps
    icon = undefined, // used for custom apps
    content = undefined, // used every time
    size = undefined, // used for custom apps
  }) {
    let returnApp;
    // generate app object from name (look it up in pages var)
    if (name !== undefined && this.pages !== undefined) {
      let pageInUse = this.pages[name]
        ? this.pages[name]
        : // response if page not found
          {
            title: "error",
            icon: null,
            content: <>Page wasnt found :( There was a boo boo. plz lmk ♥</>,
            source: null,
            size: "normal",
          };
      returnApp = new App({
        title: pageInUse.title,
        icon: pageInUse.icon,
        content: pageInUse.content,
        // source is stored mainly for debugging purposes - if you need to see where an app is from you can console.log it
        source: source + " => Globals.newApp({name})",
        key: this.getKey(),
        size: pageInUse.size,
      });
    }
    // generate new app from args
    else {
      returnApp = new App({
        title: title,
        icon: icon,
        content: content,
        source: source + " => Globals.newApp({title, icon, content})",
        key: this.getKey(),
        size: size,
      });
    }
    // set apps to correct state
    this.setApps((old) => [...old, returnApp]);

    // force re-render of children (this is bc apps is a little weird and doesnt trigger rerenders)
    this.setRenderPropState((old) => [...old, 0]);
  }
}

// create a new global class
const Globals = new GlobalsClass();

// exported values referencing Globals
// this is to ensure they both point to the same variable but it doesnt cause weird issues or anything - theyre identical vars
export const GlobalsContext = createContext(Globals);
export const GlobalsImport = Globals;

// Component used in index.js
export function GlobalsContextComponent({ children }) {
  // init states like this (doesnt cause rerender on setThing)
  [Globals.keys, Globals.setKeys] = useState(0);
  [Globals.apps, Globals.setApps] = useState([
    new App({
      title: "Welcome!!",
      icon: assets.system.icons.cube,
      content: <Welcome />,
      source: "init",
      key: -1,
      size: "normal",
    }),
  ]);
  // create state for rerendering (doesnt use correct value)
  // children of  this component get renderPropState so they update
  // globals gets setRenderPropState so it can trigger a re-render
  let [renderPropState, setRenderPropState] = useState([0]);
  // gotta put it here
  Globals.setRenderPropState = setRenderPropState;

  return (
    <GlobalsContext.Provider value={Globals}>
      {React.Children.map(children, (child) => {
        // for all the children of the component:
        // clone them
        // and add the renderPropState prop
        return React.cloneElement(child, {
          renderProp: renderPropState,
        });
      })}
    </GlobalsContext.Provider>
  );
}
