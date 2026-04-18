# Guía de despliegue en Vercel: Host y Microfrontends

Esta guía describe cómo desplegar los microfrontends (MFEs) y el host en Vercel, usando Lit + Vite y Module Federation (ESM) con estrategia same-origin mediante rewrites.

## 1) Estructura y componentes

- Host Vite: `my-app-vite` (Lit + Vaadin Router)
- MFEs:
  - `my-page` (Lit)
  - `my-vue` (Vue 3, expuesto como Web Component + rutas internas)
  - `my-vue-comp` (Vue 3, componentes Vue como Web Components)

## 2) Despliegue de MFEs en Vercel

Para cada MFE crea un proyecto independiente en Vercel (Monorepo):

- Root Directory: la carpeta del MFE (`my-page`, `my-vue`, `my-vue-comp`)
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`
- Archivo `vercel.json` dentro de cada MFE ya configurado con:
  - `headers`: `Cache-Control: no-store` para `/assets/remoteEntry.js` (y `/remoteEntry.js`)
  - `rewrites`: SPA fallback a `/index.html`

Dominios de Producción usados (ya configurados en el host):

- my-page: https://my-page-eta-ten.vercel.app/
- my-vue: https://my-vue-gamma.vercel.app/
- my-vue-comp: https://my-vue-comp.vercel.app/

## 3) Despliegue del host de Producción (my-app-vite)

Config del proyecto en Vercel:

- Root Directory: `my-app-vite`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output: `dist`

El archivo `my-app-vite/vercel.json` incluye:

- Rewrites a los MFEs en producción (same-origin):
  - `/app/my-page/(.*)` → `https://my-page-eta-ten.vercel.app/$1`
  - `/app/my-vue/(.*)` → `https://my-vue-gamma.vercel.app/$1`
  - `/app/my-vue-comp/(.*)` → `https://my-vue-comp.vercel.app/$1`
- Fallback SPA: `/(.*)` → `/index.html`
- Cabeceras de seguridad (HSTS, XCTO, XFO, Referrer-Policy, Permissions-Policy)
- CSP que permite script/connect a los dominios MFE
- Caché: `/index.html` no-cache; `/assets/*` immutable 1 año

Remotes configurados en `my-app-vite/vite.config.ts`:

- `myPage: "/app/my-page/assets/remoteEntry.js"`
- `myVue: "/app/my-vue/assets/remoteEntry.js"`
- `myVueComp: "/app/my-vue-comp/assets/remoteEntry.js"`

Rutas en `my-app-vite/src/routes.ts`:

- `/page2` → `myPage.getRoutes(baseURL + 'page2')`
- `/my-vue` → `myVue.getRoutes(baseURL + 'my-vue')`
- `/my-vue-comp` → `myVueComp.getRoutes(baseURL + 'my-vue-comp')`

Navbar en `my-app-vite/src/app.ts`:

- Añadido enlace visible a `My Vue Comp`

### Validación post-deploy

1. Abrir `/page2`, `/my-vue`, `/my-vue-comp` en el dominio del host.
2. Refrescar deep-links (p.ej. `/page2/sub-page2` o `/my-vue/hello`) → deben cargar gracias al fallback SPA.
3. Forzar redeploy de un MFE → el host refleja cambios (por `no-store` en `remoteEntry.js`).

## 4) Proyecto adicional "host-preview"

Objetivo: un segundo proyecto de Vercel para el host que apunte a los dominios de Preview de los MFEs.

Reto: los dominios Preview de Vercel cambian por commit/branch. Para operar de forma simple, recomendamos:

- Fijar alias estables de Preview por proyecto de MFE (por rama) o
- Actualizar manualmente los destinos tras cada deploy Preview.

En el repo hemos añadido `my-app-vite/preview.vercel.json` con placeholders:

- `/app/my-page/(.*)` → `https://<PREVIEW_MY_PAGE_DOMAIN>/$1`
- `/app/my-vue/(.*)` → `https://<PREVIEW_MY_VUE_DOMAIN>/$1`
- `/app/my-vue-comp/(.*)` → `https://<PREVIEW_MY_VUE_COMP_DOMAIN>/$1`
- Fallback SPA y mismos headers de seguridad/caché/CSP

Cómo usarlo en un proyecto Vercel separado ("host-preview"):

1. Crea un nuevo proyecto apuntando también a `my-app-vite`.
2. En "Build & Development Settings":
   - Install Command: `npm ci`
   - Build Command: `cp preview.vercel.json vercel.json && npm run build`
   - Output Directory: `dist`
3. Antes de cada despliegue Preview, edita `preview.vercel.json` y sustituye:
   - `<PREVIEW_MY_PAGE_DOMAIN>`, `<PREVIEW_MY_VUE_DOMAIN>`, `<PREVIEW_MY_VUE_COMP_DOMAIN>`
     por los dominios Preview actuales de cada MFE (sin la ruta final), p.ej.
   - `my-page-eta-ten-git-feature-x-username.vercel.app`

Alternativa avanzada:

- Implementar Edge Middleware para leer variables de entorno y construir dinámicamente los destinos de rewrites por rama. Requiere un pequeño handler en `middleware.ts` y pasar env vars `PREVIEW_*`.

## 5) Desarrollo local (Dev)

- `my-page`: `npm run dev` (3000)
- `my-vue`: `npm run dev` (3001)
- `my-vue-comp`: `npm run dev` (3002)
- `my-app-vite`: `npm run start`

El host Vite proxya a los MFEs en dev para resolver los remotes. Si quieres proxy también para `my-vue-comp` en local, añade en `vite.config.ts`:

```ts
"/app/my-vue-comp": { target: "http://localhost:3002", rewrite: p => p.replace(/^\/app\/my-vue-comp/, "") }
```

## 6) Problemas conocidos

- 404 al refrescar en subrutas → falta fallback SPA en `vercel.json` del host.
- Carga estancada tras redeploy MFE → asegurar `Cache-Control: no-store` en `/assets/remoteEntry.js` del MFE.
- CORS/ CSP → con rewrites no debería haber CORS. Si añades orígenes absolutos, actualiza CSP del host.
- `children` de Vaadin Router en remoto devuelve `undefined` → asegúrate de que cada MFE implementa `getRoutes` devolviendo un array con al menos una ruta raíz.
