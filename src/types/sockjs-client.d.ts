import "sockjs-client";

declare module "sockjs-client" {
  namespace SockJS {
    interface Options {
      withCredentials?: boolean;
      transportOptions?: Record<string, unknown>;
    }
  }
}

