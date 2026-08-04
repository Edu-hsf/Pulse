import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    // Example: authentication middleware may attach a user
    user?: { id: string; name: string };
  }

  interface Response {
    // Custom helper used by the app
    sendError(status: number, message: string): this;
  }
}