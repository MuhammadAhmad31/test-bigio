const multer = require("multer");

export const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "public/images");
  },
  filename: (req: any, file: any, cb: any) => {
    const timestamp = new Date().getTime();
    const filename = file.originalname;
    cb(null, `${timestamp}-${filename}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1000 * 1000,
  },
});
