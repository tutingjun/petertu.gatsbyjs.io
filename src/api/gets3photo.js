import { TAGS, load } from "piexifjs";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { aspectRatio, isImage } from "../utils/helper";

const AWS_KEY = process.env.PHOTO_AWS_KEY;
const AWS_SECRET = process.env.PHOTO_AWS_SECRET;
const API_ENDPOINT = process.env.PHOTO_API_ENDPOINT;

const client = new S3Client({ region: "us-east-2" });

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

function convertExif(exif, key, itemsToRecord) {
  var result = {};
  for (const ifd in exif) {
    if (ifd != "thumbnail") {
      for (const tag in exif[ifd]) {
        if (itemsToRecord.includes(TAGS[ifd][tag]["name"])) {
          result[TAGS[ifd][tag]["name"]] = exif[ifd][tag];
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

export async function getAllPhotoURL(bucketName, prefix) {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: prefix,
  });

  try {
    let isTruncated = true;

    console.log("Your bucket contains the following objects:\n");
    let contents = "";

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);
  } catch (err) {
    console.error(err);
  }
}

// function getPhotoData(bucketName, key) {
//   var fileParams = {
//     Bucket: bucketName,
//     Key: key,
//   };

//   return new Promise((resolve, reject) => {
//     s3.getObject(fileParams, function (err, fileContents) {
//       if (err) reject(err);

//       var contents = fileContents.Body.toString("binary");
//       var exif = load(contents);

//       const { photo, photoInfo } = convertExif(exif, key, itemsToRecord);

//       resolve(convertExif(exif, key, itemsToRecord));
//     });
//   });
// }
