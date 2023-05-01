import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiamondIndexComponent } from './views/diamond-index/diamond-index.component';
import { ContactPageComponent } from './views/contact-page/contact-page.component';
import { StatisticsComponent } from './views/statistics/statistics.component';
import { DiamondDetailsComponent } from './views/diamond-details/diamond-details.component';
import { DiamondEditComponent } from './views/diamond-edit/diamond-edit.component';
import { diamondResolver } from './services/diamond.resolver';
import { authGuard } from './guards/auth-guard';
import { SignupModelDrivenComponent } from './views/signup-model-driven/signup-model-driven.component';
import { HomePageComponent } from './views/home-page/home-page.component';
const routes: Routes = [
  // { path: '', redirectTo:'diamonds', pathMatch: 'full' },
  {
    path: 'diamond/:id',
    component: DiamondDetailsComponent,
    resolve: { diamond: diamondResolver },
  },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: '', component: HomePageComponent },
  {
    path: 'diamonds', component: DiamondIndexComponent, children:
      [{ path: 'edit/:id', component: DiamondEditComponent, 
      resolve: { diamond: diamondResolver },
      canActivate: [authGuard]
    },
      { path: 'edit', component: DiamondEditComponent }],
  },
  {
    path:'signup',component:SignupModelDrivenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
