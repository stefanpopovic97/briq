
exports.config = {
  getPageTimeout: 60000, //Protractor wait time for the page to be loaded and new URL to appear
  allScriptsTimeout: 50000, //Protractor wait time for pending asynchronous tasks
  specs: [
    './features/*.feature'
  ],

  capabilities: { //Run tests only in one browser(which can have multiple instances)
    browserName: 'chrome',
    chromeOptions: {
      args: [
        // '--headless',
        '--no-sandbox',
        // '--window-size=1920,1080',
        '--disable-offline-pages',
        '--disable-software-rasterizer'
      ]
    }
  },
  directConnect: true,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      './steps/*.steps.ts' // accepts a glob
    ],
    format: 'json:./reports/json/results.json',
  },
  suites: {
    createBooking: [
      './features/createBooking.feature'
    ]
  },
  plugins: [{
    package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      reportSuiteAsScenarios: true,
      customMetadata: true,
      customData: {
        title: 'Execution info',
        data: [
          { label: 'Project', value: 'Briq' },
          { label: 'Version', value: '1.0' },
          { label: 'Test suites', value: 'Create Booking' },
          { label: 'Test env', value:"https://test.briqstaging.net" },
        ]
      },
      disableLog: false,
      displayDuration: true,
      durationInMS: true,
      openReportInBrowser: true,
      jsonOutputPath: './reports/json',
      reportName: 'Briq - Automated tests',
      reportPath: './reports/html'
    }
  }],
  onPrepare() {
    require('ts-node').register({
        project: require('path').join('./tsconfig.e2e.json')
    })
  }
};