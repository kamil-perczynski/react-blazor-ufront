import React, { createRef, useEffect, useRef } from "react";
import { Router } from "@remix-run/router";

const loadedBlazors: string[] = [];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  url: string;
  router: Router;
  stylesheets: string[];
}

declare global {
  interface MountResult {
    dispose(): void;
  }

  interface MSBlazor {
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
  const Blazor: MSBlazor;
}

const _Parcel: React.FC<Props> = (props) => {
  const { url, stylesheets, router } = props;

  const rootRef = createRef<HTMLDivElement>();
  const blazorMountRef = useRef<MountResult>();

  useEffect(() => {
    if (loadedBlazors.includes(url)) {
      return;
    }
    const scriptEl = document.createElement("script");
    scriptEl.src = url;
    scriptEl.setAttribute("autostart", "false");
    document.head.appendChild(scriptEl);

    const stylesheetsEls = toStylesheetEls(stylesheets, url);

    stylesheetsEls.forEach((el) => document.head.appendChild(el));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (!blazorMountRef.current) {
      const blazorAwaiter = awaitBlazorIsPresent();

      const blazorMount = blazorAwaiter.then(async () => {
        if (!loadedBlazors.includes(url)) {
          await Blazor.start({
            loadBootResource: function (type: string, name: string) {
              console.debug(type, name);
              return url.replace("blazor.webassembly.js", name);
            },
          });

          loadedBlazors.push(url);
        }

        return Blazor.rootComponents.add(rootRef.current, "blazor-ufront", {});
      });

      blazorMount.then((mountResult) => {
        blazorMountRef.current = mountResult;
      });
    }
    return () => {
      blazorMountRef.current?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    let count = false;

    const unsubscribe = router.subscribe((routerState) => {
      if (routerState.historyAction === "POP") {
        if (!count) {
          history.back();
          count = true;
        } else {
          count = false;
        }

        return;
      }

      Blazor.navigateTo(routerState.location.pathname, false, false);
    });

    return unsubscribe;
  }, [router]);

  return <div style={{ width: "100%" }} ref={rootRef} />;
};

export const Parcel = React.memo(_Parcel);

function toStylesheetEls(stylesheets: string[], url: string) {
  return stylesheets.map((sheet) => {
    const styleEl = document.createElement("link");
    styleEl.rel = "stylesheet";
    styleEl.href = `${url.replace("_framework/blazor.webassembly.js", sheet)}`;

    return styleEl;
  });
}

function awaitBlazorIsPresent(): Promise<MSBlazor> {
  return new Promise((resolve) => {
    try {
      const intervalId = setInterval(async () => {
        Blazor;
        clearInterval(intervalId);

        resolve(Blazor);
      }, 100);
    } catch (err) {
      console.log("Blazor not defined");
    }
  });
}
