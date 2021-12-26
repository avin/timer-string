# Timer-string

Convert human timer strings to second/millisecond number.

## Install

```sh
# with npm
npm install timer-string
# or with yarn
yarn add timer-string
```

## Usage

```js

stringToSeconds('40'); // 40 minutes
stringToSeconds('40 20'); // 40 minutes 20 seconds
stringToSeconds('40m 20s'); // 40 minutes 20 seconds
stringToSeconds('40 minutes 20 seconds');
stringToSeconds('2 hours 40 minutes 20 seconds');
stringToSeconds('1 day 2 hours 40 minutes 20 seconds');

secondsToString(10); // 10 seconds
secondsToString(70); // 1 minute 10 seconds
secondsToString(120); // 2 minutes 0 seconds
secondsToString(120 * 60 * 24); // 2 days 0 hours 0 minutes 0 seconds

```
