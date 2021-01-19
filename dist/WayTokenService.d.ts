import { IUsuarioAutenticado } from "./WayModels";
declare class WayTokenService {
    getAccessToken(): string;
    setAccessToken(accessToken: string): void;
    clearTokens(): void;
    getRefreshToken(): string;
    setRefreshToken(refreshToken: any): void;
    getUsuarioAutenticado(): IUsuarioAutenticado;
    setUsuarioAutenticado(user: IUsuarioAutenticado): void;
}
export default WayTokenService;
