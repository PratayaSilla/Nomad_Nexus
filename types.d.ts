import { Connection } from "mongoose";

declare global {
  var mongoose: {
    connection: Connection | null;
    promise: Promise<Connection> | null;
  };
}

declare module "next-auth" {
  interface User {
    _id?: string;
  }
  interface Session {
    user?: User;
  }
}

export {};