import { Router } from 'express';
import { getAllTools, getToolById, createTool } from '../controllers/toolsController';

const router = Router();

router.get('/', getAllTools);
router.get('/:id', getToolById);
router.post('/', createTool);

export default router;
