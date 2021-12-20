// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlIam: 'http://10.12.113.152:15201/Account',
  url: 'http://10.12.113.152:15203', //'http://192.168.3.16:1001', //'http://10.12.113.152:15201',
  urlCompte: 'http://10.12.113.152:15214/api/Compte', //'http://10.12.113.152:15270/api/Compte',
  urlPay: 'http://10.12.113.152:15236/api/Paiement', //'http://192.168.3.16:2001/api/Paiement', //'http://10.12.113.152:15272/api/Paiement',
  urlTransa: 'http://10.12.113.152:15238/api/Transaction', //'http://10.12.113.152:15271/api/Transaction',
  urlProf: 'http://10.12.113.152:15214/api/Compte' //'http://192.168.3.16:2012/api/Compte' //"http://10.12.113.152:15270/api/Compte"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
