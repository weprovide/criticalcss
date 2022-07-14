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
        throw new Error('Error: You need to provide pages as configuration (e.g. pages: [{"src": "https://www.site.com/", "target": "app/design/frontend/*company*/theme/web/css/cms-critical.css"}])');
    }
    if (!criticalcssConfig?.dimensions || criticalcssConfig?.dimensions.length === 0) {
        throw new Error('Error: You need to provide dimensions as configuration ("dimensions": [{ "width": 320 },{ "width": 767 },{ "width": 992 },{ "width": 1200 },{ "width": 1424 }])');
    }
    return criticalcssConfig;

}

// Most used viewports
// Widths and heights
const standardViewports = [
    { width: 2560, height: 1440 },
    { width: 1920, height: 1080 },
    { width: 1680, height: 1050 },
    { width: 1280, height: 1024 },
    { width: 1600, height: 900 },
    { width: 1440, height: 900 },
    { width: 414, height: 896 },
    { width: 1536, height: 864 },
    { width: 1366, height: 768 },
    { width: 1280, height: 720 },
    { width: 375, height: 667 },
    { width: 360, height: 640 },
];

const getClosestHeight = (target) =>
    standardViewports.reduce((acc, obj) =>
        Math.abs(target - obj?.width) < Math.abs(target - acc?.width) ? obj : acc
    );


module.exports = {
    getConfigFile,
    getClosestHeight
}