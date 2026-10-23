import express from "express";
import morgan from "morgan";
import { createPod } from "./kubernetes/pod.js";
import { createService } from "./kubernetes/service.js";
import { v7 as uuid } from "uuid";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)


app.get("/api/sandbox/health", (req, res) => {
  res.status(200).json({ 
    message: "Sandbox service is healthy",
    status: "success",
  });
});

app.post("/api/sandbox/start", async (req, res) => {
  const sandboxId = uuid(); // Generate a unique ID for the sandbox

  try {
    await Promise.all([
      createPod(sandboxId),
      createService(sandboxId)
    ]);

    return res.status(201).json({
      message: "sandbox started successfully",
      sandboxId,
      previewUrl: `http://${sandboxId}.preview.localhost`
    });
  } catch (error) {
    console.error("Failed to start sandbox", error);
    return res.status(500).json({
      message: "failed to start sandbox",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default app;