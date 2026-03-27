import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { initializeApp } from 'firebase/app';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

const firebaseConfig = {
  apiKey: "AIzaSyC5wv2y6NiA6pz7AFloBK__f_PtLnI4SnU",
  authDomain: "pragma-todo.firebaseapp.com",
  projectId: "pragma-todo",
  storageBucket: "pragma-todo.firebasestorage.app",
  messagingSenderId: "574101902412",
  appId: "1:574101902412:web:376e8228c5c1e4ad3850e9",
  measurementId: "G-B09NRX56QS"
};

initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
