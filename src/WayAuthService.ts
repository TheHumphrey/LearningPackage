import * as Bowser from "bowser";

import WayTokenService from "./WayTokenService";

import { IUsuarioAutenticado } from "./WayModels";

class WayAuthService {
  urlAuth = "";
  constructor(urlAuth: string) {
    this.urlAuth = urlAuth;
  }
  login = "/v1/login";
  logOut = "/v1/sessao/revoke";
  loginExist = "/v1/accesstoken/validate";
  renewurl = "/v1/accesstoken/renew";

  storageService = new WayTokenService();

  async signInWithUsernameAndPassord(
    email: string,
    password: string
  ): Promise<any> {
    const browser = Bowser.getParser(window.navigator.userAgent);

    const user = {
      email: email,
      password: password,
      platform: browser.getBrowserName(),
      os: browser.getOSName(),
      buildNumber: "1",
      Client: "WebGestorWay",
    };

    return await fetch(this.urlAuth + this.login, {
      method: "POST",
      body: JSON.stringify(user),
      mode: "cors",
    })
      .then((response) => {
        if (response.status == 201) {
          response.json().then((data) => {
            const {
              accessToken,
              refreshToken,
              usuario,
            }: IUsuarioAutenticado = data;
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
  }

  async signOut() {
    const token = this.storageService.getAccessToken();
    await fetch(this.urlAuth + this.logOut, {
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
  }

  async loginExists(login: string) {
    await fetch(this.urlAuth + this.loginExist, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  setEmpresa(empresa) {}

  async renew() {
    const refreshToken = this.storageService.getRefreshToken();

    await fetch(this.urlAuth + this.renewurl, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ refreshToken: refreshToken }),
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            const { accessToken, refreshToken }: IUsuarioAutenticado = data;
            this.storageService.setAccessToken(accessToken);
            this.storageService.setRefreshToken(refreshToken);
          });
          return response.ok;
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export default WayAuthService;
