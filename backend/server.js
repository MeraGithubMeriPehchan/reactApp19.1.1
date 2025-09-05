require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  await newTodo.save();
  res.json(newTodo);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  todo.done = req.body.done;
  await todo.save();
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Missing todo ID" });
  }

  try {
    await Todo.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format", details: err.message });
  }
});


app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
