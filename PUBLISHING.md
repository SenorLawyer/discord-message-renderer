# Publishing Guide

## Prerequisites

1. **Update package.json**:

   - Change `author` field to your name and email
   - Update `repository`, `bugs`, and `homepage` URLs to your GitHub repo
   - Verify the package name is available on npm

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

## Publishing Steps

### 1. Create npm account

If you don't have one already:

```bash
npm adduser
```

### 2. Login to npm

```bash
npm login
```

### 3. Check package contents

Preview what will be published:

```bash
npm pack --dry-run
```

### 4. Test the build

Make sure TypeScript compiles without errors:

```bash
npm run build
```

### 5. Publish to npm

For first-time publishing:

```bash
npm publish
```

For updates:

```bash
# Update version first
npm version patch  # or minor/major
npm publish
```

## Version Management

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

```bash
npm version patch   # Bug fixes
npm version minor   # New features
npm version major   # Breaking changes
```

## Testing the Published Package

After publishing, test in a new project:

```bash
mkdir test-package
cd test-package
npm init -y
npm install discord-message-renderer discord.js
```

Create a test file:

```javascript
const { render } = require("discord-message-renderer");
console.log("Package imported successfully!");
```

## Troubleshooting

### Package name already exists

Change the name in `package.json` to something unique like:

- `@yourusername/discord-message-renderer`
- `discord-message-renderer-v2`
- `your-discord-renderer`

### TypeScript errors

Make sure all dependencies are installed:

```bash
npm install @types/node typescript --save-dev
```

### Build fails

Check that `src/index.ts` exports are correct:

```typescript
export { render, RenderOptions, ReplyMessageData };
```

## Files Included in Package

The published package will include:

- `dist/` - Compiled JavaScript and type definitions
- `README.md` - Documentation
- `LICENSE` - License file
- `package.json` - Package metadata

Files excluded (via `.npmignore`):

- `src/` - Source TypeScript files
- `test/` - Test files
- Development configuration files
