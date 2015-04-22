# sprity-canvas

[![NPM version](https://badge.fury.io/js/sprity-canvas.svg)](http://badge.fury.io/js/sprity-canvas) [![Build Status](https://travis-ci.org/sprity/sprity-canvas.svg?branch=master)](https://travis-ci.org/sprity/sprity-canvas) [![Dependencies](https://david-dm.org/sprity/sprity-canvas.svg)](https://david-dm.org/sprity/sprity-canvas)

> Image processor for [sprity](https://npmjs.org/package/sprity) that uses [canvas](https://www.npmjs.com/package/canvas) as its image processing library.

## Requirements

- [sprity](https://npmjs.org/package/sprity) version >= 1.0
- [node-canvas](https://www.npmjs.com/package/canvas) which depends on [Cairo](http://cairographics.org/).
  - Please refer to the [installation guide](https://github.com/Automattic/node-canvas/wiki).

## Install

* install [Cairo](http://cairographics.org/)
* install sprity-canvas

```sh
npm install sprity sprity-canvas
```

If you want to use the command line interface of `sprity` install it globally.

```
npm install sprity sprity-canvas -g
```

## Limitations

* at the moment **only supports png**

## Options

* **canvas-smoothing:** If false disables imageSmoothing on canvas [*Default:* true]

## Usage

See [sprity](https://npmjs.org/package/sprity) documentation
