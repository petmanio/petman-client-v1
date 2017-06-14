// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:1337',
  // apiEndpoint: 'https://petman.io',
  fb: {
    appId: '782744788540027',
    scope: 'public_profile,email'
  },
  mapApiKey: 'AIzaSyCjMDwYXmx_jeTJ2Ha2rM7_V2YBxcA7Gv4',
  gaId: ''
};
