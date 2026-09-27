import 'express-serve-static-core';
import { UserPayload } from './user';

declare module 'express-serve-static-core' {
  interface Request {
    // Example: authentication middleware may attach a user
    user?: UserPayload;
  }

  interface Response {
    // Custom helper used by the app
    sendError(status: number, message: string): this;
  }
}