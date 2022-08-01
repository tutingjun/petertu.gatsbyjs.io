export function slugify(string) {
  return string.toLowerCase().replace(" ", "-");
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
