export interface ApiSuccess<T = any> {
    message: string;
    success: true;
    data: T;
    statusCode: number;
  }
  
  export interface ApiError {
    message: string;
    error: string;
    statusCode: number;
  }