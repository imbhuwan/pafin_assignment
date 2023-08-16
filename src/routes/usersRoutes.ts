import express from 'express';
import { body } from 'express-validator';
import userController from '../controllers/usersController';
import authMiddleware from '../middleware/authentication';

const router = express.Router();

router.post(
  '/users',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .trim()
      .escape()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),
    body('email')
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  userController.createUser
);

router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/:id', authMiddleware, userController.getUser);

router.put(
  '/users/:id',
  [
    body('name')
      .optional()
      .notEmpty()
      .withMessage('Name is required')
      .trim()
      .escape()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
  ],
  authMiddleware,
  userController.updateUser
);

router.delete('/users/:id', authMiddleware, userController.deleteUser);

export default router;
