# WC VC Button

Componente botón genérico con patrón MVVM en Lit.

## Características

- ✅ Patrón MVVM (Model-View-ViewModel)
- ✅ Iconos personalizables usando Material Icons
- ✅ Efecto ripple al hacer click
- ✅ Eventos personalizados
- ✅ Estilos CSS personalizables mediante variables CSS
- ✅ Totalmente tipado con TypeScript
- ✅ Module Federation compatible

## Uso

```html
<wc-vc-button
  url="/home"
  systemId="MiApp"
  icon="home"
  label="Inicio"
></wc-vc-button>
```

## Propiedades

| Propiedad    | Tipo           | Default     | Descripción                        |
| ------------ | -------------- | ----------- | ---------------------------------- |
| `url`        | `string`       | `'#'`       | URL a la que navegar               |
| `systemId`   | `string`       | `'Sistema'` | ID del sistema                     |
| `icon`       | `string`       | `'home'`    | Icono a mostrar                    |
| `label`      | `string`       | `'Inicio'`  | Texto del botón                    |
| `configData` | `ButtonConfig` | `{}`        | Datos de configuración adicionales |

## Eventos

### `externalApp:open`

Se emite al hacer click en el botón.

**Detail:**

```typescript
{
  url: string,
  sistemId: string,
  configData: ButtonConfig
}
```

## Variables CSS

| Variable                   | Default   | Descripción                 |
| -------------------------- | --------- | --------------------------- |
| `--button-bg-color`        | `#1976d2` | Color de fondo              |
| `--button-bg-hover-color`  | `#1565c0` | Color de fondo al hover     |
| `--button-bg-active-color` | `#0d47a1` | Color de fondo al presionar |
| `--button-text-color`      | `#ffffff` | Color del texto             |
| `--button-focus-color`     | `#90caf9` | Color del outline al focus  |

## Ejemplo con estilos personalizados

```html
<wc-vc-button
  url="/success"
  icon="check_circle"
  label="Guardar"
  style="--button-bg-color: #4caf50; --button-bg-hover-color: #45a049;"
></wc-vc-button>
```

## Desarrollo

```bash
npm install

npm run dev

npm run build
```
