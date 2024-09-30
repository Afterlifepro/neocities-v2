import { useContext } from "react";
import { GlobalsContext } from "../Globals";
import { CloseButton } from "../Windows";
import assets from "../Assets";

///////////
// Debug //
///////////
// Debug to open Debug apps
// this is a simple component, just long and repetative
export function Debug() {
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
export function Test() {
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
}// lists all apps open when created (idk why it doesnt update lolol)
export function TaskManager() {
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
export function AppManager() {
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
              alt={""} />
          </td>
          <td>
            <button
              onClick={() => {
                console.log(app);
                globals.newApp({ name: app, source: "debugger" });
              } }
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

