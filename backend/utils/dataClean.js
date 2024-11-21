import { tidy, mutate, rename } from "@tidyjs/tidy";
import fs from "fs";
import path from "path";
import { csvParse } from "d3-dsv";
import { __dirname } from "./utils.js";

export const loadDublinEconomicMonitor = () => {
  try {
    return {
      unemployment: loadUnemploymentData(),
      employment: loadEmploymentData(),
    };
  } catch (error) {
    console.error("Error loading Dublin Economic Monitor data:", error);
    process.exit(1);
  }
};

// Load and clean data on server start
export const loadUnemploymentData = () => {
  try {
    const rawData = fs.readFileSync(
      path.join(__dirname, "../../data/indicator-1-unemployment.csv"),
      "utf8"
    );
    const parsedData = csvParse(rawData);

    const cleanedData = tidy(
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
    return cleanedData;
  } catch (error) {
    console.error("Error loading and cleaning data:", error);
    process.exit(1); // Exit if we can't load the data
  }
};

export const loadEmploymentData = () => {
  try {
    const rawData = fs.readFileSync(
      path.join(__dirname, "../../data/indicator-2-employment-indicator.csv"),
      "utf8"
    );
    const parsedData = csvParse(rawData);

    const columnMap = {
      "Dublin Employment ('000) - Construction (F)": "Construction",
      "Dublin Employment ('000) - Wholesale and retail trade, repair of motor vehicles and motorcycles (G)":
        "Wholesale and Retail",
      "Dublin Employment ('000) - Transportation and storage (H)":
        "Transportation and Storage",
      "Dublin Employment ('000) - Accommodation and food service activities (I)":
        "Accommodation and Food",
      "Dublin Employment ('000) - Information and communication (J)":
        "Information and Communication",
      "Dublin Employment ('000) - Professional, scientific and technical activities (M)":
        "Professional and Technical",
      "Dublin Employment ('000) - Administrative and support service activities (N)":
        "Administrative and Support",
      "Dublin Employment ('000) - Public administration and defence, compulsory social security (O)":
        "Public Administration",
      "Dublin Employment ('000) - Education (P)": "Education",
      "Dublin Employment ('000) - Human health and social work activities (Q)":
        "Health and Social Work",
      "Dublin Employment ('000) - Industry (B to E)": "Industry",
      "Dublin Employment ('000) - Industry and Construction (B to F)":
        "Industry and Construction",
      "Dublin Employment ('000) - Services (G to U)": "Services",
      "Dublin Employment ('000) - Financial, insurance and real estate activities (K,L)":
        "Financial and Real Estate",
      "Dublin Employment ('000) - Other NACE activities (R to U)":
        "Other Activities",
    };

    const cleanedData = tidy(
      parsedData,
      rename(columnMap),
      mutate(
        Object.values(columnMap).reduce(
          (acc, col) => ({
            ...acc,
            [col]: (d) => parseFloat(d[col]) || null,
          }),
          {
            "Private Sector": (d) => {
              const value = parseFloat(d["Private Sector"]);
              return value < 0 ? null : value;
            },
          }
        )
      )
    );

    console.log("Employment data loaded and cleaned successfully");
    return cleanedData;
  } catch (error) {
    console.error("Error loading and cleaning employment data:", error);
    process.exit(1);
  }
};
