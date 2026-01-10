// Success Response (what BE returns on success)
export interface ExchangeRatesResponse {
  success: true;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

// Error Response (what BE returns on error)
export interface ApiErrorResponse {
  error: {
    message: string;
    code?: string;
  };
}
