# UpLvl

Aplicación de seguimiento de hábitos gamificada: cada hábito completado suma XP, el XP sube de nivel, y una racha global mide la constancia. Construida con Angular 22 (standalone, signals, zoneless) como proyecto de aprendizaje y portfolio.

## Stack

- **Angular 22** — standalone components (sin NgModules), zoneless por defecto, Signal Forms.
- **SCSS** con arquitectura 7+1.
- **TypeScript** en modo estricto.
- **Biome** — linting y formateo (sustituye a ESLint + Prettier), con Husky + lint-staged en pre-commit.
- **Vitest** como test runner.

## Puesta en marcha

```bash
npm install
npm start
```

La app arranca en `http://localhost:4200`. Usuario de prueba ya precargado:

```text
Email: demo@uplvl.app
Password: demo1234
```

## Estructura de carpetas

```text
src/app/
├── core/ # Transversal, singleton, sin UI
│ ├── guards/ # authGuard (CanActivateFn)
│ ├── models/ # Interfaces de dominio (Habit, User, XpState...)
│ ├── services/ # Stores: HabitsStore, AuthStore
│ └── utils/ # Funciones puras (cálculo de nivel/XP)
├── features/ # Una carpeta por dominio funcional
│ ├── auth/
│ ├── dashboard/
│ └── habits/
│ ├── pages/ # Layout de cada ruta (ver más abajo)
│ └── components/ # Piezas con lógica propia de esta feature
└── shared/
└── components/ # UI reutilizable sin lógica de negocio
(HabitCard, ConfirmDialog, SkeletonList)

src/styles/ # SCSS global, patrón 7+1
├── abstracts/ # Tokens de diseño y breakpoints (sin CSS de verdad)
├── base/ # Reset + estilos base de <body>
└── components/ # Clases reutilizables en toda la app (.btn, .form-, .panel-...)
```
    

## Patrón Page → Component

Cada ruta apunta a una **Page** (`features/*/pages/`), cuya única responsabilidad es el **layout** (con CSS Grid) de esa pantalla — decide dónde va cada bloque, pero no sabe nada de datos ni de estado. Las Pages nunca inyectan servicios ni manejan signals propios.

Dentro de esa Page se montan uno o varios **Components de feature** (`features/*/components/`), que sí inyectan los stores necesarios (`inject(HabitsStore)`, `inject(AuthStore)`) y gestionan el estado de esa parte de la pantalla.

Ejemplo — `/dashboard`:
    
```text
DashboardPage (layout Grid, sin lógica)
├── LevelProgress (insignia + barra XP, inyecta HabitsStore)
└── TodayHabits (lista de hábitos de hoy, inyecta HabitsStore)
```

Los componentes puramente presentacionales sin lógica de negocio (reciben `input()`, emiten `output()`, no inyectan nada) viven en `shared/components/` porque se reutilizan entre features — `HabitCard` aparece tanto en `TodayHabits` (dashboard) como en `HabitsList` (hábitos).

## Estado: Signal Stores

No hay `NgRx` ni ninguna librería de estado externa. Cada store es un `@Service()` (root-provided, zoneless) que expone:

- Signals privadas (`_habits`, `_xpTotal`...) como única fuente de la verdad, mutadas siempre de forma inmutable.
- Signals públicas de solo lectura (`.asReadonly()`) o `computed()` para todo valor derivado (nunca un signal que dependa de otro se guarda "a mano").
- Métodos públicos como única forma de mutar el estado desde fuera (`toggleHabit`, `addHabit`, `login`...).

### Estilos: SCSS 7+1 + BEM

Cualquier clase que se repita en 2 o más componentes se extrae a `styles/components/` con un nombre genérico (`.btn`, `.form-input`, `.panel-card`...) — nunca se deja duplicada en el `.scss` local de un componente. Dentro de un componente, las clases exclusivas de ese componente siguen la convención BEM (`bloque__elemento--modificador`).

Breakpoints mobile-first, con los mismos valores que Bootstrap (sin depender de la librería), en `styles/abstracts/_responsive.scss`.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm start` | Sirve la app en desarrollo (`ng serve -o`) |
| `npm run build` | Build de producción |
| `npm run watch` | Build en modo watch (desarrollo) |
| `npm test` | Ejecuta los tests con Vitest |
| `npm run lint` | Lint con Biome (`--write`, aplica fixes seguros) |
| `npm run format` | Formatea con Biome |
| `npm run check` | Lint + formato + organización de imports, todo junto |
| `npm run check:ci` | Igual que `check`, en modo verificación (sin escribir) — usado en CI |