"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var error404_component_1 = require("./Component/error404/error404.component");
var home_component_1 = require("./Component/home/home.component");
var login_component_1 = require("./Component/login/login.component");
var registro_component_1 = require("./Component/registro/registro.component");
var auth_guard_1 = require("./guards/auth.guard");
var auth_guard2_1 = require("./guards/auth.guard2");
var routes = [
    { path: "home", component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: "login", component: login_component_1.LoginComponent, canActivate: [auth_guard2_1.AuthLogin] },
    { path: "registro", component: registro_component_1.RegistroComponent, canActivate: [auth_guard2_1.AuthLogin] },
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", component: error404_component_1.Error404Component }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
