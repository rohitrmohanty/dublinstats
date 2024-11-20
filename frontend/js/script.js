import config from './config.js';
import chartState from './chartState.js';
import { createChart, updateChart } from './chart.js';
import { debounce } from './utils.js';

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async () => {
    await initializeChart();
    window.addEventListener('resize', debounce(() => {
        if (chartState.data) {
            updateChart();
        }
    }, 250));
});

async function initializeChart() {
    try {
        // Show loading state
        const chartContainer = d3.select('#unemployment-chart');
        chartContainer.html('<div class="loading">Loading data...</div>');

        // Fetch and process data
        const response = await fetch('/api/unemployment');
        const data = await response.json();
        
        // Store data in state
        chartState.setData(data);

        // Clear loading state and create chart
        chartContainer.html('');
        createChart('#unemployment-chart');
    } catch (error) {
        console.error('Failed to initialize chart:', error);
        const chartContainer = d3.select('#unemployment-chart');
        chartContainer.html('<div class="error">Failed to load unemployment data</div>');
    }
}