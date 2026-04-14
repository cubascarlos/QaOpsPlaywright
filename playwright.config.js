// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30*1000,
    expect: {
      timeout: 5*1000,
    },
  reporter: 'html',
  
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    //screenshot: 'only-on-failure',
    trace: 'on' //trace.playwright.dev --> se sube el archvio descargado trace en el reporte html
    //trace: 'retain-on-failure'

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },
});
module.exports = config

