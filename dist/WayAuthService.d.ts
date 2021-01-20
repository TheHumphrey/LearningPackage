import WayTokenService from "./WayTokenService";
declare class WayAuthService {
    urlAuth: string;
    constructor(urlAuth: string);
    login: string;
    logOut: string;
    loginExist: string;
    validateToken: string;
    renewurl: string;
    storageService: WayTokenService;
    signInWithUsernameAndPassord(email: string, password: string): Promise<any>;
    signOut(): Promise<void>;
    loginExists(login: string): Promise<void>;
    setEmpresa(empresa: any): void;
    renew(): Promise<void>;
}
export default WayAuthService;
