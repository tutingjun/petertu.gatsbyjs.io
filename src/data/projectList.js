import cyberrun from "../images/cyberrun.png";
import carlclub from "../images/Carlclub_logo.png";
import icecream from "../images/icecream_logo.png";
import cosign from "../images/Cosign_logo.png";
import site from "../images/film-strip.png";
export const projectLists = [
  {
    name: "My personal website",
    date: "2022",
    slug: "/",
    tagline: "My personal website using gatsby",
    writeup: "https://github.com/tutingjun/petertu.gatsbyjs.io",
    image: site,
  },
  {
    name: "CyberRun",
    date: "2022",
    slug: "https://gxc.gg/games/8rd3si/cyber-run/",
    tagline: "A platform game using procedural rhetoric to convey a meaning",
    writeup: "/blog/CyberRun",
    image: cyberrun,
  },
  {
    name: "CarlClubs",
    date: "2022",
    slug: "https://hhfinals.dgah.sites.carleton.edu/carlclubs/",
    tagline:
      "An interactive website showing the history and current state of clubs at Carleton College.",
    writeup: "/blog/carlclub",
    image: carlclub,
  },
  {
    name: "Love me some ice cream",
    date: "2021",
    slug: "https://ice-cream-explorer.herokuapp.com",
    tagline: "An ice cream searching website using Flask",
    writeup: "/blog/love-me-some-ice-cream",
    image: icecream,
  },
  {
    name: "COSIGN",
    date: "2019",
    slug: "https://github.com/tutingjun/COSIGN",
    tagline: "An American sign language interpreter using VGG-16",
    writeup: "/blog/cosign",
    image: cosign,
  },
];
