'use strict';

module.exports = {
  bisect: function (opts) {
    var middle = opts.middle;
    while ( (opts.upperLimit - opts.lowerLimit) >= opts.tol) {
      if ((opts.f(opts.lowerLimit) * opts.f(middle)) < 0) {
        opts.upperLimit = middle;
      }
      if ((opts.f(opts.lowerLimit) * opts.f(middle)) > 0) {
        opts.lowerLimit = middle;
      }
      middle = (opts.lowerLimit + opts.upperLimit) / 2;
    }
    return middle;
  },

  falsi: function (opts) {
    var f = opts.f;
    var fa = f(opts.lowerLimit);
    var fb = f(opts.upperLimit);
    var side = 0;
    var fc, c1;

    var c = ((fb * opts.lowerLimit - fa * opts.upperLimit) / (fb - fa)) + 100000 * opts.tol;

    while (true) {
      c1 = c;
      c = ((fb * opts.lowerLimit - fa * opts.upperLimit) / (fb - fa));
      if ((Math.abs(c - c1) < opts.tol) || (Math.abs(fc) < opts.tol)) {
        break;
      }
      fc = f(c);
      if (fc * fa > 0) {
        opts.lowerLimit = c;
        fa = fc;
        if (side === -1) {
          fb /= 2;
        }
        side = -1;
      } else if (fb * fc > 0) {
        opts.upperLimit = c;
        fb = fc;
        if (side === +1) {
          fa /= 2;
        }
        side = +1;
      } else {
        break;
      }
    }
    return c;
  },

  chord: function (opts) {
    var f = opts.f;
    var c, x2, x3;

    c = opts.lowerLimit;
    x2 = opts.upperLimit;
    x3 = (c*f(x2) - x2*f(c))/(f(x2)-f(c));
    while ((Math.abs(x3 - x2) >= opts.tol) && (Math.abs(f(x3)) >= opts.tol)) {
      x2 = x3;
      x3 = (c*f(x2) - x2*f(c))/(f(x2)-f(c));
    }
    return x3;
  },

  secant: function (opts) {
    var f = opts.f;
    var x1, x2, x3;

    x1 = opts.lowerLimit;
    x2 = opts.upperLimit;
    x3 = (x1*f(x2) - x2*f(x1))/(f(x2)-f(x1));
    while ((Math.abs(x3 - x2) >= opts.tol) && (Math.abs(f(x3)) >= opts.tol)) {
      x1 = x2;
      x2 = x3;
      x3 = (x1*f(x2) - x2*f(x1))/(f(x2)-f(x1));
    }
    return x3;
  },

  newton: function (opts) {
    var f = opts.f;
    var x, x1;

    x1 = (opts.lowerLimit + opts.upperLimit)/2;
    x = x1 - f(x1) / opts.fDeriv(x1);
    while ((Math.abs(x - x1) >= opts.tol) && (Math.abs(f(x)) >= opts.tol)) {
      x1 = x;
      if (opts.fDeriv(x1) === 0) {
        break;
      }
      x = x1 - f(x1)/opts.fDeriv(x1);
    }
    return x;
  }
  // falsi: function (opts) {
  //   var middle = (opts.lowerLimit + opts.upperLimit) / 2;
  //   var getRoot = function (lowerLimit, upperLimit) {
  //     var fc = opts
  //     c = ((fb*a - fa*b) / (fb - fa)) + 100000*e;
  //     while (1)
  //     {
  //       c1 = c;
  //       c = (fb*a - fa*b) / (fb - fa);
  //       if ((fabs(c - c1) < e) || (fabs(fc) < e))
  //         return;
  //       fc = f(c);
  //
  //       if (fc * fa > 0) {
  //         a = c;
  //         fa = fc;
  //         if (side==-1)
  //           fb /= 2;
  //         side = -1;
  //       }//if
  //       else
  //        if (fb * fc > 0) {
  //          b = c;
  //          fb = fc;
  //          if (side==+1)
  //            fa /= 2;
  //          side = +1;
  //        }//if
  //        else
  //          break;
  //       n++;
  //     }//while
  //     return c;
  //   }
  // }
};
