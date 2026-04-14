// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,
  workers: 3,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: 'html',

  projects: [
    {       
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'on',
        trace: 'on'
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        //video: 'retain-on-failure',
        //trace: 'on',
        //inforeHttpsErrors: true,//permisos SSL
        //permissions: ['geolocation'],//popup como ubicacion
        //...devices['iPhone 14 Pro']
        //viewport: {width: 720, height: 720}
      }
    }
  ]

});
module.exports = config

