# This is my personal website using Gatsby

This website is built using Gatsby Framework with the help of React, Node.js, and GraphiQL. It is hosted on Gatsby Cloud. This project took inspiration from [taniarascia.com](https://www.taniarascia.com). (GitHub repo: [Link](https://github.com/taniarascia/taniarascia.com)) Currently, it supports integrating a `.md` page into the blog post. The project is still under development and will have a more comprehensive write-out when the first version is ready.

## To DO

- [x] Change Frontpage
- [x] Add support for the code block (inline code block)
- [x] Add support for backquote
- [ ] Figure out the display of video and images slide show --> a portfolio page
- [x] Weird format for phone
- [x] Click the selected category the second time and go back to the `/blog` page
- [x] Add more blog posts for all the projects with the icon images
- [ ] Add SEO for each page
- [ ] Possible table of contents for each blog post, using

```GraphiQL
headings {
      value
      depth
}
```

in GraphiQL

- [ ] Slow loading of images in blog posts

## Requirements

Make sure node.js, yarn, react.js, and gatsby are installed in your system

## How to Run:

```bash
npm install --legacy-peer-deps

gatsby develop
```

## Special Thanks

Special thanks to [Eric Wang](https://github.com/yixiaowang2001) for UI suggestions.
