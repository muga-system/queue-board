# Queue Board

**muga.dev / sistemas mínimos 02 — Queue Board**

Una cola ordena trabajo antes de ejecutarlo.

Queue Board es una herramienta visual mínima para representar trabajos en cola, prioridad, estados y procesamiento ordenado.

El objetivo no es construir un gestor de tareas completo.

El objetivo es mostrar cómo una cola permite desacoplar dos momentos distintos:

1. recibir trabajo;
2. procesarlo en orden.

---

## Concepto

Una cola no ejecuta más rápido por sí misma.

Primero ordena.

Después permite procesar con criterio.

> Antes de ejecutar más rápido, conviene ordenar mejor.

---

## Estados del sistema

Cada trabajo puede pasar por cuatro estados controlados:

1. `pending` — pendiente;
2. `processing` — en proceso;
3. `completed` — completado;
4. `failed` — fallido.

Un trabajo fallido puede volver a la cola mediante `retry`.

---

## Alcance mínimo

La versión inicial permite:

- crear trabajos simples;
- asignar prioridad;
- ordenar trabajos pendientes;
- mover trabajos a procesamiento;
- completar trabajos;
- marcar trabajos como fallidos;
- reintentar trabajos fallidos.

---

## Fuera de alcance

Esta versión no incluye:

- backend;
- base de datos;
- autenticación;
- usuarios;
- drag and drop;
- filtros avanzados;
- integración con servicios externos.

La prioridad es explicar el concepto de cola mediante una pieza mínima, clara y usable.

---

## Stack

- HTML;
- CSS;
- JavaScript vanilla.

Sin framework, sin bundler y sin dependencias iniciales.

---

## Estado

Versión inicial en desarrollo.

Objetivo de cierre:

`v0.1.0`
