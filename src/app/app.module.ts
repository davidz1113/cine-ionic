import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserServices } from './servicios/user.services';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { EstrellasComponent } from './componentes/estrellas.component';
import { ComentariosPage } from '../pages/comentarios/comentarios';
import { ComentariosServices } from './servicios/comentarios.services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    EstrellasComponent,
    ComentariosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    ComentariosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserServices,
    ComentariosServices,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
