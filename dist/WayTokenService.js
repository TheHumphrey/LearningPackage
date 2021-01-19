"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WayTokenService {
    getAccessToken() {
        const { token } = JSON.parse(localStorage.getItem("accessToken") || '{"token":""}');
        return token;
    }
    setAccessToken(accessToken) {
        localStorage.setItem("accessToken", JSON.stringify({ accessToken: accessToken }));
    }
    clearTokens() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    }
    getRefreshToken() {
        const { refreshToken } = JSON.parse(localStorage.getItem("refreshToken") || '{"refreshToken":""}');
        return refreshToken;
    }
    setRefreshToken(refreshToken) {
        localStorage.setItem("refreshToken", JSON.stringify({ refreshToken: refreshToken }));
    }
    getUsuarioAutenticado() {
        const user = JSON.parse(localStorage.getItem("user") ||
            '{"user":"{"accessToken: "", "refreshToken":"", "sessao": "", "usuario": "{"id": 0, "login": ""}""}"}');
        return user;
    }
    setUsuarioAutenticado(user) {
        localStorage.setItem("user", JSON.stringify({ user: user }));
    }
}
exports.default = WayTokenService;
