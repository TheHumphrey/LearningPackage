export interface IUsuario {
  id: number;
  login: string;
  password?: string;
  empresa?: number;
}

export interface IUsuarioAutenticado {
  sessao: string;
  usuario: IUsuario;
  accessToken: string;
  refreshToken: string;
}

export interface ISessao {
  id: string;
  refreshToken: string;
  createdAt: string;
  client: number;
  usuario: number;
  platform: string;
  os: string;
  buildNumber: string;
  revoked: boolean;
}
