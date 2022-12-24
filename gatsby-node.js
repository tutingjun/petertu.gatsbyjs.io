var AWS_KEY = process.env.PHOTO_AWS_KEY;
var AWS_SECRET = process.env.PHOTO_AWS_SECRET;
var BUCKET = process.env.PHOTO_BUCKET;
var PREFIX = process.env.PHOTO_PREFIX;
var API_ENDPOINT = process.env.PHOTO_API_ENDPOINT;

function slugify(string) {
  return string.toLowerCase().replace(" ", "-");
}

const gcd = (a, b) => {
  return b ? gcd(b, a % b) : a;
};

const aspectRatio = (width, height) => {
  const divisor = gcd(width, height);
  width /= divisor;
  height /= divisor;
  return { width, height };
  // return `${width / divisor}:${height / divisor}`;
};

function convertExif(exif, key, itemsToRecord, piexif) {
  result = {};
  for (const ifd in exif) {
    if (ifd != "thumbnail") {
      for (const tag in exif[ifd]) {
        if (itemsToRecord.includes(piexif.TAGS[ifd][tag]["name"])) {
          result[piexif.TAGS[ifd][tag]["name"]] = exif[ifd][tag];
        }
      }
    }
  }
  const { width, height } = aspectRatio(
    result["PixelXDimension"],
    result["PixelYDimension"]
  );

  const photoInfo = {
    camera: result["Make"] + " " + result["Model"],
    lens: result["LensModel"],
    shutter: result["ExposureTime"][0] + "/" + result["ExposureTime"][1],
    fStop: result["FNumber"][0],
    iso: result["ISOSpeedRatings"],
    focalLength: result["FocalLengthIn35mmFilm"],
    src: API_ENDPOINT + "/" + key,
  };
  const photo = {
    width: width,
    height: height,
    src: API_ENDPOINT + "/" + key,
  };
  return { photo, photoInfo };
}

const createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`);
  const tagTemplate = require.resolve(`./src/templates/postsTemplate.js`);
  const photoTemplate = require.resolve(`./src/templates/photoTemplate.js`);

  const itemsToRecord = [
    "Make",
    "Model",
    "ExposureTime",
    "FNumber",
    "ISOSpeedRatings",
    "PixelXDimension",
    "PixelYDimension",
    "FocalLengthIn35mmFilm",
    "LensModel",
  ];

  const async = require("async");
  const AWS = require("aws-sdk");
  const piexif = require("piexifjs");
  AWS.config.update({ accessKeyId: AWS_KEY, secretAccessKey: AWS_SECRET });

  const s3 = new AWS.S3({ region: "us-east-2" });
  const photos = [];
  const photoInfos = [];

  const getPhotoData = (bucketName, prefix) => {
    var params = {
      Bucket: bucketName,
      Prefix: prefix,
    };
    s3.listObjects(params, function (err, data) {
      if (err) return console.log(err);

      async.eachSeries(
        data.Contents,
        function (fileObj, callback) {
          var key = fileObj.Key;

          var fileParams = {
            Bucket: BUCKET,
            Key: key,
          };

          s3.getObject(fileParams, async function (err, fileContents) {
            if (err) {
              callback(err);
            } else {
              // Read the file
              if (fileContents.ContentType.toString().includes("image")) {
                var contents = fileContents.Body.toString("binary");
                var exif = piexif.load(contents);
                const { photo, photoInfo } = convertExif(
                  exif,
                  key,
                  itemsToRecord,
                  piexif
                );

                photos.push(photo);
                photoInfos.push(photoInfo);
              }

              callback();
            }
          });
        },
        function (err) {
          if (err) {
            console.log("Failed: " + err);
          } else {
            // console.log(photos);
            // console.log(photoInfos);
            // console.log("Finished");
          }
        }
      );
    });
  };

  getPhotoData(BUCKET, PREFIX);

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

  createPage({
    path: "/photos",
    component: photoTemplate,
    context: {
      photos: photos,
      photoInfos: photoInfos,
    },
  });
};

exports.createPages = createPages;
