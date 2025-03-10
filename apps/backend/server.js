const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the Velora Backend!");
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});