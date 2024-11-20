// Chart state management
class ChartState {
    constructor() {
        this.data = null;
        this.svg = null;
        this.scales = {
            x: null,
            y: null
        };
        this.tooltip = null;
        this.lines = {
            dublin: null,
            national: null
        };
        this.axes = {
            x: null,
            y: null
        };
    }

    setData(data) {
        this.data = data;
    }

    setSvg(svg) {
        this.svg = svg;
    }

    setScales(scales) {
        this.scales = { ...this.scales, ...scales };
    }

    setTooltip(tooltip) {
        this.tooltip = tooltip;
    }

    setLines(lines) {
        this.lines = { ...this.lines, ...lines };
    }

    setAxes(axes) {
        this.axes = { ...this.axes, ...axes };
    }
}

export default new ChartState();