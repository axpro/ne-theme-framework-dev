# Next EUROPA Theme Framework

[![Build Status](https://status.continuousphp.com/git-hub/ec-europa/ne-theme-framework-dev?token=06b4cf3d-ad0e-40db-bdcf-bbbd1f187c93&branch=master)](https://continuousphp.com/git-hub/ec-europa/ne-theme-framework-dev)
[![Coverage Status](https://coveralls.io/repos/ec-europa/ne-theme-framework-dev/badge.svg?branch=master&service=github)](https://coveralls.io/github/ec-europa/ne-theme-framework-dev?branch=master)
[![Code Climate](https://codeclimate.com/github/ec-europa/ne-theme-framework-dev/badges/gpa.svg)](https://codeclimate.com/github/ec-europa/ne-theme-framework-dev)

## Requirements

* Node.js >= v4
* npm >= v3.3.x
* Python 2.7

## Install build system

Before we can build the NextEurop a theme framework we need to install the build system
itself. This can be done using Node.js and npm:

```bash
npm install
npm run bower update
```

This will install Bower and Gulp locally as this is the only so far to make it build correctly on ContinuousPHP.

Note: if you have Phing installed globally, you can also use the command:

```bash
phing
```

## Linting

```bash
# Run ESLint
npm run eslint
# Run Stylelint
npm run stylelint
# Run both linters
npm run lint
```

## Developing

```bash
npm run dev
```

Phing alias:

```bash
phing dev
```

## Testing

```bash
npm test
```

## Building the theme

_Not implemented yet_

```bash
npm run build
```

Phing alias
```bash
phing build
```
