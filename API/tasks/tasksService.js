const pool = require("../../DataBase/database");

const createTask = async (taskData) => {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (taskData.DueDate && !dateFormatRegex.test(taskData.DueDate)) {
        throw new Error('Invalid date format. The correct format is YYYY-MM-DD.');
    }

    /*const allowedStatuses = ['in progress', 'completed'];
    if (!allowedStatuses.includes(taskData.Status)) {
        throw new Error('Invalid status. Only "in Progress" or "completed" are allowed.');
    }*/

    const projectExists = await pool.execute('SELECT 1 FROM projects WHERE id = ?', [taskData.ProjectID]);
    if (projectExists[0].length === 0) {
        throw new Error('ProjectID does not exist.');
    }

    const userExists = await pool.execute('SELECT 1 FROM users WHERE id = ?', [taskData.AssignedToUserID]);
    if (userExists[0].length === 0) {
        throw new Error('AssignedToUserID does not exist.');
    }

    const query = `INSERT INTO tasks (ProjectID, AssignedToUserID, task_Title, Description, DueDate, CreatedDate, LastUpdatedDate) VALUES (?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE)`;
    const [result] = await pool.execute(query, [taskData.ProjectID, taskData.AssignedToUserID, taskData.task_Title, taskData.Description, taskData.DueDate]);
    return result;
};

const getTaskById = async (taskId) => {
    const query = `SELECT * FROM tasks WHERE TaskID = ?`;
    const [result] = await pool.execute(query, [taskId]);
    return result;
};

const updateTask = async (taskId, taskData) => {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (taskData.DueDate && !dateFormatRegex.test(taskData.DueDate)) {
        throw new Error('Invalid date format. The correct format is YYYY-MM-DD.');
    }

    const allowedStatuses = ['in progress', 'completed'];
    if (!allowedStatuses.includes(taskData.Status)) {
        throw new Error('Invalid status. Only "in progress" or "completed" are allowed.');
    }

    const projectExists = await pool.execute('SELECT 1 FROM projects WHERE id = ?', [taskData.ProjectID]);
    if (projectExists[0].length === 0) {
        throw new Error('ProjectID does not exist.');
    }

    const userExists = await pool.execute('SELECT 1 FROM users WHERE id = ?', [taskData.AssignedToUserID]);
    if (userExists[0].length === 0) {
        throw new Error('AssignedToUserID does not exist.');
    }

    const query = `UPDATE tasks SET ProjectID = ?, AssignedToUserID = ?, task_Title = ?, Description = ?, DueDate = ?, Status = ?, LastUpdatedDate = CURRENT_DATE WHERE TaskID = ?`;
    const [result] = await pool.execute(query, [taskData.ProjectID, taskData.AssignedToUserID, taskData.task_Title, taskData.Description, taskData.DueDate, taskData.Status, taskId]);
    if (result.affectedRows === 0) {
        throw new Error('Task not found');
    }
    return result;
};

const deleteTask = async (taskId) => {
    const query = `DELETE FROM tasks WHERE TaskID = ?`;
    const [result] = await pool.execute(query, [taskId]);
    return result.affectedRows; 
};

module.exports = {
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};
