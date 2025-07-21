# EV HUB Frontend (Next.js)

## Modular Architecture

```
frontend/
└── src/
    ├── app/
    │   ├── App.tsx           # Main layout, mounts Providers
    │   ├── layout.tsx        # Next.js root layout
    │   ├── routes.tsx        # Route definitions & protection
    │   ├── store.ts          # Global state (Redux/Zustand...)
    │   ├── providers.tsx     # Global providers (Auth, Theme, QueryClient...)
    │   └── index.ts          # Export app-level modules
    ├── features/             # Each feature = 1 module
    │   └── <feature>/
    │       ├── components/   # Dumb UI components
    │       ├── hooks/        # Business logic hooks
    │       ├── api.ts        # API calls only
    │       ├── model.ts      # Types, enums, state
    │       ├── constants.ts  # Feature constants
    │       └── index.ts      # Public exports
    ├── shared/
    │   ├── components/       # Global UI (Button, Modal...)
    │   ├── hooks/            # Global hooks (useDebounce...)
    │   ├── utils/            # Helper functions
    │   ├── types/            # Global types/enums
    │   └── theme/            # Theme config
    └── constants/
        ├── apiEndpoints.ts   # API endpoint URLs
        └── config.ts         # Global config/env
```

- **app/**: App-level logic, providers, routes, state.
- **features/**: Each business module, fully isolated.
- **shared/**: Reusable UI, hooks, utils, types, theme.
- **constants/**: Global constants, endpoints, config.

> See code comments for usage patterns and extension.
