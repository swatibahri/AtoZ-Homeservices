import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
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
import { ShowempComponent } from './showemp/showemp.component';
import { EmpdetailsComponent } from './empdetails/empdetails.component';
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

const routes: Routes = [
  {
    path:"",
    redirectTo:"sitehome",
    pathMatch:"full"
  },
  {
    path: "signup",
    component:SignupComponent
  },
  {
    path: "feedback",
    component:FeedbackComponent
  },
  {
    path: "addcategory",
    component:AddcategoryComponent
  },
  {
    path: "projects.html",
    component:ProjectsComponent
  },
  {
    path: "about.html",
    component:AboutComponent
  },
  {
    path: "signupworker",
    component:SignupworkerComponent
  },
  {
    path: "worker",
    component:WorkerComponent
  },
  {
    path: "loginworker",
    component:LoginworkerComponent
  },
  {
    path: "addcity",
    component:AddcityComponent
  },
  {
    path: "showemp",
    component:ShowempComponent
  },
  {
    path: "orderdetails",
    component:OrderdetailsComponent
  },
  {
    path: "allorders",
    component:AllordersComponent
  },
  {
    path: "updatestatus",
    component:UpdatestatusComponent
  },
  {
    path: "orderhistory",
    component:OrderhistoryComponent
  },
  {
    path: "showcart",
    component:AddcartComponent
  },
  {
    path: "ordersummary",
    component:OrdersummaryComponent
  },
  {
    path: "checkout",
    component:CheckoutComponent
  },
  {
    path: "empdetails",
    component:EmpdetailsComponent
  },
  {
    path: "addsubcat",
    component:AddsubcategoryComponent
  },
  {
    path: "showsubcat",
    component:ShowsubcatComponent
  },
  {
    path: "adminhome",
    component:AdminhomeComponent
  },
  {
    path: "sitehome",
    component:HomeComponent
  },
  {
    path: "logout",
    component:LogoutComponent
  },
  {
    path: "changepassword",
    component:ChangepasswordComponent
  },
  {
    path: "showcategory",
    component:ShowcatComponent
  },
  {
    path: "searchuser",
    component:SearchuserComponent
  },
  {
    path: "searchworker",
    component:SearchworkerComponent
  },
  {
    path: "emplist",
    component:EmplistComponent
  },
  {
    path: "userlist",
    component:UserlistComponent
  },

  {
    path: "contact.html",
    component:ContactusComponent
  },
  {
    path: "login",
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
