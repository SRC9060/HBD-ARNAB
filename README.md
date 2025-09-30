ARNAB-HBD

## Troubleshooting: TypeScript errors for Vite modules

If you see errors like:

```
Cannot find module 'vite' or its corresponding type declarations.
Cannot find module '@vitejs/plugin-react' or its corresponding type declarations.
```

**How to fix:**

1. Make sure you are in the project root (where `package.json` is).
2. Run:
   ```bash
   npm install
   ```
3. If the error persists, reload VS Code or your editor.
4. Ensure your `tsconfig.app.json` includes:
   ```json
   "types": ["vite/client"]
   ```

These errors do not affect deployment or the live site, only your local editor experience.
