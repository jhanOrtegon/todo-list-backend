"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
// src/bootstrap.ts
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function createApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.init();
    return app.getHttpAdapter().getInstance();
}
//# sourceMappingURL=bootstrap.js.map