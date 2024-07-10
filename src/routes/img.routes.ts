import { Router, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse, UploadApiErrorResponse, ApiResourcesResponse, ApiErrorResponse } from 'cloudinary';


import { upload } from "../middlewares/multer";

const router = Router();


// POST - Subir imagen
router.post("/upload", upload.single("foto"), (req: Request, res: Response) => {
  try {
    cloudinary.config({
      cloud_name: "ddqdwtsn6",
      api_key: "965466249357923",
      api_secret: "Wyr2Bih60WRo_Y46g9iL6Q6q_H8",
    });

    cloudinary.uploader.upload(req.file?.path as string, (error: UploadApiErrorResponse, result: UploadApiResponse) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "error al subir imagen" });
      }

      res.status(200).json({ message: "subir imagen", result });
    });

    console.log(req.file);

    // res.status(200).json({ message: "subir imagen" });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});


// DELETE - Eliminar imagen
router.delete("/delete/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    cloudinary.config({
      cloud_name: "ddqdwtsn6",
      api_key: "965466249357923",
      api_secret: "Wyr2Bih60WRo_Y46g9iL6Q6q_H8",
    });

    cloudinary.uploader.destroy(id, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "error al eliminar imagen" });
      }

      res.status(200).json({ message: "eliminar imagen", result });
    });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }

});


// GET - Listar imagenes
router.get("/list", (req: Request, res: Response) => {
  try {
    cloudinary.config({
      cloud_name: "ddqdwtsn6",
      api_key: "965466249357923",
      api_secret: "Wyr2Bih60WRo_Y46g9iL6Q6q_H8",
    });

    cloudinary.api.resources((error: ApiErrorResponse , result: ApiResourcesResponse) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "error al listar imagenes" });
      }

      res.status(200).json({ message: "listar imagenes", result });
    });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});


// PUT - Actualizar imagen
router.put("/update/:id", upload.single("foto"), (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    cloudinary.config({
      cloud_name: "ddqdwtsn6",
      api_key: "965466249357923",
      api_secret: "Wyr2Bih60WRo_Y46g9iL6Q6q_H8",
    });

    cloudinary.uploader.upload(req.file?.path as string, { public_id: id }, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "error al actualizar imagen" });
      }

      res.status(200).json({ message: "actualizar imagen", result });
    });

  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});



export default router;
