import puppeteer from 'puppeteer';
import { Browser, ElementHandle, Page } from 'puppeteer';
import { SEARCH_URL, PAGE_DIMENSION, WAIT_TIME, BROWSER_ARGS } from './constants';
import { Band } from '../../types/band-types';

type element = ElementHandle | null;

const parseBandData = async (band_map: element): Promise<Band[]> => {
    if (!band_map) return [];
    return band_map.$$eval('a', anchors =>
        anchors.map(anchor => {
            const band: Band = {
                name: anchor.textContent || '',
                id: anchor.id,
                coordenates: [anchor.getBoundingClientRect().x, anchor.getBoundingClientRect().y]
            };
            return band;
        })
    );
};

const getBands = async (band_name: string): Promise<Band[]> => {
    const browser: Browser = await puppeteer.launch({
        args: BROWSER_ARGS,
        defaultViewport: null
    });
    const page: Page = await browser.newPage();
    const band_url = `${SEARCH_URL}?f=${encodeURIComponent(band_name)}`;

    await page.setViewport(PAGE_DIMENSION);
    await page.goto(band_url, {
        waitUntil: 'load'
    });
    await new Promise(r => setTimeout(r, WAIT_TIME));
    const band_map = await page.$('#gnodMap');
    const bands = await parseBandData(band_map);
    console.log(bands);
    await browser.close();
    return bands;
};

export { getBands };
