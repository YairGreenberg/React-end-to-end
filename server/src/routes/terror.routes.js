import express from 'express';
import { getTerrorData, saveTestResult } from '../controller/terror.controller.js';

router.get('/data', getTerrorData);
router.post('/save-result', saveTestResult);

export default router;