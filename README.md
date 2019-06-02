# React Native

## How to create

TODO: expo cli を使うべきか?

```sh
brew install watchman
npm i -g react-native-cli
```

```sh
react-native init FrontendDemoChatClientReactNative

cd FrontendDemoChatClientReactNative
react-native run-ios
react-native run-android
```

```sh
git init
```

### Install package

```sh
# .flowconfig のバージョンに合わせる
npm i -D flow-bin@0.92.0
```

flow の実行

```sh
npx flow
```

npm パッケージ特有の型は flow-typed で管理されている

```sh
npx flow-typed install -f v0.92.0 react-navigation@1.5.8
```
