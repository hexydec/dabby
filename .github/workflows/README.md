# GitHub Actions Workflows

This directory contains automated CI/CD workflows for the Dabby.js TypeScript project.

## Workflows

### 1. `test.yml` - TypeScript Tests
**Triggers**: Push to `master` or `exp-ts`, Pull Requests

**Jobs**:
- **build-and-test**: Runs on Node 18.x, 20.x, and 22.x
  - Builds TypeScript project
  - Runs TypeScript compiler checks
  - Executes type definition tests
  - Reports bundle sizes
  - Uploads build artifacts (Node 20.x only)

- **type-safety**: TypeScript type safety verification
  - Compiles test files without emitting output
  - Runs strict TypeScript compilation

- **bundle-analysis**: Analyzes and reports bundle sizes
  - Generates bundle size report in GitHub summary
  - Checks for size regressions (max 35KB for minified build)

### 2. `ci.yml` - CI/CD Pipeline
**Triggers**: Push to `master` or `exp-ts`, Tags starting with `v`, Pull Requests to `master`

**Jobs**:
- **lint**: Code linting (placeholder for ESLint when configured)

- **test-matrix**: Cross-platform testing
  - Tests on Ubuntu, Windows, and macOS
  - Tests on Node 18.x, 20.x, and 22.x
  - Runs build, TypeScript checks, and type tests

- **coverage**: Generates type coverage report

- **publish-npm**: Publishes to NPM (on version tags only)
  - Requires `NPM_TOKEN` secret

- **create-release**: Creates GitHub releases (on version tags only)
  - Bundles distribution files
  - Generates release notes
  - Uploads release artifacts

### 3. `pr-checks.yml` - Pull Request Checks
**Triggers**: Pull Request opened, synchronized, or reopened

**Jobs**:
- **pr-info**: Generates PR summary with build status and bundle sizes

- **file-changes**: Analyzes changed files
  - Lists TypeScript/JavaScript file changes
  - Comments on PR with changed files

- **type-check**: TypeScript type verification
  - Comments success/failure status on PR

- **bundle-size-check**: Compares bundle sizes
  - Compares PR bundle size with base branch
  - Comments detailed size comparison on PR
  - Warns if size change exceeds 5%

## Setup Requirements

### Secrets
Configure these secrets in GitHub repository settings:

- `NPM_TOKEN`: NPM authentication token for publishing (required for releases)

### Permissions
The workflows require these permissions:
- `contents: read` - Read repository contents
- `contents: write` - Create releases (CI workflow only)
- `pull-requests: write` - Comment on PRs

## Local Testing

### Run TypeScript Tests Locally
```bash
# Install dependencies
npm ci

# Build project
npm run build

# Run TypeScript compiler
npm run tsc

# Run type definition tests
npm run test:types
```

### Check Bundle Sizes
```bash
# After building
ls -lh dist/dabby.min.js dist/dabby.js dist/modular.js

# Check individual modules
ls -lh dist/manipulation/html/html.js
ls -lh dist/attributes/css/css.js
```

## Workflow Status Badges

Add these badges to your README.md:

```markdown
[![TypeScript Tests](https://github.com/hexydec/dabby/actions/workflows/test.yml/badge.svg)](https://github.com/hexydec/dabby/actions/workflows/test.yml)
[![CI/CD Pipeline](https://github.com/hexydec/dabby/actions/workflows/ci.yml/badge.svg)](https://github.com/hexydec/dabby/actions/workflows/ci.yml)
```

## Maintenance

### Adding New Tests
1. Add test scripts to `package.json`
2. Update workflow files to run new tests
3. Test locally before pushing

### Updating Node Versions
Update the `node-version` matrix in workflow files:
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]
```

### Modifying Bundle Size Limits
Update the `MAX_ALLOWED` value in `test.yml`:
```yaml
MAX_ALLOWED=35000  # 35KB max for minified build
```

### Disabling Workflows
To temporarily disable a workflow:
1. Add to the workflow file:
```yaml
on:
  workflow_dispatch:  # Manual trigger only
```

## Troubleshooting

### Workflow Fails on Windows
- Check file path separators
- Ensure commands are cross-platform compatible
- Use actions that support Windows

### Bundle Size Regression
- Review changes in `dist/` after build
- Check if new dependencies were added
- Verify tree-shaking is working correctly

### Type Tests Fail
- Run locally: `npm run test:types`
- Check `tsd.json` configuration
- Verify `.d.ts` files are generated correctly

## Contributing

When adding workflows:
1. Test locally when possible
2. Use descriptive job and step names
3. Add appropriate comments
4. Update this README
