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
import { ResumenPage } from '../pages/resumen/resumen'

/* Providers */
import { ServiceDatos } from '../providers/service-datos';
import { ServiceEstaciones } from '../providers/service-estaciones';
import { ServiceSensores } from '../providers/service-sensores';
import { Load } from '../providers/load';
import { DateMethod } from '../providers/date';
import { Watchdog } from '../providers/watchdog';
import { Notif } from '../providers/notif';

/* Components */
import { ParallaxHeader } from '../components/parallax-header/parallax-header';

import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from 'ionic-native';

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
    SensorDetallePage,
    ResumenPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Atras',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'top',
      pageTransition: 'ios'
    }),
    IonicStorageModule.forRoot()
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
    SensorDetallePage,
    ResumenPage
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  },
    ServiceDatos,
    ServiceEstaciones,
    ServiceSensores,
    Load,
    DateMethod,
    IonicStorageModule,
    Watchdog,
    LocalNotifications,
    Notif
  ]
})
export class AppModule { }
