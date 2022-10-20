"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, router, app) {
        this.auth = auth;
        this.router = router;
        this.app = app;
        this.titulo = "Acceso al sistema";
        this.usuario = {
            "nombre": "",
            "pass": ""
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.Acceso = function () {
        var _this = this;
        if (this.usuario.nombre !== "") {
            this.auth.login(this.usuario).subscribe(function (res) {
                localStorage.setItem('color', res.token);
                _this.app.visibleLoginRegistro();
                _this.router.navigate(['/home']);
            });
        }
        else {
            localStorage.setItem('color', 'sin colores');
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
