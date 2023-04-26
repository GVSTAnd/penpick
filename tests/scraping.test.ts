import puppeteer, { Browser, Page } from 'puppeteer';
import {expect, test,describe,beforeAll,afterAll} from '@jest/globals';
import { ERROR_HTML,SUCCESS_HTML } from './mocks/scraping.mock';
import { BandNotFoundError } from '../src/services/scraping/exceptions';
import { getBandsRecomendations } from '../src/controllers/scraping.controller';


describe('Error bandnotfound in getBandsRecomendations', () => {
    let browser: Browser;
    let page: Page;
  
    beforeAll(async () => {
      browser = await puppeteer.launch({
        args: [
            '--no-sandbox'
        ],
        defaultViewport: null
    });
      page = await browser.newPage();
      await page.setContent(ERROR_HTML);
    });
  
    afterAll(async () => {
      await browser.close();
    });
  
    test('should return bandnotfound', async () => {
      await expect(() => getBandsRecomendations('errorlmao')).rejects.toThrow(BandNotFoundError);
  
    },20000);
  });


describe('Success in getBandsRecomendations', () => {
    let browser: Browser;
    let page: Page;
  
    beforeAll(async () => {
        browser = await puppeteer.launch({
            args: [
                '--no-sandbox'
            ],
            defaultViewport: null
        });
        page = await browser.newPage();
      await page.setContent(SUCCESS_HTML);
    });
  
    afterAll(async () => {
      await browser.close();
    });
  
    test('should return the recomendation bands', async () => {
      const bands = await getBandsRecomendations('metallica')
      
      expect(bands[0]).toBe('Nirvana')
      expect(bands[1]).toBe("Iron Maiden")
      expect(bands[2]).toBe("Red Hot Chili Peppers")
      expect(bands.length).toBe(48)

    },20000);
});