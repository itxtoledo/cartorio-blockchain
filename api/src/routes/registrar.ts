import express from "express";
import formidable from "formidable";

const route = express.Router();

route.post("/register", (req, res, next) => {
  // compute file hash

  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    console.log("/register", files);
    res.json({ fields, files });
  });
});

route.get("/:hash", (req, res) => {
  return res.json({ ok: 1 });
});

export { route as registryRouter };
