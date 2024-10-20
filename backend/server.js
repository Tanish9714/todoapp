const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Task Model
const Task = mongoose.model("Task", new mongoose.Schema({
  task_title: { type: String, required: true },
  task_description: { type: String },
  userId: { type: String, required: true },
  completed: { type: Boolean, default: false },
}));

// Routes
app.get("/tasks", async (req, res) => {
  const userId = req.query.userId;
  const tasks = await Task.find({ userId });
  res.json(tasks);
});

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.post("/tasks", async (req, res) => {
  const { task_title, task_description, userId } = req.body;
  console.log(req.body); 

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  const newTask = new Task({ task_title, task_description, userId });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
});


app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Error deleting task", error });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
