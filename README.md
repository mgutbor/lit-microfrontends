# mfe-lit

Este proyecto es una Prueba de Concepto (PoC) de una implementación de arquitectura Micro-Frontend usando la librería Lit, la herramienta de construcción Vite y Module Federation.

## Entorno

- Node.js 18.19.1
- npm 10.2.4

## Inicio Rápido

```bash
# clonar el repositorio en la máquina local
git clone git@github.com:callebedrums/mfe-lit.git

# instalar dependencias
cd ./my-app && npm install && cd ../
cd ./my-page && npm install && cd ../
cd ./my-vue && npm install && cd ../

# ejecutar los siguientes comandos en terminales separadas

cd ./my-app && npm run dev
cd ./my-page && npm run dev
cd ./my-vue && npm run dev
```

## Acerca del Proyecto

### Objetivo Principal

El objetivo principal de una arquitectura Micro-Frontend es dividir la aplicación en aplicaciones más pequeñas e independientes que se empaquetan y montan juntas solo en tiempo de ejecución.

Cada aplicación pequeña se denomina Micro-Frontend (MFE), y el punto de entrada es la Aplicación Host.

En este PoC tenemos una Aplicación Host y Dos MFEs. Estas tres aplicaciones se sirven desde su propio servidor, pero la Aplicación Host implementa un proxy (solo para el entorno de desarrollo local) y simula un despliegue de cada aplicación en su propio sub-path.

La aplicación Host se sirve desde la ruta raíz (`/`), la aplicación _'my-page'_ se sirve desde la ruta `/app/my-page`, mientras que la aplicación _'my-vue'_ se sirve desde la ruta `/app/my-vue`.

### Arquitectura de Routing

Esta implementación particular utiliza la librería `@vaadin/router` para gestionar el sistema de enrutamiento. Consiste en una librería ligera que renderiza web-components para cada ruta configurada.

Es agnóstica de frameworks y espera solo un web-component para ser renderizado. Esto permite que cada MFE elija el framework o librería a utilizar para implementar la aplicación, siempre que implemente un web-component al final.

Esta implementación también utiliza Module Federation para cargar módulos remotos y desacoplar las aplicaciones. De esta manera, una ruta puede ser mapeada a un componente que está implementado en una aplicación remota. Este componente de aplicación se carga de forma asíncrona y se renderiza.

Estos son los MFEs, que también utilizan Module Federation para exponer sus puntos de entrada y exportar el componente a renderizar.

Si la aplicación remota (MFE) también está compuesta por múltiples páginas y/o componentes, puede devolver una configuración de sub-rutas de `@vaadin/router` en su lugar. De esta manera, puede registrar múltiples sub-rutas y múltiples componentes como parte de ella.

## La Aplicación Host

La aplicación Host recupera una lista de las aplicaciones MFE con su ruta de URL para ser montadas en el host, y la configuración remota de entrada:

```json
{
  "path": "/page2",
  "remote": {
    "url": "/app/my-page/assets/remoteEntry.js",
    "scope": "myPage",
    "module": "./myPage",
    "type": "module"
  }
}
```

En el ejemplo anterior, tenemos una aplicación MFE que se montará cuando se acceda a la ruta de URL `/page2`, y la configuración remota para cargarla dinámicamente siguiendo el estándar de Module Federation.

La aplicación host espera que el módulo remoto implemente la función `getComponent` o la función `getRoutes`. Si ambas están implementadas, la función `getComponent` tiene preferencia.

La función `getComponent` debe devolver el nombre de la etiqueta del componente que debe renderizarse como resolución del enrutamiento. Si la función `getComponent` está implementada pero devuelve undefined, la aplicación Host considerará la función `getRoutes` en su lugar.

La función `getRoutes` debe devolver una lista de rutas de `@vaadin/router` para ser renderizadas como sub-rutas de la ruta de la aplicación MFE.

Ambas funciones reciben la ruta actual como argumento baseUrl, para que el MFE sepa en qué sub-ruta se está montando y se configure adecuadamente si es necesario.

## Aplicaciones MFE

La aplicación MFE debe exponer un punto de entrada remoto siguiendo el estándar de Module Federation, y debe implementar la función `getComponent` o la función `getRoutes`.

