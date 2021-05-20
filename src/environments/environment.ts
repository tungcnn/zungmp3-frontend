// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig: {
    apiKey: 'AIzaSyDTvSWVvpKHs1jBgfzaNfcWVXyPrKg-hEY',
    authDomain: 'webmusic-cc387.firebaseapp.com',
    projectId: 'webmusic-cc387',
    databaseUrl: 'https://webmusic-cc387-default-rtdb.asia-southeast1.firebasedatabase.app/',
    storageBucket: 'webmusic-cc387.appspot.com',
    messagingSenderId: '719548485253',
    appId: '1:719548485253:web:277555fcaad1018c1123ec',
    measurementId: 'G-PCYSMHTZ3B'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
