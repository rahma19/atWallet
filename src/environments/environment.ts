// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // url: "http://10.12.113.152:15239"

  urlIam: 'http://196.203.219.35:15201/Account',
  url: 'http://196.203.219.35:15203',
  urlCompte: 'http://196.203.219.35:15214/Compte',
  urlPay: 'http://196.203.219.35:15236/Paiement',
  urlTransa: 'http://196.203.219.35:15238/Transaction',
  urlProf: 'http://196.203.219.35:15214/Compte'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