```typescript
// ejemplo de exportación de getComponents
export * from 'my-component.ts';

/** estableciendo baseUrl como predeterminado en caso de que la app se ejecute fuera de la arquitectura MFE */
export function getComponents(baseUrl: string = '/') {
  // podemos usar el baseUrl para iniciar cualquier servicio interno, o incluso decidir qué componente devolver
  return 'my-component';
}


// ejemplo de exportación de getRoutes
import { Commands, Context, Route } from "@vaadin/router";
export * from 'my-first-component.ts';
export * from 'my-second-component.ts';

let routes: Route[] | undefined = undefined;

export function getRoutes(baseUrl: string = '/') {
  // establecer rutas solo una vez
  if (!routes) {
    routes = [
      {
        path: '/', component: 'my-first-component',
        path: '/second-path', component: 'my-second-component'
      }
    ]
  }

  return routes;
}
```

## Estructura del Proyecto

- La carpeta _/my-app_ contiene la Aplicación Host. Proporciona el diseño inicial y algunas páginas.
- La carpeta _/my-page_ contiene la aplicación Micro-Frontend. Proporciona otras sub-páginas para ser renderizadas en la Aplicación Host.
- La carpeta _/my-vue_ contiene un Micro-Frontend implementado en Vue. Proporciona una sola página.

---

# Guía de Despliegue en Vercel

Esta guía describe cómo desplegar los microfrontends (MFEs) y el host en Vercel, usando Lit + Vite y Module Federation (ESM) con estrategia same-origin mediante rewrites.

## 1) Estructura y Componentes

- Host Vite: `my-app-vite` (Lit + Vaadin Router)
- MFEs:
  - `my-page` (Lit)
  - `my-vue` (Vue 3, expuesto como Web Component + rutas internas)
  - `my-vue-comp` (Vue 3, componentes Vue como Web Components)

## 2) Despliegue de MFEs en Vercel

Para cada MFE crea un proyecto independiente en Vercel (Monorepo):

- **Root Directory:** la carpeta del MFE (`my-page`, `my-vue`, `my-vue-comp`)
- **Install Command:** `npm ci`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Archivo `vercel.json`** dentro de cada MFE ya configurado con:
  - `headers`: `Cache-Control: no-store` para `/assets/remoteEntry.js` (y `/remoteEntry.js`)
  - `rewrites`: SPA fallback a `/index.html`

### Dominios de Producción Usados

Ya configurados en el host:

- **my-page:** https://my-page-eta-ten.vercel.app/
- **my-vue:** https://my-vue-gamma.vercel.app/
- **my-vue-comp:** https://my-vue-comp.vercel.app/

## 3) Despliegue del Host de Producción (my-app-vite)

### Configuración del Proyecto en Vercel

- **Root Directory:** `my-app-vite`
- **Install Command:** `npm ci`
- **Build Command:** `npm run build`
- **Output:** `dist`

### Configuración de `my-app-vite/vercel.json`

El archivo incluye:

- **Rewrites a los MFEs en producción (same-origin):**
  - `/app/my-page/(.*)` → `https://my-page-eta-ten.vercel.app/$1`
  - `/app/my-vue/(.*)` → `https://my-vue-gamma.vercel.app/$1`
  - `/app/my-vue-comp/(.*)` → `https://my-vue-comp.vercel.app/$1`
- **Fallback SPA:** `/(.*)` → `/index.html`
- **Cabeceras de seguridad** (HSTS, XCTO, XFO, Referrer-Policy, Permissions-Policy)
- **CSP** que permite script/connect a los dominios MFE
- **Caché:** `/index.html` no-cache; `/assets/*` immutable 1 año

### Remotes Configurados

En `my-app-vite/vite.config.ts`:

- `myPage: "/app/my-page/assets/remoteEntry.js"`
- `myVue: "/app/my-vue/assets/remoteEntry.js"`
- `myVueComp: "/app/my-vue-comp/assets/remoteEntry.js"`

### Rutas Configuradas

En `my-app-vite/src/routes.ts`:

