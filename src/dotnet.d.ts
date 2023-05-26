export interface DotnetHelper {
  invokeMethodAsync(identifier: string, ...args: unknown[]): unknown;
}
