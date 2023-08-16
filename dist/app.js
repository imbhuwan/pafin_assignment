"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const authentication_1 = __importDefault(require("./middleware/authentication")); // Import jsonwebtoken
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
// Apply routes with authMiddleware
app.use('/api', authentication_1.default, usersRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
