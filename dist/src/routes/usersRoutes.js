"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const authentication_1 = __importDefault(require("../middleware/authentication"));
const router = express_1.default.Router();
router.post('/users', [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Name is required')
        .trim()
        .escape()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
], usersController_1.default.createUser);
router.get('/users', authentication_1.default, usersController_1.default.getUsers);
router.get('/users/:id', authentication_1.default, usersController_1.default.getUser);
router.put('/users/:id', [
    (0, express_validator_1.body)('name')
        .optional()
        .notEmpty()
        .withMessage('Name is required')
        .trim()
        .escape()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    (0, express_validator_1.body)('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
], authentication_1.default, usersController_1.default.updateUser);
router.delete('/users/:id', authentication_1.default, usersController_1.default.deleteUser);
exports.default = router;
