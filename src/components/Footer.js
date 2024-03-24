import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

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
              width={24}
              height={24}
            />
            &nbsp;tutingjun@gmail.com
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
              <img src={link.icon} alt={link.label} className="footer-image" />
            </a>
          ))}
        </nav>
      </section>
    </footer>
  );
};
