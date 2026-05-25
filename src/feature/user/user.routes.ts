import { Router } from 'express';
import { createUser, getAllUsers } from './user.controller.js';


const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);

export default router;