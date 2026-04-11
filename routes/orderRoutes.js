import express from 'express';
import { requireSignIn, isAdmin } from '../middelware/authMiddelware.js';
import Order from '../models/orderModel.js';

const router = express.Router();

// Create Order
router.post('/create-order', requireSignIn, async (req, res) => {
    try {
        const {
            products,
            totalAmount,
            discount,
            tax,
            shippingAddress,
            shippingCost,
            paymentMethod
        } = req.body;

        if (!products || !totalAmount || !shippingAddress) {
            return res.status(400).send({
                success: false,
                message: "Missing required fields"
            });
        }

        const orderNumber = `ORD-${Date.now()}`;
        const finalAmount = totalAmount - (discount || 0) + (tax || 0) + (shippingCost || 0);

        const order = new Order({
            orderNumber,
            userId: req.user._id,
            products,
            totalAmount,
            discount,
            tax,
            shippingAddress,
            shippingCost,
            paymentMethod,
            finalAmount
        });

        await order.save();

        res.status(201).send({
            success: true,
            message: "Order created successfully",
            order
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send({
            success: false,
            message: "Error creating order",
            error: error.message
        });
    }
});

// Get All Orders (Admin)
router.get('/orders', requireSignIn, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'name email')
            .populate('products.productId', 'name')
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching orders",
            error: error.message
        });
    }
});

// Get User's Orders
router.get('/my-orders', requireSignIn, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate('products.productId', 'name')
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching user orders",
            error: error.message
        });
    }
});

// Get Single Order
router.get('/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('products.productId');

        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).send({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching order",
            error: error.message
        });
    }
});

// Update Order Status (Admin)
router.put('/order/:id/status', requireSignIn, isAdmin, async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;

        if (!status && !paymentStatus) {
            return res.status(400).send({
                success: false,
                message: "Provide status or paymentStatus to update"
            });
        }

        const updateData = {};
        if (status) updateData.status = status;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Order updated successfully",
            order
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error updating order",
            error: error.message
        });
    }
});

// Cancel Order
router.put('/order/:id/cancel', requireSignIn, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found"
            });
        }

        // Only allow cancellation if order is not shipped/delivered
        if (["shipped", "delivered"].includes(order.status)) {
            return res.status(400).send({
                success: false,
                message: "Cannot cancel order that is already shipped or delivered"
            });
        }

        order.status = "canceled";
        await order.save();

        res.status(200).send({
            success: true,
            message: "Order canceled successfully",
            order
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error canceling order",
            error: error.message
        });
    }
});

export default router;
