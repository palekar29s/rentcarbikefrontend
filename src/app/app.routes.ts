import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { SearchComponent } from './search/search.component';
import { ContactusComponent } from './contactus/contactus.component'; 
import { LoginComponent } from './login/login.component';
import { BookingvehicleComponent } from './bookingvehicle/bookingvehicle.component';
import { VehicleindetailComponent } from './vehicleindetail/vehicleindetail.component';
import { PaymentComponent } from './payment/payment.component';
import { authGuard } from './auth.guard';
import { SuccessbookingComponent } from './successbooking/successbooking.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { RegisterComponent } from './register/register.component';
import { AddvehicleComponent } from './addvehicle/addvehicle.component';

export const routes: Routes = [



     { path:'home', component : HomeComponent },
     { path:'booking', component : BookingComponent },
     { path:'contactus', component : ContactusComponent },
     { path:'search', component : SearchComponent },
     { path: 'login', component: LoginComponent },
  { path: 'bookingvehicle', component: BookingvehicleComponent },

  
{ path: 'vehicleindet', component: VehicleindetailComponent },
{ path: 'payment', component: PaymentComponent },

{ path: 'addvehicle', component: AddvehicleComponent },


{ path: 'vehicle/:id', component: VehicleindetailComponent },

{
  path: 'home',
  component: HomeComponent,
  canActivate: [authGuard] // 🔐 THIS is auth guard
},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {path:'success',component:SuccessbookingComponent},

  {path:'register',component:RegisterComponent},

  

   {path:'bookinghis',component:BookinghistoryComponent}
];
