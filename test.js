const λ = require('fantasy-check').adapters.nodeunit

λ.forAll(
       function(n) {
           return n + n == 2 * n;
       },
       [Number]
   ).fold(
       function(fail) {
           return "Failed after " + fail.tries + " tries: " + fail.inputs.toString();
       },
       "All tests passed!"
   )
