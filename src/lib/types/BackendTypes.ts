export {};

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }
  interface ILogin {
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        access_token: string;
        refresh_token: string;
    }
    
}

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }
  interface IUser {
    id: string;           
    name: string;         
    email: string;     
    role: string;
    token : any     
    accessToken: string;
    refreshToken: string;
  }
}
declare module "next-auth/JWT"{
  interface JWT {
    user: IUser;
    access_token: string;
    refresh_token: string;
    access_expire: number;
    error: string;
    
  }
}
