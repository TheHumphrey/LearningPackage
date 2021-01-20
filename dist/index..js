"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bowser = require("bowser");
const WayTokenService_1 = require("./WayTokenService");
class WayAuthService {
    constructor(urlAuth) {
        this.urlAuth = "";
        this.login = "/v1/login";
        this.logOut = "/v1/sessao/revoke";
        this.loginExist = "/v1/accesstoken/validate";
        this.renewurl = "/v1/accesstoken/renew";
        this.storageService = new WayTokenService_1.default();
        this.urlAuth = urlAuth;
    }
    signInWithUsernameAndPassord(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = Bowser.getParser(window.navigator.userAgent);
            const user = {
                email: email,
                password: password,
                platform: browser.getBrowserName(),
                os: browser.getOSName(),
                buildNumber: "1",
                Client: "WebGestorWay",
            };
            return yield fetch(this.urlAuth + this.login, {
                method: "POST",
                body: JSON.stringify(user),
                mode: "cors",
            })
                .then((response) => {
                if (response.status == 201) {
                    response.json().then((data) => {
                        const { accessToken, refreshToken, usuario, } = data;
                        this.storageService.setAccessToken(accessToken);
                        this.storageService.setRefreshToken(refreshToken);
                        this.storageService.setUsuarioAutenticado(data);
                        this.setEmpresa(usuario.empresa);
                    });
                }
                return response.json();
            })
                .catch((error) => {
                return Promise.reject(error);
            });
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.storageService.getAccessToken();
            yield fetch(this.urlAuth + this.logOut, {
                method: "PUT",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                if (response.status == 200) {
                    this.storageService.clearTokens();
                }
            })
                .catch((error) => {
                return Promise.reject(error);
            });
        });
    }
    loginExists(login) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(this.urlAuth + this.loginExist, {
                method: "GET",
                mode: "cors",
            })
                .then((response) => {
                return response.json();
            })
                .catch((error) => {
                return Promise.reject(error);
            });
        });
    }
    setEmpresa(empresa) { }
    renew() {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = this.storageService.getRefreshToken();
            yield fetch(this.urlAuth + this.renewurl, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify({ refreshToken: refreshToken }),
            })
                .then((response) => {
                if (response.status == 200) {
                    response.json().then((data) => {
                        const { accessToken, refreshToken } = data;
                        this.storageService.setAccessToken(accessToken);
                        this.storageService.setRefreshToken(refreshToken);
                    });
                    return response.ok;
                }
            })
                .catch((error) => {
                return Promise.reject(error);
            });
        });
    }
}
exports.default = WayAuthService;
