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
    var default_options = {
          precision: 2,
          delimiter: ",",
          separator: ".",
          unit: "&euro;",
          format: "%u %n",
          negativeFormat: false
        },
        val_str, sign, reverse_whole_part, decimals, whole_formatted = '';
    opts = $.extend(default_options, opts);
    
    try {
      val_str = parseFloat(val).toFixed(opts.precision).toString();
    }
    catch (e) {
      throw new Error('toCurrency: invalid number format with value ' + val);
      return null;
    }

    sign = val_str.indexOf('-') >= 0 ? '-' : '';
    val_str = val_str.replace('-', '');

    reverse_whole_part = val_str.split('.')[0].split('').reverse().join('');
    decimals = (opts.precision > 0 ? opts.separator : '') + (val_str.split('.')[1] || '');
        
    for (i = 0; i < reverse_whole_part.length; i++) {
      if (i % 3 == 0 && i != 0 && i != reverse_whole_part.length) { whole_formatted += opts.delimiter; }
      whole_formatted += reverse_whole_part.charAt(i);
    }
    whole_formatted = whole_formatted.split('').reverse().join('');
    
    if (sign == '-' && opts.negativeFormat) {
      return opts.negativeFormat.replace('%n', whole_formatted + decimals).replace('%u', opts.unit);
    } else {
      return opts.format.replace('%n', sign + whole_formatted + decimals).replace('%u', opts.unit);
    }
  }
  
  $.fn.toCurrency = function( options ) {
    return this.each(function() {
      $(this).html($.toCurrency($(this).text(), options))
    });
  };
})( jQuery );