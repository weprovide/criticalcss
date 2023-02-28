#!/usr/bin/env node

const critical = require('critical');
const { getConfigFile, getClosestHeight } = require('./helpers');
const criticalcssConfig = getConfigFile();

// Disables warnings
process.setMaxListeners(0);

// No configs so stop
if (!criticalcssConfig) {
    return;
}

const domain = process.env.DOMAIN || criticalcssConfig?.domain;
const waitBeforeRender = process.env.RENDER_WAIT_TIME || criticalcssConfig?.renderWaitTime || 2500;

// The pages you want the critical css from (multiple pages and themes possible)
const pages = criticalcssConfig?.pages || [];
let dimensions = criticalcssConfig?.dimensions || [];

// The dimensions you want critical css from.
dimensions = dimensions?.map((dimension) => ({
    width: dimension?.width,
    height: dimension?.height ?? getClosestHeight(dimension?.width)?.height,
}));

console.log('Starting to create critical css bundles...');

Promise.all(pages?.map(async (page) => {
    console.log(' > ' + domain + page.src);
    return critical.generate({
        inline: false,
        src: domain + page.src,
        css: page.css,
        target: {
            css: page.target,
        },
        dimensions: dimensions,
        penthouse: {
            renderWaitTime: waitBeforeRender
        }
    });
})).catch((error) => {
    console.warn('Something went wrong while generating critical css:', error);
}).finally(() => {
    console.log('Finished generating critical css bundles!')
});
