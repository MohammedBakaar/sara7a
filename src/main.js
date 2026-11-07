import express from "express";
import { port } from "./config/config.service.js";
import { connectDB } from "./database/index.js";
import { globalErrorHandler } from "./common/index.js";
import { authController, userController } from "./modules/index.js";

await connectDB();

console.log();
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log({
    method: req.method,
    url: req.url,
  });
  next();
});
app.use("/auth", authController);
app.use("/user", userController);

app.use(globalErrorHandler);
app.listen(port, () => {
  console.log(`server is running on port :: ${port}`);
});
