export interface DotnetHelper {
  invokeMethodAsync(identifier: string, ...args: unknown[]): unknown;
}

export interface MSBlazor {
  start(opts: unknown): Promise<unknown>;
  navigateTo(location: string, reload?: boolean, replace?: boolean): void;

  rootComponents: {
    add<T extends HTMLElement>(
      el: T | null,
      elName: string,
      props: Record<string, unknown>
    ): Promise<MountResult>;
  };
}

declare global {
  interface MountResult {
    dispose(): void;
  }

  const Blazor: MSBlazor;
}
