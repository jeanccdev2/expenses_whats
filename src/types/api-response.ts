export type ApiResponse<T> = {
  status: number;
  data: {
    status: number;
    message: string;
    response?: T | null;
  };
};

export type StandardApiResponse = {
  status: number;
  data: {
    status: number;
    message: string;
    response?: any;
  };
};
