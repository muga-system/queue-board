# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue una estructura simple y manual.

---

## [Unreleased]

### Agregado

- Definición inicial del concepto Queue Board.
- Documentación base del proyecto.
- Estructura inicial con HTML, CSS y JavaScript vanilla.
- Base visual dark técnica.
- Tablero de cuatro estados:
  - `pending`
  - `processing`
  - `completed`
  - `failed`

- Renderizado dinámico de trabajos simulados.
- Ordenamiento de trabajos pendientes por prioridad.
- Tarjetas visuales para representar cada trabajo.
- Diferenciación visual de columnas por estado.
- Formulario para crear nuevos trabajos pendientes.
- Asignación de prioridad alta, media o baja.
- Validación mínima para evitar trabajos sin nombre.
- Acciones visibles según el estado de cada trabajo.
- Transiciones controladas entre estados:
  - `pending → processing`
  - `processing → completed`
  - `processing → failed`
  - `failed → pending`

- Reintento de trabajos fallidos.
- Conteo de trabajos por columna.
- Mensajes de estado vacío por columna.
- Estados de foco para inputs, select y botones.
- Ajustes responsive básicos para pantallas chicas.

### Decisiones técnicas

- Uso de HTML, CSS y JavaScript vanilla.
- Sin framework.
- Sin bundler.
- Sin dependencias iniciales.
- Sin backend.
- Sin base de datos.
- Sin autenticación.
- Sin drag and drop.
- Sin persistencia local en esta versión.
- Estados internos técnicos separados de los textos visibles.
- Interfaz dark técnica con acento azul frío.
- Bordes rectos, sin gradientes ni sombras decorativas.

### Pendiente para cierre de `v0.1.0`

- Revisión final del README.
- Revisión final del changelog.
- Deploy público.
- Tag de versión `v0.1.0`.
- Preparación de publicación asociada.