- `/page2` → `myPage.getRoutes(baseURL + 'page2')`
- `/my-vue` → `myVue.getRoutes(baseURL + 'my-vue')`
- `/my-vue-comp` → `myVueComp.getRoutes(baseURL + 'my-vue-comp')`

### Navbar

En `my-app-vite/src/app.ts`:

- Añadido enlace visible a `My Vue Comp`

### Validación Post-Deploy

1. Abrir `/page2`, `/my-vue`, `/my-vue-comp` en el dominio del host.
2. Refrescar deep-links (p.ej. `/page2/sub-page2` o `/my-vue/hello`) → deben cargar gracias al fallback SPA.
3. Forzar redeploy de un MFE → el host refleja cambios (por `no-store` en `remoteEntry.js`).

## 4) Proyecto Adicional "host-preview"

### Objetivo

Un segundo proyecto de Vercel para el host que apunte a los dominios de Preview de los MFEs.

### Reto

Los dominios Preview de Vercel cambian por commit/branch. Para operar de forma simple, recomendamos:

- Fijar alias estables de Preview por proyecto de MFE (por rama) o
- Actualizar manualmente los destinos tras cada deploy Preview.

### Configuración

En el repo se ha añadido `my-app-vite/preview.vercel.json` con placeholders:

- `/app/my-page/(.*)` → `https://<PREVIEW_MY_PAGE_DOMAIN>/$1`
- `/app/my-vue/(.*)` → `https://<PREVIEW_MY_VUE_DOMAIN>/$1`
- `/app/my-vue-comp/(.*)` → `https://<PREVIEW_MY_VUE_COMP_DOMAIN>/$1`
- Fallback SPA y mismos headers de seguridad/caché/CSP

### Cómo Usarlo en un Proyecto Vercel Separado ("host-preview")

1. Crea un nuevo proyecto apuntando también a `my-app-vite`.
2. En "Build & Development Settings":
   - **Install Command:** `npm ci`
   - **Build Command:** `cp preview.vercel.json vercel.json && npm run build`
   - **Output Directory:** `dist`
3. Antes de cada despliegue Preview, edita `preview.vercel.json` y sustituye:
   - `<PREVIEW_MY_PAGE_DOMAIN>`, `<PREVIEW_MY_VUE_DOMAIN>`, `<PREVIEW_MY_VUE_COMP_DOMAIN>`
     por los dominios Preview actuales de cada MFE (sin la ruta final), p.ej.
   - `my-page-eta-ten-git-feature-x-username.vercel.app`

### Alternativa Avanzada

Implementar Edge Middleware para leer variables de entorno y construir dinámicamente los destinos de rewrites por rama. Requiere un pequeño handler en `middleware.ts` y pasar env vars `PREVIEW_*`.

## 5) Desarrollo Local (Dev)

Ejecutar en terminales separadas:

- `my-page`: `npm run dev` (puerto 3000)
- `my-vue`: `npm run dev` (puerto 3001)
- `my-vue-comp`: `npm run dev` (puerto 3002)
- `my-app-vite`: `npm run start`

El host Vite proxya a los MFEs en dev para resolver los remotes. Si quieres proxy también para `my-vue-comp` en local, añade en `vite.config.ts`:

```typescript
"/app/my-vue-comp": { 
  target: "http://localhost:3002", 
  rewrite: p => p.replace(/^\/app\/my-vue-comp/, "") 
}
```

## 6) Problemas Conocidos y Soluciones

- **404 al refrescar en subrutas** → Falta fallback SPA en `vercel.json` del host.
- **Carga estancada tras redeploy MFE** → Asegurar `Cache-Control: no-store` en `/assets/remoteEntry.js` del MFE.
- **CORS/CSP** → Con rewrites no debería haber CORS. Si añades orígenes absolutos, actualiza CSP del host.
- **`children` de Vaadin Router en remoto devuelve `undefined`** → Asegúrate de que cada MFE implementa `getRoutes` devolviendo un array con al menos una ruta raíz.

---

# Referencias

- [Lit](https://lit.dev/)
- [@vaadin/router](https://github.com/vaadin/router?tab=readme-ov-file)
- [Webpack](https://webpack.js.org/)
- [Vite](https://vitejs.dev/)
- [Module Federation](https://module-federation.io/guide/start/index.html)
- [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
