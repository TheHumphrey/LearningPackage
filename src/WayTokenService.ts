import { IUsuarioAutenticado } from "./WayModels";

class WayTokenService {
  getAccessToken(): string {
    const { token } = JSON.parse(
      localStorage.getItem("accessToken") || '{"token":""}'
    );
    return token;
  }

  setAccessToken(accessToken: string): void {
    localStorage.setItem(
      "accessToken",
      JSON.stringify({ accessToken: accessToken })
    );
  }

  clearTokens(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  getRefreshToken(): string {
    const { refreshToken } = JSON.parse(
      localStorage.getItem("refreshToken") || '{"refreshToken":""}'
    );
    return refreshToken;
  }

  setRefreshToken(refreshToken): void {
    localStorage.setItem(
      "refreshToken",
      JSON.stringify({ refreshToken: refreshToken })
    );
  }

  getUsuarioAutenticado(): IUsuarioAutenticado {
    const user = JSON.parse(
      localStorage.getItem("user") ||
        '{"user":"{"accessToken: "", "refreshToken":"", "sessao": "", "usuario": "{"id": 0, "login": ""}""}"}'
    );
    return user;
  }

  setUsuarioAutenticado(user: IUsuarioAutenticado): void {
    localStorage.setItem("user", JSON.stringify({ user: user }));
  }
}

export default WayTokenService;
