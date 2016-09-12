# WAT

Participatory Budget app done on #peacehack2016 
@ETH Zurich



# Features

 - prepare to me amazed
 - runs on ios
 - pictures
 - images



# Development

To run on simulators:


## IOS

xcode required
```
react-native run-ios
```


## Android

install simulator
and run with

```
~/Library/Android/sdk/tools/emulator -avd reactnative
```

```
$ adb devices
List of devices attached
emulator-5554	device
```

```
react-native run-android
```

Share menu for live reload is avaible via
[Frappe](https://github.com/niftylettuce/frappe)
then `Cmd+Shift+S` to shake all devices


 
# Build Android

[generate key](https://facebook.github.io/react-native/releases/0.31/docs/signed-apk-android.html)
```
cd android && ./gradlew assembleRelease
cd android && ./gradlew installRelease
```



# Build Ios

```
open ios/ParticipatoryBudgeting.xcodeproj/
```
click run...
