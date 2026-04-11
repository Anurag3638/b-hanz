import express from 'express';
import {
    getDashboardSummary,
    getRevenueTrend,
    getUserAnalytics,
    getOrderAnalytics,
    getProductPerformance
} from '../controllers/analyticsController.js';
import { requireSignIn, isAdmin } from '../middelware/authMiddelware.js';

const router = express.Router();

// Analytics Routes - Protected
router.get('/dashboard-summary', requireSignIn, isAdmin, getDashboardSummary);
router.get('/revenue-trend', requireSignIn, isAdmin, getRevenueTrend);
router.get('/user-analytics', requireSignIn, isAdmin, getUserAnalytics);
router.get('/order-analytics', requireSignIn, isAdmin, getOrderAnalytics);
router.get('/product-performance', requireSignIn, isAdmin, getProductPerformance);

export default router;
