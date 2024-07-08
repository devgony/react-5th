# D22-Recoil_Forms

## convert blueprint from JS to TS

```sh
find . -type f -name "*.jsx" -exec bash -c 'mv "$0" "${0%.jsx}.tsx"' {} \;

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's/main.jsx/main.tsx/g' index.html
  sed -i '' 's/rootElement)/rootElement\!)/g' src/main.tsx
else
  sed -i 's/main.jsx/main.tsx/g' index.html
  sed -i 's/rootElement)/rootElement\!)/g' src/main.tsx
fi

cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
EOF
```

## Consideration

- How to manage objects with enum
  - type guard with `this is` keyword?
  - object + keyof?

```ts
const Status = {
  Wanted: { icon: "✅", description: "Wanted" },
  Visited: { icon: "👍", description: "Visited" },
  Liked: { icon: "👎", description: "Liked" },
} as const;
type Status = (typeof Status)[keyof typeof Status];
```
