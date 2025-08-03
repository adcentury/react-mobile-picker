# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Mobile Picker is an iOS-like select box component for React. It's almost unstyled for easy customization.

## Key Commands

```bash
# Development
pnpm dev                    # Start development server on http://localhost:5173

# Building
pnpm build:lib             # Build the library with TypeScript + Vite
pnpm build:examples        # Build example applications
pnpm build:app            # Build both library and examples

# Code Quality
pnpm lint                  # Run ESLint on lib and examples directories

# Preview
pnpm preview:app          # Preview built examples
```

## Architecture

### Library Structure (lib/)

The library uses a Context-based architecture for efficient state management:

- **lib/index.ts**: Main entry point, exports all components
- **lib/components/Picker.tsx**: Main container component with two contexts:
  - `PickerDataContext`: Manages picker state (value, height, itemHeight)
  - `PickerActionsContext`: Provides onChange handler
- **lib/components/PickerColumn.tsx**: Column wrapper that handles scrolling and selection
- **lib/components/PickerItem.tsx**: Individual picker items with render prop support

### Component Design Patterns

1. **Controlled Component**: The picker is fully controlled through `value` and `onChange` props
2. **Compound Components**: Uses `Picker.Column` and `Picker.Item` for composition
3. **Render Props**: `Picker.Item` exposes `selected` state for custom styling
4. **TypeScript Generics**: Full type safety with generic value types

### Build Configuration

- **Bundler**: Vite with separate configs for library and examples
- **TypeScript**: Strict mode enabled, targets ES2020
- **Output Formats**: UMD and ES modules with TypeScript definitions
- **Path Alias**: `"react-mobile-picker"` maps to `"./lib"` in development

### Development Notes

- The project uses PNPM as the package manager (no package-lock.json)
- Pre-commit hooks run ESLint via Husky + lint-staged
- The library has minimal styling by design - consumers add their own styles
- Examples use TailwindCSS, but the library itself doesn't depend on it
- No test framework is currently configured

### Missing Capabilities

When implementing new features, note that the project currently lacks:
- Unit/integration tests (no Jest, Vitest, or other test framework)
- E2E tests
- CI/CD pipeline configuration
- Automated API documentation generation