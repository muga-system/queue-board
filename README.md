# Queue Board

**muga.dev / sistemas mínimos 02 — Queue Board**

Una cola ordena trabajo antes de ejecutarlo.

Queue Board es una herramienta visual mínima para representar trabajos en cola, prioridad, estados controlados y procesamiento ordenado.

El objetivo no es construir un gestor de tareas completo.

El objetivo es mostrar cómo una cola permite desacoplar dos momentos distintos:

1. recibir trabajo;
2. procesarlo en orden.

---

## Frase asociada

> Antes de ejecutar más rápido, conviene ordenar mejor.

---

## Concepto

Una cola no ejecuta más rápido por sí misma.

Primero ordena.

Después permite procesar con criterio.

En este proyecto, la cola funciona como una representación mínima de un sistema que recibe trabajos, los mantiene pendientes, los ordena según prioridad y permite moverlos por estados definidos.

La herramienta no busca simular infraestructura real de colas.

Busca hacer visible el concepto.

---

## Estados del sistema

Cada trabajo puede pasar por cuatro estados controlados:

1. `pending` — pendiente;
2. `processing` — en proceso;
3. `completed` — completado;
4. `failed` — fallido.

Un trabajo fallido puede volver a la cola mediante una acción de reintento.

---

## Transiciones permitidas

El sistema no permite mover trabajos de forma arbitraria.

Las transiciones válidas son:

- `pending → processing`
- `processing → completed`
- `processing → failed`
- `failed → pending`

Un trabajo completado queda cerrado y no muestra acciones nuevas.

---

## Funcionalidad actual

La versión actual permite:

- visualizar trabajos iniciales por estado;
- crear trabajos simples;
- asignar prioridad alta, media o baja;
- ordenar trabajos pendientes por prioridad;
- mover trabajos a procesamiento;
- completar trabajos;
- marcar trabajos como fallidos;
- reintentar trabajos fallidos;
- ver conteos por estado;
- mostrar mensajes cuando una columna queda vacía;
- validar que no se creen trabajos sin nombre.

---

## Prioridad

La prioridad se usa para ordenar los trabajos pendientes.

Criterio actual:

1. prioridad alta;
2. prioridad media;
3. prioridad baja.

La prioridad afecta el orden dentro de `pending`.

No altera los trabajos que ya están en `processing`, `completed` o `failed`.

---

## Alcance mínimo

Esta versión se enfoca en representar el flujo esencial de una cola:

1. entrada de trabajo;
2. asignación de prioridad;
3. espera en estado pendiente;
4. procesamiento;
5. resultado correcto o fallido;
6. posibilidad de reintento.

La herramienta está pensada como pieza mínima, clara y usable.

No como aplicación de productividad general.

---

## Fuera de alcance

Esta versión no incluye:

- backend;
- base de datos;
- autenticación;
- usuarios;
- drag and drop;
- filtros avanzados;
- persistencia local;
- integración con servicios externos;
- historial de eventos;
- ejecución real de procesos.

La prioridad es explicar el concepto de cola mediante una interfaz mínima.

---

## Stack

- HTML;
- CSS;
- JavaScript vanilla.

Sin framework.

Sin bundler.

Sin dependencias iniciales.

---

## Estructura del proyecto

```txt
queue-board/
├── README.md
├── CHANGELOG.md
├── .gitignore
├── index.html
└── src/
    ├── styles/
    │   └── main.css
    └── scripts/
        └── main.js
```

---

## Demo

La herramienta está publicada en GitHub Pages:

https://muga-system.github.io/queue-board/


## Uso local

Abrir el archivo `index.html` directamente en el navegador.

No hace falta instalar dependencias.

No hace falta ejecutar servidor de desarrollo.

---

## Decisiones técnicas

### HTML semántico

La estructura del tablero está definida con secciones y columnas simples.

Cada columna representa un estado de la cola.

### CSS sin dependencias

El diseño usa CSS plano, modo dark, bordes rectos y una paleta técnica sobria.

La interfaz prioriza lectura, separación de estados y claridad operativa.

### JavaScript vanilla

La lógica se mantiene en un único archivo.

El sistema define:

- estados válidos;
- trabajos iniciales;
- creación de trabajos pendientes;
- orden por prioridad;
- renderizado dinámico;
- transiciones permitidas;
- conteos por columna;
- estados vacíos.

### Estados internos estables

Los estados se mantienen como valores técnicos:

- `pending`
- `processing`
- `completed`
- `failed`

Los textos visibles se traducen en la interfaz.

Esto separa dato interno de presentación.

---

## Estado

Versión inicial funcional en desarrollo.

Objetivo de cierre:

`v0.1.0`
