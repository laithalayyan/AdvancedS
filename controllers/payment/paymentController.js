const paymentService = require('./paymentService');

const createPayment = async (req, res) => {
    try {
        const { message, remainingProjectPrice, isFullyPaid } = await paymentService.createPayment(req.body);

        res.status(isFullyPaid ? 200 : 201).json({ message, remainingProjectPrice, isFullyPaid });
    } catch (error) {
        if (error.message.includes("Requesting user does not exist")) {
            return res.status(404).json({ message: error.message });
        } else if (error.message.includes("Project does not exist")) {
            return res.status(404).json({ message: error.message });
        } else if (error.message.includes("Payment amount exceeds the remaining project price")) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(500).json({ message: "An error occurred processing your request." });
        }
    }
};

const getPayments = async (req, res) => {
    try {
        const payments = await paymentService.getPayments();
        if (payments.length === 0) {
            return res.status(404).json({ message: "No payments found" });
        }
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving payments", error: error.message });
    }
};

const getPaymentsByUserId = async (req, res) => {
    try {
        const payments = await paymentService.getPaymentsByUserId(req.params.userId);
        if (payments.length > 0) {
            res.json(payments);
        } else {
            res.status(404).json({ message: "No payments found for the user" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving payments", error: error.message });
    }
};

const getPaymentsByProjectId = async (req, res) => {
    try {
        const payments = await paymentService.getPaymentsByProjectId(req.params.projectId);
        if (payments.length > 0) {
            res.json(payments);
        } else {
            res.status(404).json({ message: "No payments found for the project" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving payments", error: error.message });
    }
};

const updatePayment = async (req, res) => {
    try {
        const id = req.params.id;
        const paymentData = req.body;
        const result = await paymentService.updatePayment(id, paymentData);

        res.json(result);
    } catch (error) {
        if (error.message === "Requesting user does not exist" || error.message === "Project does not exist") {
            res.status(404).json({ message: error.message }); 
        } else if (error.message === "Invalid status. Status must be one of 'pending', 'completed', 'rejected'.") {
            res.status(400).json({ message: error.message }); 
        } else if (error.message === "Payment not found") {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error updating payment", error: error.message });
        }
    }
};

const deletePayment = async (req, res) => {
    try {
        const result = await paymentService.deletePayment(req.params.id);
        if (result.affectedRows) {
            res.json({ message: "Payment deleted successfully" });
        } else {
            res.status(404).json({ message: "Payment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting payment", error: error.message });
    }
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentsByUserId,
    getPaymentsByProjectId,
    updatePayment,
    deletePayment
};
