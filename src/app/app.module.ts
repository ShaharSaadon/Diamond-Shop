import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { DiamondIndexComponent } from './views/diamond-index/diamond-index.component';
import { DiamondListComponent } from './cmps/diamond-list/diamond-list.component';
import { DiamondPreviewComponent } from './cmps/diamond-preview/diamond-preview.component';
import { ContactPageComponent } from './views/contact-page/contact-page.component';
import { StatisticsComponent } from './views/statistics/statistics.component';
import { HttpClientModule } from '@angular/common/http';
import { MainHeaderComponent } from './cmps/main-header/main-header.component';
import { DiamondFilterComponent } from './cmps/diamond-filter/diamond-filter.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DiamondDetailsComponent } from './views/diamond-details/diamond-details.component';
import { DiamondEditComponent } from './views/diamond-edit/diamond-edit.component';
import { SignupComponent } from './views/signup-template-driven/signup.template.driven.component';
import { SignupModelDrivenComponent } from './views/signup-model-driven/signup-model-driven.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LoaderComponent } from './cmps/loader/loader.component';
import { ShoppingCartComponent } from './views/shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    AppComponent, 
    DiamondIndexComponent,
    DiamondListComponent,
    DiamondPreviewComponent,
    ContactPageComponent,
    StatisticsComponent,
    MainHeaderComponent,
    DiamondFilterComponent,
    DiamondDetailsComponent,
    DiamondEditComponent,
    SignupComponent,
    SignupModelDrivenComponent,
    HomePageComponent,
    LoaderComponent,
    ShoppingCartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
