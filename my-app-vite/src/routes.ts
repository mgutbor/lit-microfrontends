import type { Route } from "@vaadin/router";

export * from "./home";
export * from "./page1";
export * from "./app";

let routes: Route[] | undefined = undefined;

export function getRoutes(baseURL: string = "/"): Route[] {
  if (!routes) {
    routes = [
      {
        path: "/",
        component: "my-app",
        children: [
          { path: "/", component: "my-app-home" },
          { path: "/page1", component: "my-app-page1" },
          {
            path: "/page2",
            children: () =>
              import("myPage/myPage").then((module: any) => {
                return module.getRoutes(baseURL + "page2");
              }),
          },
         {
           path: "/my-vue",
           children: () => import("myVue/myVue").then((module: any) => module.getRoutes(baseURL + 'my-vue'))
         },
         {
           path: "/my-vue-comp",
           children: () => import("myVueComp/myVueComp").then((module: any) => module.getRoutes(baseURL + 'my-vue-comp'))
         }
       ],
      },
    ];
  }

  return routes;
}

export default getRoutes;