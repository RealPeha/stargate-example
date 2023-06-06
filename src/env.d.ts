export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRIVATE_KEY: string;
    }
  }
}
