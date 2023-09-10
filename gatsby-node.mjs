import { createRequire } from "node:module";
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { piexif } from "piexifjs";

var AWS_KEY = process.env.ACCESS_KEY;
var AWS_SECRET = process.env.SECRET_KEY;
var BUCKET = process.env.PHOTO_BUCKET;
var PREFIX = process.env.PHOTO_PREFIX;
var API_ENDPOINT = process.env.PHOTO_API_ENDPOINT;

const require = createRequire(import.meta.url);
const BlogTemplate = require.resolve("./src/templates/blogTemplate.js");
const PostsTemplate = require.resolve("./src/templates/postsTemplate.js");
const PhotoTemplate = require.resolve("./src/templates/photoTemplate.js");

const itemsToRecord = [
  "Make",
  "Model",
  "ExposureTime",
  "FNumber",
  "ISOSpeedRatings",
  "PixelXDimension",
  "PixelYDimension",
  "FocalLengthIn35mmFilm",
  "DateTime",
];

const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
  },
});

function slugify(string) {
  return string.toLowerCase().replace(" ", "-");
}

function isImage(fileName) {
  return fileName.match(/\.(jpg|jpeg|png|gif)$/i) !== null;
}
function isPrefix(fileName) {
  return fileName.endsWith("/");
}

function convertExif(exif, key, itemsToRecord) {
  var result = {};
  for (const ifd in exif) {
    if (ifd != "thumbnail") {
      for (const tag in exif[ifd]) {
        if (itemsToRecord.includes(piexif.TAGS[ifd][tag]["name"])) {
          result[piexif.TAGS[ifd][tag]["name"]] = exif[ifd][tag];
        }
      }
    }
  }

  const photoInfo = {
    camera: result["Make"] + " " + result["Model"],
    lens: result["LensModel"],
    shutter: result["ExposureTime"][0] + "/" + result["ExposureTime"][1],
    fStop: result["FNumber"][0],
    iso: result["ISOSpeedRatings"],
    focalLength: result["FocalLengthIn35mmFilm"],
    dateTime: result["DateTime"],
    src: API_ENDPOINT + "/" + key,
  };
  const photo = {
    width: result["PixelXDimension"],
    height: result["PixelYDimension"],
    src: API_ENDPOINT + "/" + key,
  };
  return { photo, photoInfo };
}

async function listS3Object(bucketName, prefix, filterFunction) {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: prefix,
  });

  try {
    let isTruncated = true;
    var res = [];

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      Contents.map((e) => {
        if (filterFunction(e.Key)) {
          res.push(e.Key);
        }
      });
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    return res;
  } catch (err) {
    console.error(err);
  }
}

async function getPhotoData(bucketName, key) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  try {
    const response = await client.send(command);
    var photo = await response.Body.transformToString("binary");
    const exif = piexif.load(photo);
    return convertExif(exif, key, itemsToRecord);
  } catch (err) {
    console.error(err);
  }
}

export const createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const photos = [];
  const photoInfos = [];
  const prefixList = await listS3Object(BUCKET, "", isPrefix);
  const urls = await listS3Object(BUCKET, PREFIX, isImage);

  for (const url of urls) {
    const { photo, photoInfo } = await getPhotoData(BUCKET, url);
    photos.push(photo);
    photoInfos.push(photoInfo);
  }
  console.log(photoInfos);
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
      component: BlogTemplate,
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
      component: PostsTemplate,
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
      component: PostsTemplate,
      context: {
        key: cat,
        isTagPage: false,
        isCatPage: true,
      },
    });
  });

  console.log(photos);
  createPage({
    path: "/photos",
    component: PhotoTemplate,
    context: {
      photos: photos,
      photoInfos: photoInfos,
    },
  });
};
