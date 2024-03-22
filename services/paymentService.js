const pool = require("../../DataBase/database");

const createPayment = async (paymentData) => {
    const { requestingUserID, projectID, paymentAmount, paymentMethod } = paymentData;
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const [user] = await pool.query('SELECT * FROM Users WHERE id = ?', [requestingUserID]);
    if (user.length === 0) {
        throw new Error("Requesting user does not exist");
    }

    const [project] = await pool.query('SELECT * FROM Projects WHERE id = ?', [projectID]);
    if (project.length === 0) {
        throw new Error("Project does not exist");
    }

    let remainingPrice = project[0].remaining_price;
    if (paymentAmount > remainingPrice) {
        throw new Error(`Payment amount exceeds the remaining project price. Remaining price: $${remainingPrice}`);
    }

    remainingPrice -= paymentAmount;
    await pool.query('UPDATE Projects SET remaining_price = ? WHERE id = ?', [remainingPrice, projectID]);

    const paymentStatus = remainingPrice === 0 ? 'Completed' : 'Pending';
    await pool.query(
        'INSERT INTO Payment (RequestingUserID, ProjectID, PaymentAmount, PaymentMethod, RequestDate, Status) VALUES (?, ?, ?, ?, ?, ?)',
        [requestingUserID, projectID, paymentAmount, paymentMethod, currentDate, paymentStatus]
    );

    return {
        message: remainingPrice === 0 ? 'The project is now fully paid.' : `Payment applied successfully. Remaining project price: $${remainingPrice}.`,
        remainingProjectPrice: remainingPrice,
        isFullyPaid: remainingPrice === 0
    };
};

const getPayments = async () => {
    const [payments] = await pool.query('SELECT * FROM payment');
    return payments;
};

const getPaymentsByUserId = async (userId) => {
    const [payments] = await pool.query('SELECT * FROM Payment WHERE RequestingUserID = ?', [userId]);
    return payments; 
};

const getPaymentsByProjectId = async (projectId) => {
    const [payments] = await pool.query('SELECT * FROM Payment WHERE ProjectID = ?', [projectId]);
    return payments;
};

const updatePayment = async (id, paymentData) => {
    const { requestingUserID, projectID, paymentAmount, paymentMethod, status } = paymentData;
    
    const validStatuses = ['pending', 'completed', 'rejected'];
    if (!validStatuses.includes(status)) {
        throw new Error("Invalid status. Status must be one of 'pending', 'completed', 'rejected'.");
    }

    const requestDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const [user] = await pool.query('SELECT * FROM Users WHERE id = ?', [requestingUserID]);
    if (user.length === 0) {
        throw new Error("Requesting user does not exist");
    }

    const [project] = await pool.query('SELECT * FROM Projects WHERE id = ?', [projectID]);
    if (project.length === 0) {
        throw new Error("Project does not exist");
    }

    const [result] = await pool.query(
        'UPDATE Payment SET RequestingUserID = ?, ProjectID = ?, PaymentAmount = ?, PaymentMethod = ?, RequestDate = ?, Status = ? WHERE PaymentID = ?',
        [requestingUserID, projectID, paymentAmount, paymentMethod, requestDate, status, id]
    );

    if (result.affectedRows === 0) {
        throw new Error("Payment not found");
    }

    return { message: "Payment updated successfully" };
};

const deletePayment = async (id) => {
    const [result] = await pool.query('DELETE FROM Payment WHERE PaymentID = ?', [id]);
    return result;
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentsByUserId,
    getPaymentsByProjectId,
    updatePayment,
    deletePayment
};
