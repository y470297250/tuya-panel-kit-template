# Tuya Panel Dimmer Template

English | [简体中文](./README-zh_CN.md)

for docs, please visit [tuya docs](https://docs.tuya.com)

for users outside Chinese mainland, please remove `.npmrc` file.

## Download manually

```bash
$ curl https://codeload.github.com/TuyaInc/tuya-panel-kit-template/tar.gz/develop | tar -xz --strip=2 tuya-panel-kit-template-develop/examples/lampDimmer
$ mv lampDimmer tuya-panel-lampDimmer-example
$ cd tuya-panel-lampDimmer-example
```

## Introduction

The template project can be used to quickly create lighting dimmer projects, supporting the following functions: 1 channel dimming / 2 channel dimming / dimming lamp type configuration / setting lamp brightness adjustable range / cloud timing / using device storage interface

You can scan the following QR code through the Tuya app to preview.

![LampClassic](https://images.tuyacn.com/rms-static/20ba64e0-bb47-11ea-96f0-cda03b175b6c-1593572475438.png?tyName=lampDimmer.png)



## Running

```bash
$ npm install && npm run start
# or
$ yarn && yarn start
```
