import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {HttpClientModule} from '@angular/common/http';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { SignupworkerComponent } from './signupworker/signupworker.component';
import { ShowcatComponent } from './showcat/showcat.component';
import { ShowsubcatComponent } from './showsubcat/showsubcat.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AddcityComponent } from './addcity/addcity.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { WorkerComponent } from './worker/worker.component';
import { EmpdetailsComponent } from './empdetails/empdetails.component';
import { ShowempComponent } from './showemp/showemp.component';
import { AddcartComponent } from './addcart/addcart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { UpdatestatusComponent } from './updatestatus/updatestatus.component';
import { AllordersComponent } from './allorders/allorders.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { SearchworkerComponent } from './searchworker/searchworker.component';
import { UserlistComponent } from './userlist/userlist.component';
import { EmplistComponent } from './emplist/emplist.component';
import { LoginworkerComponent } from './loginworker/loginworker.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    AddcategoryComponent,
    SignupworkerComponent,
    ShowcatComponent,
    ShowsubcatComponent,
    AdminhomeComponent,
    HomeComponent,
    LogoutComponent,
    ChangepasswordComponent,
    AddcityComponent,
    AddsubcategoryComponent,
    WorkerComponent,
    EmpdetailsComponent,
    ShowempComponent,
    AddcartComponent,
    CheckoutComponent,
    OrdersummaryComponent,
    OrderdetailsComponent,
    OrderhistoryComponent,
    UpdatestatusComponent,
    AllordersComponent,
    AboutComponent,
    ProjectsComponent,
    ContactusComponent,
    SearchuserComponent,
    SearchworkerComponent,
    UserlistComponent,
    EmplistComponent,
    LoginworkerComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
