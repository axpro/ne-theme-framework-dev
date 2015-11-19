# NextEuropa Theme Framework

[![Build Status](https://travis-ci.org/ec-europa/ne-theme-framework-dev.svg?branch=master)](https://travis-ci.org/ec-europa/ne-theme-framework-dev)
[![Coverage Status](https://coveralls.io/repos/ec-europa/ne-theme-framework-dev/badge.svg?branch=master&service=github)](https://coveralls.io/github/ec-europa/ne-theme-framework-dev?branch=master)
[![Code Climate](https://codeclimate.com/github/ec-europa/ne-theme-framework-dev/badges/gpa.svg)](https://codeclimate.com/github/ec-europa/ne-theme-framework-dev)

## Requirements

* Node.js >= v4
* npm >= v3.3.x

## Install build system

Before we can build the NextEuropa theme framework we need to install the build system
itself. This can be done using Node.js and npm:

```
$ npm install
```

This will install Bower and Gulp locally as this is the only so far to make it build correctly on ContinuousPHP.

Note: if you have Phing installed globally, you can also simple use the command:

```
$ phing
```

## Building the theme

```
$ npm run bower install
$ npm run gulp dist
```
