function slugify(string) {
  return string.toLowerCase().replace(" ", "-");
}

const createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`);
  const tagTemplate = require.resolve(`./src/templates/postsTemplate.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              slug
              tag
              category
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const data = result.data.allMarkdownRemark.edges;
  const tagSet = new Set();
  const categorySet = new Set();

  data.forEach(({ node }) => {
    if (node.frontmatter.tag) {
      node.frontmatter.tag.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    if (node.frontmatter.category) {
      categorySet.add(node.frontmatter.category);
    }

    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    });
  });

  const tagList = Array.from(tagSet);
  tagList.forEach((tag) => {
    createPage({
      path: `/tags/${slugify(tag)}/`,
      component: tagTemplate,
      context: {
        key: tag,
        isTagPage: true,
        isCatPage: false,
      },
    });
  });

  const cateList = Array.from(categorySet).filter((cat) => cat != "");
  cateList.forEach((cat) => {
    createPage({
      path: `/cats/${slugify(cat)}/`,
      component: tagTemplate,
      context: {
        key: cat,
        isTagPage: false,
        isCatPage: true,
      },
    });
  });
};

exports.createPages = createPages;
