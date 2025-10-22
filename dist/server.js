"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const ConnectMongoose_1 = __importDefault(require("./lib/Mongoose/ConnectMongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = process.env.NODE_ENV === "production"
    ? path_1.default.join(process.cwd(), ".env.prod")
    : path_1.default.join(process.cwd(), ".env");
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
let server;
const port = process.env.PORT || 5000;
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ConnectMongoose_1.default)();
    server = app_1.default.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
bootstrap();
