#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execAsync = promisify(exec);

console.log('🧪 Running automated compatibility tests...\n');

async function testReactVersion(version) {
  const testDir = path.join(__dirname, `react-${version}`);
  console.log(`📋 Testing React ${version}...`);
  
  try {
    // Install dependencies
    console.log('  Installing dependencies...');
    await execAsync('pnpm install --no-frozen-lockfile', { cwd: testDir });
    
    // Check installed React version
    const packageJsonPath = path.join(testDir, 'node_modules', 'react', 'package.json');
    const reactPackage = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    console.log(`  ✓ React version installed: ${reactPackage.version}`);
    
    // Try to build the test app
    console.log('  Building test app...');
    await execAsync('pnpm build', { cwd: testDir });
    console.log(`  ✅ React ${version} - BUILD SUCCESS\n`);
    
    return { version, success: true };
  } catch (error) {
    console.error(`  ❌ React ${version} - BUILD FAILED`);
    console.error(`  Error: ${error.message}\n`);
    return { version, success: false, error: error.message };
  }
}

async function runTests() {
  // First build the library
  console.log('📦 Building react-mobile-picker library...');
  try {
    await execAsync('pnpm build:lib', { cwd: path.join(__dirname, '..') });
    console.log('✓ Library built successfully\n');
  } catch (error) {
    console.error('❌ Failed to build library:', error.message);
    process.exit(1);
  }

  // Test both React versions
  const results = await Promise.all([
    testReactVersion('18'),
    testReactVersion('19')
  ]);

  // Summary
  console.log('=====================================');
  console.log('📊 Test Summary:');
  console.log('=====================================');
  
  results.forEach(result => {
    if (result.success) {
      console.log(`✅ React ${result.version}: PASS`);
    } else {
      console.log(`❌ React ${result.version}: FAIL`);
    }
  });

  const allPassed = results.every(r => r.success);
  
  if (allPassed) {
    console.log('\n🎉 All tests passed! The library is compatible with both React 18 and 19.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the errors above.');
    process.exit(1);
  }
}

runTests().catch(console.error);