#!/bin/bash

echo "🧪 React Mobile Picker Compatibility Test"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# First, build the library
echo -e "${BLUE}📦 Building react-mobile-picker library...${NC}"
cd ..
pnpm build:lib
cd test-compatibility

echo ""
echo -e "${BLUE}📋 Test 1: React 18 Compatibility${NC}"
echo "-----------------------------------"
cd react-18
echo "Installing dependencies..."
pnpm install --no-frozen-lockfile

echo "Starting React 18 test server..."
echo -e "${GREEN}✅ Server will start on http://localhost:5173${NC}"
echo -e "${GREEN}   Open this URL in your browser to verify no errors appear${NC}"
echo ""
pnpm dev &
REACT18_PID=$!

sleep 3

echo ""
echo -e "${BLUE}📋 Test 2: React 19 Compatibility${NC}"
echo "-----------------------------------"
cd ../react-19
echo "Installing dependencies..."
pnpm install --no-frozen-lockfile

echo "Starting React 19 test server..."
echo -e "${GREEN}✅ Server will start on http://localhost:5174${NC}"
echo -e "${GREEN}   Open this URL in your browser to verify no errors appear${NC}"
echo ""
pnpm dev --port 5174 &
REACT19_PID=$!

echo ""
echo "========================================="
echo -e "${GREEN}Both test servers are running!${NC}"
echo ""
echo "📌 React 18 test: http://localhost:5173"
echo "📌 React 19 test: http://localhost:5174"
echo ""
echo "Check both URLs in your browser:"
echo "- ✅ Green box = No errors (working correctly)"
echo "- ❌ Red box = Error detected (needs fixing)"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "========================================="

# Wait for user to press Ctrl+C
trap "kill $REACT18_PID $REACT19_PID; exit" INT
wait