// Chart configuration and constants
const config = {
    dimensions: {
        width: 928,
        height: 500,
        margin: { 
            top: 20, 
            right: 30, 
            bottom: 50, 
            left: 40 
        }
    },
    colors: {
        dublin: '#23A1D7',    // Dublin City Council blue
        national: '#6DA642',  // Accent green
        tooltip: '#162B49',   // Dark blue
        axis: '#666666'       // Gray
    },
    transition: {
        duration: 300
    },
    tooltip: {
        offset: { x: 10, y: 10 }
    }
};

export default config;