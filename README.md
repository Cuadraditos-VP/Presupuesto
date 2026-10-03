# Presupuesto mensual

App web simple y offline para llevar el presupuesto del mes y la tenencia (plata en cuentas / dólares).

Todo corre en el navegador. Los datos se guardan en `localStorage` del dispositivo. No hay servidor ni cuenta.

## Qué hace

- **Mes**: ingresos y gastos del mes, con check de “ya cobrado / ya pagado”.
- Proyección de “te quedaría a fin de mes” y cuánto podés gastar por día.
- **Tenencia**: dónde está tu plata (cuentas en pesos o dólares), con cotización del dólar editable.
- Logos personalizados en gastos y cuentas (modo Editar).
- Reordenar ítems arrastrando.
- Exportar / importar respaldo en JSON.

## Cómo usarlo

### Opción 1 — Abrir el archivo

1. Descargá `index.html`.
2. Abrilo con el navegador (doble clic o arrastrarlo a Chrome / Firefox / Edge / Safari).
3. Listo. Funciona sin internet.

### Opción 2 — GitHub Pages (recomendado para tenerlo siempre a mano)

1. Subí este repo a GitHub.
2. En el repo: **Settings → Pages**.
3. Source: **Deploy from a branch** → branch `main` → folder `/ (root)`.
4. Guardá. En uno o dos minutos tenés la URL tipo:

   `https://tu-usuario.github.io/presupuesto-mensual/`

## Datos y privacidad

- Todo se guarda solo en tu navegador (`localStorage`).
- No se envía nada a ningún servidor.
- Para cambiar de dispositivo o hacer backup: usá **Exportar** / **Importar** (botones que aparecen al entrar en modo Editar).

## Personalizar

En modo **Editar** (botón en cada columna):

- Agregar / quitar / renombrar ingresos, gastos y cuentas.
- Cambiar logos (tocá el círculo).
- Reordenar arrastrando el ícono `⋮⋮`.

## Tecnologías

- HTML + CSS + JavaScript vanilla (sin frameworks).
- Fuentes: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) y [Figtree](https://fonts.google.com/specimen/Figtree).
- Tema claro / oscuro según preferencia del sistema.

## Licencia

MIT — usalo, modificálo y compartilo libremente.
