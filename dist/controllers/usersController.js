"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const userController = {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            // Check if the email is already taken
            const existingUser = await users_1.default.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            // Create a new user
            const newUser = await users_1.default.create({
                name,
                email,
                password,
            });
            // @ts-ignore
            delete newUser.password;
            return res.status(201).json(newUser);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async getUsers(req, res) {
        try {
            const users = await users_1.default.findAll({ attributes: ['id', 'name', 'email'] });
            return res.status(200).json(users);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await users_1.default.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { name, email } = req.body;
            const user = await users_1.default.findOne({ where: { id: userId }, attributes: ['id', 'name', 'email'] });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            user.name = name;
            user.email = email;
            await user.save();
            return res.status(200).json(user);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await users_1.default.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            await user.destroy();
            return res.status(204).send();
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
exports.default = userController;
