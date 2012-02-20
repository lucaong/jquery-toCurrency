/*!
 * jquery-toCurrency Plugin for jQuery
 *
 * Version 0.1.0
 *
 * Copyright 2012, Luca Ongaro
 * Licensed under the MIT license.
 */ 
(function( $ ){
  $.toCurrency = function(val, opts) {
    var defaultOptions = {
          precision: 2,
          delimiter: ",",
          separator: ".",
          unit: "&euro;",
          format: "%u %n",
          negativeFormat: false
        };
    opts = $.extend(defaultOptions, opts);
    
    try {
      var amount = parseFloat(val),
          amountStr = amount.toFixed(opts.precision).toString();
    }
    catch (e) {
      throw('toCurrency: invalid number format with value ' + val)
      return null;
    }

    var sign = amountStr.indexOf('-') >= 0 ? '-' : '';
    amountStr = amountStr.replace('-', '');

    var amtLen = amountStr.length,
        separatorIdx = amountStr.indexOf('.'),
        wholeNumberEnd = separatorIdx > 0 ? amtLen - (amtLen - separatorIdx) : amtLen,
        wholeNumber = amountStr.substr(0, wholeNumberEnd),
        decimals = (opts.precision > 0) ? opts.separator + amountStr.substr(wholeNumberEnd + 1, amtLen - wholeNumberEnd) : "",
        segments = (wholeNumberEnd - (wholeNumberEnd % 3)) / 3,
        reverseNumber = wholeNumber.split('').reverse().join(''),
        number = '';
        
    for (i = 0; i < wholeNumberEnd; i++) {
      if (i % 3 == 0 && i != 0 && i != wholeNumberEnd) { number += opts.delimiter; }
      number += reverseNumber.charAt(i);
    }
    
    if (sign == '-' && opts.negativeFormat) {
      return opts.negativeFormat.replace('%n', number.split('').reverse().join('') + decimals).replace('%u', opts.unit);
    } else {
      return opts.format.replace('%n', sign + number.split('').reverse().join('') + decimals).replace('%u', opts.unit);
    }
  }
  
  $.fn.toCurrency = function( options ) {
    return this.each(function() {
      $(this).html($.toCurrency($(this).text(), options))
    });
  };
})( jQuery );