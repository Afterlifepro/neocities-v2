import assets from "../Assets";
import { Player, Gallery } from "../AppAssets";
import { useContext } from "react";
import { GlobalsContext } from "../Globals";

export const standardPages = {
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