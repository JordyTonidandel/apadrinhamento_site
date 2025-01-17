import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminLayoutComponent } from './pages/admin/admin-layout';
import { ConfigurationComponent } from './pages/admin/configuration/configuration.component';
import { CompaniesComponent } from './pages/admin/companies/companies.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UnauthorizedComponent } from './pages/error/unauthorized/unauthorized.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'configuracoes', component: ConfigurationComponent },
      { path: 'empresas', component: CompaniesComponent },
      { path: 'usuarios', component: UsersComponent },
    ],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' },
];
