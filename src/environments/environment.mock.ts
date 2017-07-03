// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  idleSeconds: 300, // time in seconds before the browser triggers warning for inactivity
  idleCountdownSeconds: 10, // time in seconds that browser gives user to respond to inactivity warning
  hmr: true,
  apiBaseUrl : 'http://localhost:51765/',
  idServer : 'http://localhost:44343/identity/',
  useMock : true,
};
