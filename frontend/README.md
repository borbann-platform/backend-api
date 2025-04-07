```markdown
frontend/
├── features/ # <= NEW: Feature-specific modules
│ ├── map/
│ │ ├── api/ # API calls specific to the map
│ │ │ └── mapApi.ts # (Example)
│ │ ├── components/ # Map-specific UI components
│ │ │ ├── analytics-overlay.tsx
│ │ │ ├── analytics-panel.tsx
│ │ │ ├── area-chart.tsx
│ │ │ ├── chat-bot.tsx
│ │ │ ├── chat-overlay.tsx
│ │ │ ├── filters-overlay.tsx
│ │ │ ├── map-container.tsx
│ │ │ ├── map-header.tsx
│ │ │ ├── map-sidebar.tsx
│ │ │ ├── property-filters.tsx
│ │ │ └── overlay-system/ # Overlay specific components
│ │ │ ├── overlay-context.tsx
│ │ │ ├── overlay-dock.tsx
│ │ │ └── overlay.tsx
│ │ ├── hooks/ # Map-specific hooks
│ │ │ └── useMapInteractions.ts # (Example)
│ │ ├── types/ # Map-related types/interfaces
│ │ │ └── index.ts # (Example)
│ │ └── utils/ # Map-specific utilities
│ │ └── mapHelpers.ts # (Example)
│ └── model-explanation/
│ ├── components/ # Model Explanation specific components
│ │ ├── feature-importance-chart.tsx
│ │ └── price-comparison-chart.tsx
│ ├── api/
│ │ └── explanationApi.ts # (Example)
│ └── types/
│ └── index.ts # (Example)
│
├── components/
│ ├── ui/ # Shadcn UI components (KEEP AS IS)
│ │ └── ... (accordion.tsx, button.tsx, etc.)
│ └── common/ # <= NEW: Shared, app-wide components
│ ├── ThemeProvider.tsx # Moved from root components
│ ├── ThemeToggle.tsx # Moved from root components
│ ├── ThemeController.tsx # Moved from root components
│ └── PageLayout.tsx # (Example new shared layout)
│
├── lib/ # Core utilities, constants, config
│ └── utils.ts # (Keep cn function here)
│
├── hooks/ # Shared, app-wide hooks
│ ├── use-toast.ts # (Keep useToast here)
│ └── use-mobile.tsx # (Keep useIsMobile here)
│
├── services/ # <= OPTIONAL: Centralized API layer (alternative to features/\*/api)
│ └── apiClient.ts # (Example API client setup)
│
├── store/ # <= OPTIONAL: Global state management (e.g., Zustand, Jotai)
│ └── mapStore.ts # (Example store)
│
├── types/ # <= NEW: Shared, app-wide types/interfaces
│ ├── index.ts # Barrel file for types
│ └── api.ts # Example: General API response types
│
├── app/ # Next.js app router (routing, layouts, pages)
│ ├── (routes)/ # Keep actual route structure here
│ │ ├── map/
│ │ │ ├── layout.tsx # Imports common layout, feature components
│ │ │ └── page.tsx # Imports components from 'features/map/components'
│ │ ├── model-explanation/
│ │ │ └── page.tsx # Imports components from 'features/model-explanation/components'
│ │ └── page.tsx # Root page
│ ├── layout.tsx # Root layout (includes ThemeProvider)
│ ├── globals.css
│ └── favicon.ico
│
├── public/ # Static assets
│ └── ...
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```
