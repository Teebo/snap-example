import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { OurServicesComponent } from './views/our-services/our-services.component';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
import { CareersComponent } from './views/careers/careers.component';
import { CareerDetailComponent } from './views/career-detail/career-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavigationComponent,
    FooterComponent,
    OurServicesComponent,
    ContactUsComponent,
    CareersComponent,
    CareerDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
