import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { SearchComponent } from './search/search.component';
import { ContactusComponent } from './contactus/contactus.component'; 
import { LoginComponent } from './login/login.component';

export const routes: Routes = [



     { path:'home', component : HomeComponent },
     { path:'booking', component : BookingComponent },
     { path:'contactus', component : ContactusComponent },
     { path:'search', component : SearchComponent },
     { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
