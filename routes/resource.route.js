import { Router } from 'express';
import { createResource, getAllResources, getResourceById, updateResource, deleteResource } from '../controllers/resource.controller.js';
import { validateToken, checkRole } from '../middlewares/auth.middleware.js';
import { validateResource } from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/create', validateToken, checkRole('Admin'), validateResource, createResource);
router.get('/all', getAllResources);
router.get('/byId/:id', getResourceById);
router.put('/update/:id', validateToken, checkRole('Admin'), validateResource, updateResource);
router.delete('/delete/:id', validateToken, checkRole('Admin'), deleteResource);

export default router;
