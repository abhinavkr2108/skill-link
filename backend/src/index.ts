import express, { Express, Request, Response, Router } from "express";
import { PORT } from "./secret";
import { authRoute } from "./routes/authRoute";
import { apiRoute } from "./routes/apiRoute";
import cors from "cors";
import { courseRoute } from "./routes/getCourseRoute";
import { createRouteHandler } from "uploadthing/express";

import { uploadRouter } from "./uploadthing";

const app: Express = express();
const router: Router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      uploadthingId: process.env.UPLOADTHING_APP_ID,
      uploadthingSecret: process.env.UPLOADTHING_SECRET,
    },
  })
);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, World!");
// });

// app.use("/auth", authRoute);
app.use("/api", apiRoute);
app.use("/courses", courseRoute);

app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});
