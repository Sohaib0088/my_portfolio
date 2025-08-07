declare module 'serve-favicon' {
    import { RequestHandler } from 'express';
    function favicon(path: string): RequestHandler;
    export = favicon;
  }
  