"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var AuthService = /** @class */ (function () {
    function AuthService(http, jwt) {
        this.http = http;
        this.jwt = jwt;
        this.URL = "http://localhost:8000";
        this.estatus = true;
    }
    AuthService.prototype.login = function (user) {
        return this.http.post(this.URL + "/insize/login", user);
    };
    AuthService.prototype.isAuth = function () {
        var token = localStorage.getItem("color");
        if (token !== null && token !== "sin colores") {
            if (this.jwt.isTokenExpired(token) || localStorage.getItem("color") == "udefined") {
                this.estatus = true;
                return false;
            }
            else {
                this.estatus = false;
                return true;
            }
        }
        return false;
    };
    AuthService.prototype.decodifica = function () {
        var token = localStorage.getItem("color");
        var cod = jwt_decode_1["default"](token);
        return cod;
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
