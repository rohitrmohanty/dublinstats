import express from 'express';
import cors from 'cors';

import { tidy, filter, summarize, mean } from '@tidyjs/tidy';
import fs from 'fs';
import path from 'path';
import { csvParse } from 'd3-dsv';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

app.get('/api/unemployment', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/indicator-1-unemployment.csv'), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading unemployment data.');

    const parsedData = csvParse(data);

    // Filter using the exact column name with \n
    const filteredData = tidy(
      parsedData,
      filter(d => {
        // Remove the '%' character and parse the number
        const unemploymentRate = parseFloat(d['Dublin\nUnemployment Rate SA (%)'].replace('%', ''));
        return unemploymentRate > 5;
      })
    );

    res.json(filteredData);
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

