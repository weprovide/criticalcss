const critical = require('critical');
const { getConfigFile, getClosestHeight } = require('./helpers');
const criticalcssConfig = getConfigFile();

// Disables warnings
process.setMaxListeners(0);

// No configs so stop
if (!criticalcssConfig) {
    return;
}

// The pages you want the critical css from (multiple pages and themes possible)
const pages = criticalcssConfig?.pages || [],
    widths = criticalcssConfig?.viewportWidths || [];

// The dimensions you want critical css from.
const dimensions = widths?.map((width) => ({
    height: getClosestHeight(width)?.height,
    width,
}));

pages?.forEach(async (page) => {
    await critical.generate({
        inline: false, src: page.src, css: page.css, target: {
            css: page.target,
        }, dimensions: dimensions,
    }, (err => {
        if (err !== null) {
            console.log(err);
        }
    }));
});
