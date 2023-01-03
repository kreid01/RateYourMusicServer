import express, { Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Blob } from "buffer";

const accessKey = process.env.ACCESS_KEY!;
const secretAccessKey = process.env.SECRET_ACCESS_KEY!;
const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const type = upload.single("image");

router.post(
  "/",
  upload.single("image"),

  async (req: Request, res: Response) => {
    try {
      const params = {
        Bucket: bucketName,
        Key: String(1),
        Body: req.body.base64,
        ContentType: req.body.mimeType,
      };
      await s3Client.send(new PutObjectCommand(params));

      res.sendStatus(200);
    } catch (err: any) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }
);

const streamToString = (stream: any) =>
  new Promise((resolve, reject) => {
    const chunks: any = [];
    stream.on("data", (chunk: any) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

router.get("/", async (req: Request, res: Response) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: String(1),
    };

    const { Body } = await s3Client.send(new GetObjectCommand(params));
    res.send(await streamToString(Body));
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

export const fileController = router;
