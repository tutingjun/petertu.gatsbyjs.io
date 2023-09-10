export function slugify(string) {
  return string.toLowerCase().replace(" ", "-");
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertPageData(data) {
  const links = {
    github: data.frontmatter.github,
    wordpress: data.frontmatter.wordpress,
    source: data.frontmatter.source,
  };
  Object.keys(links).forEach((key) => {
    if (links[key] === null) {
      delete links[key];
    }
  });
  return {
    title: data.frontmatter.title,
    slug: data.frontmatter.slug,
    tags: data.frontmatter.tag,
    category: data.frontmatter.category,
    date: data.frontmatter.date,
    // readingTime: data.fields.readingTime.text,
    html: data.html,
    links: links,
    linkCategory: Object.keys(links),
  };
}

function convertData(posts) {
  return posts.map((post) => ({
    id: post.node.id,
    slug: post.node.frontmatter.slug,
    date: post.node.frontmatter.date,
    tags: post.node.frontmatter.tag,
    title: post.node.frontmatter.title,
    categories: post.node.frontmatter.category,
    year: post.node.frontmatter.year,
  }));
}

export function getYearList(posts) {
  posts = convertData(posts);
  const postsByYear = {};
  posts.forEach((post) => {
    if (post.year in postsByYear) {
      postsByYear[post.year].push(post);
    } else {
      postsByYear[post.year] = [post];
    }
  });
  return postsByYear;
}

export function isEnglish(text) {
  var english = /^[A-Za-z0-9]*$/;
  text = text.split(" ").join("");
  for (var i = 0; i < text.length; i++) {
    if (!english.test(text[i])) {
      return false;
    }
  }
  return true;
}

const gcd = (a, b) => {
  return b ? gcd(b, a % b) : a;
};

export function aspectRatio(width, height) {
  const divisor = gcd(width, height);
  width /= divisor;
  height /= divisor;
  return { width, height };
}

export function isImage(fileName) {
  return fileName.match(/\.(jpg|jpeg|png|gif)$/i) !== null;
}
