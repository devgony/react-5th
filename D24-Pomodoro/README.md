# D24-Pomodoro

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
npm i --save-dev @types/styled-components
```

## Todo

- [x] handle when goal is 12
- [x] styling
- [x] render min and sec with zero padding
- [x] impl motion
- [x] show reset button on last goal
