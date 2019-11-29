import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectcityComponent } from './selectcity/selectcity.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductcatalogueComponent } from './productcatalogue/productcatalogue.component';
import { AdvertiseComponent } from './advertise/advertise.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { CartitemComponent } from './cartitem/cartitem.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { InteractionService } from './interaction.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartverifyComponent } from './cartverify/cartverify.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HttpClientModule } from '@angular/common/http';
import { Advertise1Component } from './advertise1/advertise1.component';
import { Advertise2Component } from './advertise2/advertise2.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
   RoutingComponent,
   CheckoutComponent,
   CartverifyComponent,
   ForgotpasswordComponent,
   Advertise1Component,
   Advertise2Component,
   DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxImageZoomModule.forRoot(),
    FormsModule,ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [InteractionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
