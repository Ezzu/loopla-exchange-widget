import { Request, Response, NextFunction } from 'express';

export const validateBaseCurrency = (req: Request, res: Response, next: NextFunction): void => {
  const baseCurrency = req.query.base as string | undefined;

  if (baseCurrency && !/^[A-Z]{3}$/.test(baseCurrency)) {
    res.status(400).json({
      error: 'Base currency must be a 3-letter ISO code (e.g., USD, EUR, GBP)'
    });

    return;
  }

  next();
};