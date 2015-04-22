'use strict';

var Promise = require('bluebird');
var Canvas = require('canvas');
var Image = Canvas.Image;

var getSmoothing = function (options) {
  if (options['canvas-smoothing'] === 'false' || options['canvas-smoothing'] === false) {
    return false;
  }
  return true;
};

var getImage = function (tile, opt) {
  return new Promise(function (resolve) {
    var img = new Image();
    img.onload = function () {
      tile.canvasImage = img;
      resolve(tile);
    };
    img.onerror = function (err) {
      opt.log.warn('Ignoring ' + tile.path + ' -> ' + err.toString() + '. Image format not supported by canvas?');
      resolve();
    };
    img.src = tile.contents;
  });
};

var resize = function (image, opt) {
  return new Promise(function (resolve, reject) {
    var canvas = new Canvas(opt.width, opt.height);
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = getSmoothing(opt.options);
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0, opt.width, opt.height);
      resolve({
        contents: new Buffer(canvas.toBuffer()),
        width: canvas.width,
        height: canvas.height
      });
    };
    img.onerror = function (err) {
      opt.log.error('Error loading base image for resizing');
      reject(err);
    };
    img.src = image.contents;
  });
};

module.exports = {
  create: function (tiles, opt) {
    var canvas = new Canvas(opt.width, opt.height);
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = getSmoothing(opt.options);

    return Promise.map(tiles, function (tile) {
        return getImage(tile, opt)
          .then(function (t) {
            if (t) {
              ctx.drawImage(t.canvasImage, t.x + t.offset, t.y + t.offset);
            }
            return true;
          });
      }, {concurrency: 1})
      .then(function () {
        return {
          contents: new Buffer(canvas.toBuffer()),
          width: canvas.width,
          height: canvas.height
        };
      });
  },
  scale: function (base, opt) {
    return resize(base, opt);
  }
};
