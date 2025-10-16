import app from "./app";
import ConnectMongoose from "./lib/Mongoose/ConnectMongoose";
import dotenv from "dotenv";
import path from "path";

const envPath =
  process.env.NODE_ENV === "production"
    ? path.join(process.cwd(), ".env.prod")
    : path.join(process.cwd(), ".env");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

let server;
const port = process.env.PORT || 5000;
const bootstrap = async () => {
  await ConnectMongoose();

  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

bootstrap();
