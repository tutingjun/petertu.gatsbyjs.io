import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";
import wordpress from "../assets/wordpress.png";
const links = [
  {
    url: "https://github.com/tutingjun",
    label: "Github",
    icon: github,
  },
  {
    url: "https://www.linkedin.com/in/tingjun-tu/",
    label: "Linkedin",
    icon: linkedin,
  },
  {
    url: "https://petertu.sites.carleton.edu",
    label: "WordPress",
    icon: wordpress,
  },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <nav>
          <span className="desktop-only">Made by Peter Tu</span>
          <a
            href="mailto:tut@carleton.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage
              src="../assets/email.png"
              alt="email to:"
              width={28}
              height={28}
            />
            &nbsp;tut@carleton
          </a>
        </nav>
        <nav>
          {links.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              <span>{link.label}</span>
              <img src={link.icon} alt={link.label} className="footer-image" />
            </a>
          ))}
        </nav>
      </section>
    </footer>
  );
};
