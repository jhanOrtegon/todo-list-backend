"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const bootstrap_1 = require("./bootstrap");
let server;
const handler = async (event, context) => {
    if (!server) {
        const app = await (0, bootstrap_1.createApp)();
        server = (0, serverless_express_1.default)({ app });
    }
    return server(event, context);
};
exports.handler = handler;
//# sourceMappingURL=main.lambda.js.map