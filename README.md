# React Native TypeScript Boilerplate

A production-ready [**React Native**](https://reactnative.dev) boilerplate bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli), pre-configured for TypeScript, ESLint, Prettier, and a scalable folder structure. Designed for rapid mobile app development with best practices out of the box.

---

## Project Overview

- **Framework:** React Native (TypeScript)
- **State Management:** Redux Toolkit
- **Navigation:** React Navigation
- **Testing:** Jest
- **Linting/Formatting:** ESLint, Prettier, Husky, lint-staged
- **Other:** Modular structure, ready for theming, localization, and scalable features.

---

## Folder Structure

```
├── App.tsx                # App entry point
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── navigation/        # Navigation setup
│   ├── redux/             # Redux slices, store config
│   ├── screens/           # App screens
│   ├── services/          # API and business logic
│   ├── styles/            # Common styles
│   ├── theme/             # Theme and color definitions
│   ├── types/             # TypeScript types/interfaces
│   └── utils/             # Utility functions
├── android/               # Native Android code
├── ios/                   # Native iOS code
├── .eslintrc.js           # ESLint config
├── .prettierrc.js         # Prettier config
├── tsconfig.json          # TypeScript config
├── package.json           # Project manifest
```

---

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev)
- [Getting Started](https://reactnative.dev/docs/environment-setup)
- [Learn the Basics](https://reactnative.dev/docs/getting-started)
- [Blog](https://reactnative.dev/blog)
- [`@facebook/react-native`](https://github.com/facebook/react-native)

---

## Assumptions & Known Issues

- Assumes you have Node.js, Yarn or npm, and a working React Native environment (see prerequisites).
- Xcode required for iOS builds (macOS only).
- Android Studio required for Android builds.
- Some dependencies may require additional linking or setup (see their docs).
- If you encounter issues, check the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) guide.

---

## Improvements Planned

- Add CI/CD pipeline (GitHub Actions)
- Improve testing coverage (add Detox for E2E)
- Add sample API integration
- Enhance documentation (architecture, theming, localization)
- Add sample custom hooks and components
- Expand ESLint/Prettier rules for stricter code quality

---

## How to Rename the App

To rename the app, run the following command:

```bash
npx react-native-rename "Boiler Plate" --iosBundleID "com.boilerplate.app" --androidBundleID "com.boilerplate.app"
```

After renaming, follow these steps:

1. Clean and install dependencies:

```bash
rm -rf node_modules
yarn install
```

2. For iOS:

```bash
cd ios
pod install
cd ..
```

3. For Android:

```bash
cd android
./gradlew clean
cd ..
```

4. Rebuild your app:

```bash
npx react-native run-android
npx react-native run-ios
```

**Note:** Make sure to commit all your changes before renaming the app.
