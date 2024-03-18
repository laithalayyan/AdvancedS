const tasksService = require('./tasksService');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await tasksService.getAllTasks();
        if (tasks.length > 0) {
            res.status(200).json(tasks);
        } else {
            res.status(404).json({ message: "No tasks found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createTask = async (req, res) => {
    try {
        const result = await tasksService.createTask(req.body);
        res.status(200).json({ message: 'Task created', taskId: result.insertId });
    } catch (error) {
        if (error.message.startsWith('Invalid date format') || error.message.startsWith('ProjectID does not exist') || error.message.startsWith('AssignedToUserID does not exist')) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const getTask = async (req, res) => {
    try {
        const task = await tasksService.getTaskById(req.params.id);
        if (task.length > 0) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        await tasksService.updateTask(req.params.id, req.body);
        res.status(200).json({ message: 'Task updated' });
    } catch (error) {
        if (error.message === 'Task not found') {
            res.status(404).json({ message: 'Task not found' });
        }
        else if (error.message.startsWith('Invalid status') || error.message.startsWith('Invalid date format') || error.message.startsWith('ProjectID does not exist') || error.message.startsWith('AssignedToUserID does not exist')) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const deleteTask = async (req, res) => {
    try {
        const affectedRows = await tasksService.deleteTask(req.params.id);
        if (affectedRows > 0) {
            res.status(200).json({ message: "Task successfully deleted" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getAllTasks
};
