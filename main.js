'use strict';

var Methods = require('./methods');

var opts = {
  maxRoots: 5,
  tol: Math.pow(10, -13),
  f: function (x) {
    return 3 - Math.pow(Math.E, (Math.sin(2*(Math.pow(x, 2))) + Math.cos(Math.pow(x, 2))));
  }
};

console.log('\nBisect Method: ');
var lowers = [0, 1, 2, 2.6, 3];
var uppers = [1, 2, 2.6, 3, 3.6];

for (var i = 0; i < lowers.length; i++) {
  opts.lowerLimit = lowers[i];
  opts.upperLimit = uppers[i];
  opts.middle = (opts.lowerLimit + opts.upperLimit) / 2;

  console.log(Methods.bisect(opts));
}

console.log('\nFalsi Method: ');
lowers = [0.2, 1, 2.5, 2.7, 3.51];
uppers = [0.3, 1.1, 2.6, 2.8, 3.56];

for (var i = 0; i < lowers.length; i++) {
  opts.lowerLimit = lowers[i];
  opts.upperLimit = uppers[i];

  console.log(Methods.falsi(opts));
}

console.log('\nChord Method: ');
lowers = [0.2, 1, 2.5, 2.7, 3.5];
uppers = [0.25, 2, 2.6, 2.8, 3.6];

for (var i = 0; i < lowers.length; i++) {
  opts.lowerLimit = lowers[i];
  opts.upperLimit = uppers[i];

  console.log(Methods.chord(opts));
}

console.log('\nSecant Method: ');
lowers = [0.2, 1, 2.5, 2.7, 3.51];
uppers = [0.3, 1.1, 2.6, 2.8, 3.56];

for (var i = 0; i < lowers.length; i++) {
  opts.lowerLimit = lowers[i];
  opts.upperLimit = uppers[i];

  console.log(Methods.secant(opts));
}

console.log('\nNewton\' Method: ');
lowers = [0.2, 1, 2.5, 2.7, 3.51];
uppers = [0.3, 1.1, 2.6, 2.8, 3.56];

opts.fDeriv = function (x) {
  return -1 * Math.pow(Math.E, Math.sin(2 * x * x) + Math.cos(x * x)) * (Math.cos(2 * x * x) * 4 * x - Math.sin(x * x) * 2 * x);
};
for (var i = 0; i < lowers.length; i++) {
  opts.lowerLimit = lowers[i];
  opts.upperLimit = uppers[i];

  console.log(Methods.newton(opts));
}
