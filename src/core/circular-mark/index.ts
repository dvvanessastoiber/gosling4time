import { GeminiTrackModel } from '../gemini-track-model';
import { drawCircularArea } from './c-area';
import { drawCircularLine } from './c-line';
import { drawCircularPoint } from './c-point';
import { drawCircularRect } from './c-rect';
import { drawCircularGrid } from './c-grid';
import { drawCircularOutlines } from './c-outline';
import { drawCircularBar } from './c-bar';
import { drawColorLegend } from '../mark/legend';

/**
 * Draw a track based on the track specification in a Gemini grammar.
 */
export function drawCircularMark(HGC: any, trackInfo: any, tile: any, tm: GeminiTrackModel) {
    if (!HGC || !trackInfo || !tile) {
        // We did not receive parameters correctly.
        return;
    }

    if (tm.spec().mark === 'rect-brush') {
        // We do not draw brush. Instead, higlass do.
        return;
    }

    // Replace the scale of a genomic axis with the one that is generated by the HiGlass data fetcher.
    ['x', 'x1', 'x1e', 'xe'].forEach((d: any) => {
        tm.setChannelScale(d, trackInfo._xScale);
    });

    /* embellishment before rendering plots */
    drawCircularGrid(HGC, trackInfo, tile, tm);

    /* spec */
    switch (tm.spec().mark) {
        case 'point':
            drawCircularPoint(HGC, trackInfo, tile, tm);
            break;
        case 'bar':
            drawCircularBar(HGC, trackInfo, tile, tm);
            break;
        case 'line':
            drawCircularLine(HGC, trackInfo, tile, tm);
            break;
        case 'area':
            drawCircularArea(HGC, trackInfo, tile, tm);
            break;
        case 'rect':
            drawCircularRect(HGC, trackInfo, tile, tm);
            break;
        case 'triangle-l':
        case 'triangle-r':
        case 'triangle-d':
            break;
        case 'text':
            break;
        case 'rule':
            break;
        case 'link':
            break;
        default:
            console.warn('Unsupported mark type');
            break;
    }

    /* embellishment after rendering plots */
    drawCircularOutlines(HGC, trackInfo, tile, tm);
    drawColorLegend(HGC, trackInfo, tile, tm);
}
