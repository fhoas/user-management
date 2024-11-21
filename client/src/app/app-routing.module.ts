import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { PostComponent } from './components/post/post.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/sign-up/signup.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  {
    path: 'user/view/:id',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/new',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/:userId/posts',
    component: PostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/edit/:id',
    component: PostEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-new-user',
    component: NewUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },

  { path: 'user/:userId/new-post', component: NewPostComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
