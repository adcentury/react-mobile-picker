# React Mobile Picker - Compatibility Tests

This directory contains tests to verify that react-mobile-picker works correctly with both React 18 and React 19.

## Test Structure

```
test-compatibility/
├── react-18/           # React 18 test environment
├── react-19/           # React 19 test environment
├── shared-test.tsx     # Shared test component
├── automated-test.js   # Automated test runner
└── run-tests.sh       # Manual test runner
```

## Running Tests

### Automated Test (Recommended)

This will build both React 18 and 19 test apps and verify they build without errors:

```bash
cd test-compatibility
node automated-test.js
```

Expected output:
```
✅ React 18: PASS
✅ React 19: PASS
🎉 All tests passed! The library is compatible with both React 18 and 19.
```

### Manual Interactive Test

This will start development servers for both React versions so you can test interactively:

```bash
cd test-compatibility
./run-tests.sh
```

This will:
- Start React 18 test on http://localhost:5173
- Start React 19 test on http://localhost:5174

Open both URLs in your browser and verify:
- ✅ Green box = No errors (working correctly)
- ❌ Red box = Error detected (needs fixing)

## What Was Fixed

The original error with React 18 was:
```
TypeError: Cannot read properties of undefined (reading 'recentlyCreatedOwnerStacks')
```

This was caused by the library bundling React's development JSX runtime, which includes debugging code that accesses `recentlyCreatedOwnerStacks` - a property that exists in React 19 but not in React 18.

The fix involved:
1. Changing the export pattern to avoid issues with JSX transform
2. Configuring Vite to externalize the JSX runtime and force production mode
3. This ensures the library uses the consumer's React version

## Verification

Both test environments import the built library and render a picker component. If the component renders without errors in both React 18 and 19, the compatibility issue is resolved.