const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');
const config = require('./playwright.config');

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000, // 3 minutes
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  {
    /*
    Enable Playwright Workspaces Reporter:
    Uncomment the reporter section below to upload test results and reports to Playwright Workspaces.

    Note: The HTML reporter must be included before Playwright Workspaces Reporter.
    This configuration will replace any existing reporter settings from your base config.
    If you're already using other reporters, add them to this array.
    */
     reporter: [
       ["html", { open: "never" }],
       ["@azure/playwright/reporter"],
     ],


   /* az ad signed-in-user show --query id -o tsv -- Para obtener id si no permite desde el portal azure
   az role assignment create \
  --assignee "4df59cb2-56c5-4d3a-b63f-349442a46823" \
  --role "Storage Blob Data Contributor" \
  --scope "$(az storage account show --name pwstrgcds3134 --resource-group cds --query id -o tsv)"
    */


  }
);
