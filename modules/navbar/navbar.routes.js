import { Router } from 'express';
import { getNavbarController } from './navbar.controller.js';

const router = Router();

router.get('/', getNavbarController);

export default router;