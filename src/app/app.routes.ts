import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { SearchComponent } from './search/search.component';
import { ContactusComponent } from './contactus/contactus.component'; 
import { LoginComponent } from './login/login.component';
import { BookingvehicleComponent } from './bookingvehicle/bookingvehicle.component';
import { VehicleindetailComponent } from './vehicleindetail/vehicleindetail.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [



     { path:'home', component : HomeComponent },
     { path:'booking', component : BookingComponent },
     { path:'contactus', component : ContactusComponent },
     { path:'search', component : SearchComponent },
     { path: 'login', component: LoginComponent },
  { path: 'bookingvehicle', component: BookingvehicleComponent },

  
{ path: 'vehicleindet', component: VehicleindetailComponent },
{ path: 'payment', component: PaymentComponent },

{ path: 'vehicle/:id', component: VehicleindetailComponent },


  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
