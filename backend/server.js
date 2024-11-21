import express from "express";
import cors from "cors";

// Dataset Loaders
import { loadDublinEconomicMonitor } from "./utils/dataClean.js";

// Load data immediately
const dublinEconomicMonitor = loadDublinEconomicMonitor();

const app = express();
app.use(cors());

/*
  Uncomment the following imports and middleware if serving frontend static files is required.
  Comment before pushing to the repo.
  You can access the web pages from localhost:3000 (if port not already in use)
*/
// import path from "path";
// import { __dirname } from "./utils/utils.js";
// app.use(express.static(path.join(__dirname, "../..", "frontend")));

// Simple endpoint returning pre-cleaned data
app.get("/api/unemployment", (req, res) => {
  if (!dublinEconomicMonitor.unemployment) {
    return res.status(500).send("Data not available");
  }
  res.json(dublinEconomicMonitor.unemployment);
});

app.get("/api/employment", (req, res) => {
  if (!dublinEconomicMonitor.employment) {
    return res.status(500).send("Employment data not available");
  }
  res.json(dublinEconomicMonitor.employment);
});

app.get("/api/dublin-economic-monitor", (req, res) => {
  if (!dublinEconomicMonitor) {
    return res.status(500).send("Data not available");
  }
  res.json(dublinEconomicMonitor);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
