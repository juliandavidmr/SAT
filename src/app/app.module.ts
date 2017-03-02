import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

/* Pages */
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EstacioneDetallePage } from '../pages/estacione-detalle/estacione-detalle';
import { EstacionesPage } from '../pages/estaciones/estaciones';
import { LoginPage } from '../pages/login/login';
import { MapaPage } from '../pages/mapa/mapa';
import { SensoresPage } from '../pages/sensores/sensores';
import { SensorDetallePage } from '../pages/sensor-detalle/sensor-detalle';

/* Providers */
import { AuthService } from '../providers/auth-service';
import { ServiceDatos } from '../providers/service-datos';
import { ServiceEstaciones } from '../providers/service-estaciones';
import { ServiceSensores } from '../providers/service-sensores';
import { Load } from '../providers/load';
import { DateMethod } from '../providers/date';

/* Components */
import { ParallaxHeader } from '../components/parallax-header/parallax-header';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    EstacioneDetallePage,
    EstacionesPage,
    LoginPage,
    ParallaxHeader,
    MapaPage,
    SensoresPage,
    SensorDetallePage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Atras',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'top',
      pageTransition: 'ios'
    }, {}
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    EstacioneDetallePage,
    EstacionesPage,
    LoginPage,
    MapaPage,
    SensoresPage,
    SensorDetallePage
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  },
    AuthService,
    ServiceDatos,
    ServiceEstaciones,
    ServiceSensores,
    Load,
    DateMethod
  ]
})
export class AppModule { }
