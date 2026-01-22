// import { Request, RequestHandler } from "express";
// import formidable, { Files } from "formidable";

// export interface RequestWithFiles extends Request {
//   files?: Files;
// }

// const fileParser: RequestHandler = (req: RequestWithFiles, res, next) => {
//   if (!req.headers["content-type"]?.startsWith("multipart/form-data;"))
//     return res.status(422).json({ error: "Only accepts form-data!" });

//   const form = formidable({ multiples: false });

//   form.parse(req, (err, fields, files) => {
//     if (err) return next(err);

//     req.body = fields;
//     req.files = files;

//     next();
//   });
// };



import { Request, RequestHandler } from "express";
import formidable, { File } from "formidable";
 
export interface RequestWithFiles extends Request {
  files?: { [key: string]: File };
}
 
const fileParser: RequestHandler = async (req: RequestWithFiles, res, next) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data;"))
    return res.status(422).json({ error: "Only accepts form-data!" });
 
  const form = formidable({ multiples: false });
 
  const { fields, files } = await new Promise<{fields:formidable.Fields, files:formidable.Files}>((resolve) => {
    form.parse(req, (err, fields, files) => {
      if (err) throw new Error('Upload Failed!');
      resolve({ fields, files });
    });
  });

  for (let key in fields) {
    const field = fields[key];
    if (field) {
      req.body[key] = field;
    }
  }

  for (let key in files) {
    const file = files[key];

    if (!req.files) {
      req.files = {};
    }

    if (file) {
      req.files[key] = (Array.isArray(file) ? file[0] : file) as File;
    }
  }
 
  next();
};

export default fileParser;