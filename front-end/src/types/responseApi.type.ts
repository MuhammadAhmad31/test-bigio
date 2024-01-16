export interface ResponseApi<TData> {
    message: string;
    data: TData;
}

export interface ResponseApiToken<TData> {
    success: string;
    token: string;
}

export interface ResponseApiError {
    message: string;
    errors?: any;
}

export interface ResponseApiSuccess {
    message: string;
    
}