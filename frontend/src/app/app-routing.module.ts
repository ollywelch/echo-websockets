import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { authGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'chats',
    loadChildren: () => import('./chats/chats.module').then((m) => m.ChatsModule),
    canActivate: [authGuard]
  },
  // { path: 'messages', component: MessagesComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: 'chats' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
