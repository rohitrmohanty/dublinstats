import express from "express";
import cors from "cors";
import { tidy, mutate, rename } from "@tidyjs/tidy";
import fs from "fs";
import path from "path";
import { csvParse } from "d3-dsv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize cleaned data variable
let cleanedUnemploymentData = null;

// Load and clean data on server start
const loadData = () => {
  try {
    const rawData = fs.readFileSync(
      path.join(__dirname, "../data/indicator-1-unemployment.csv"),
      "utf8"
    );
    const parsedData = csvParse(rawData);

    cleanedUnemploymentData = tidy(
      parsedData,
      // Rename columns to remove newlines
      rename({
        "National\nUnemployment Rate SA (%)":
          "National Unemployment Rate SA (%)",
        "Dublin\nUnemployed SA (000)": "Dublin Unemployed SA (000)",
        "Dublin\nUnemployment Rate SA (%)": "Dublin Unemployment Rate SA (%)",
        "Dublin\nEmployed SA (000)": "Dublin Employed SA (000)",
        "QoQ\nDublin Employed": "QoQ Dublin Employed",
        "YoY\nDublin Employed": "YoY Dublin Employed",
        "%YoY\nDublin Unemployed": "%YoY Dublin Unemployed",
      }),
      // Convert percentage strings to numbers
      mutate({
        "National Unemployment Rate SA (%)": (d) =>
          parseFloat(d["National Unemployment Rate SA (%)"].replace("%", "")),
        "Dublin Unemployment Rate SA (%)": (d) =>
          parseFloat(d["Dublin Unemployment Rate SA (%)"].replace("%", "")),
        "%YoY Dublin Unemployed": (d) =>
          parseFloat(d["%YoY Dublin Unemployed"]),
      })
    );

    console.log("Data loaded and cleaned successfully");
  } catch (error) {
    console.error("Error loading and cleaning data:", error);
    process.exit(1); // Exit if we can't load the data
  }
};

// Load data immediately
loadData();

const app = express();
// app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use(cors());

// Simple endpoint returning pre-cleaned data
app.get("/api/unemployment", (req, res) => {
  if (!cleanedUnemploymentData) {
    return res.status(500).send("Data not available");
  }
  res.json(cleanedUnemploymentData);
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
