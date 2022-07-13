const fs = require('fs');
const appRoot = process.cwd();

const getConfigFile = () => {
    let criticalcssConfig = null;
    try {
        criticalcssConfig = JSON.parse(fs.readFileSync(appRoot + '/criticalcss.config.json', 'utf8'));
    } catch (error) {
        throw new Error('Error: You probably forgot to add a criticalcss.config.json in the root of your project..')
    }

    if (!criticalcssConfig?.pages || criticalcssConfig?.pages.length === 0) {
        throw new Error('Error: You need to provide pages as configuration (pages: [{"src": "https://www.noppies.com/nl-nl", "target": "app/design/frontend/WeProvide/Noppies/web/css/cms-critical.css"}])');
    }
    if (!criticalcssConfig?.viewportWidths || criticalcssConfig?.viewportWidths.length === 0) {
        throw new Error('Error: You need to provide viewport widths as configuration (viewportWidths: [320, 767, 992, 1200, 1424])');
    }
    return criticalcssConfig;
}


// Most used viewports
// Widths and heights
const standardViewports = [
    { width: 1920, height: 1080 },
    { width: 1366, height: 768 },
    { width: 360, height: 640 },
    { width: 414, height: 896 },
    { width: 1536, height: 864 },
    { width: 375, height: 667 },
];

const getClosestHeight = (target) =>
    standardViewports.reduce((acc, obj) =>
        Math.abs(target - obj?.width) < Math.abs(target - acc?.width) ? obj : acc
    );


module.exports = {
    getConfigFile,
    getClosestHeight
}