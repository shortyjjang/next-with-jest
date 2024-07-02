# Next.js 테스트

# install Next

```jsx
npx create-next-app
```

✔ What is your project named? [project-name]

✔ Would you like to use TypeScript? No / [Yes]

✔ Would you like to use ESLint? No / [Yes]

✔ Would you like to use Tailwind CSS? No / [Yes]

✔ Would you like to use `src/` directory? No / [Yes]

✔ Would you like to use App Router? (recommended) No / [Yes]

✔ Would you like to customize the default import alias (@/*)? No / [Yes]

✔ What import alias would you like configured? [@/*]]

# install Jest

```jsx
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

```jsx
npm init jest@latest
```

✔ Would you like to use Jest when running "test" script in "package.json"? No / [Yes]

✔ Would you like to use Typescript for the configuration file? No / [Yes]

✔ Choose the test environment that will be used for testing › jsdom (browser-like)

✔ Do you want Jest to add coverage reports? No / [Yes]

✔ Which provider should be used to instrument code for coverage? › v8, [jsdom]

✔ Automatically clear mock calls, instances, contexts and results before every test? No / [Yes]

```jsx
npm i --save-dev @types/jest
```

```jsx
npm install ts-node --save-dev
```

```jsx
npm i --save-dev ts-jest
```

## useRouter 사용시 버그 발생 provider 생성

```
/src/shared/hooks/next-router-provider-mock.tsx
```

## alert 호출시 버그 발생

jest.config.ts 변경

```
  testEnvironmentOptions: {
    beforeParse(window: Window) {
      console.log("------------------------------------------  log ");
      window.document.childNodes.length === 0;
      window.alert = (msg: string) => {
        console.log(msg);
      };
    },
  },
```
