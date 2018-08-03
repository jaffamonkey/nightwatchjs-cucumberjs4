const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver')

require('nightwatch-cucumber')({
    cucumberArgs: [
            '--require', 'step-definitions', 
            '--require', 'support', 
            '--require', 'page_objects', 
            '-- --tag', 'ci',
            '--format', 'node_modules/cucumber-pretty', 
            '--format', 'json:reports/cucumber.json', 
            'features'
        ]
})

module.exports = {
    output_folder: 'reports',
    custom_assertions_path: 'step-definitions/assertions',
    page_objects_path: 'step-definitions/page_objects',
    globals_path : 'step-definitions/globals/globalModules.js',
    live_output: false,
    disable_colors: false,
    selenium: {
        start_process: true,
        server_path: seleniumServer.path,
        log_path: '',
        host: '127.0.0.1',
        port: 4444
    },
    test_settings: {
      default: {
          launch_url: 'http://google.com',
          selenium_port: 4444,
          // selenium_host: 'localhost',
          screenshots : {
              enabled : true,
              on_failure : true,
              path: 'reports/screenshots'
          },
          desiredCapabilities: {
              browserName: 'chrome',
              chromeOptions : {
                  binary: '/usr/bin/google-chrome',
                  args: ['--headless', '--no-sandbox', '--disable-gpu', '--window-size=1280,1280'],
              },
              javascriptEnabled: true,
              acceptSslCerts: true
          },
          selenium: {
              cli_args: {
                  'webdriver.chrome.driver': chromedriver.path
              }
          }
      },
      firefox: {
          desiredCapabilities: {
              browserName: 'firefox',
              javascriptEnabled: true,
              acceptSslCerts: true
          }
      },
    
      ios: {
          desiredCapabilities : {
              browserName : 'Safari',
              platformName : 'iOS',
              platformVersion : '11.2',
              deviceName : 'iPad Air 2',
              noReset: true
          }
        },
    
       headless: {
          desiredCapabilities: {
            browserName: 'chrome',
            javascriptEnabled: true,
            acceptSslCerts: true,
            chromeOptions : {
              args : ['headless, no-sandbox, disable-gpu']
            }
          }
        }
      }
}
