/*!
 * jquery-toCurrency Plugin for jQuery
 *
 * Version 0.1.1
 *
 * Copyright 2012, Luca Ongaro
 * Licensed under the MIT license.
 */ 
(function( $ ) {
  "use strict";
  var reverseString = function( str ) {
    return str.split("").reverse().join("");
  };

  $.extend({
    toCurrency: function( val, opts ) {
      var val_str, reverse_whole_part, decimals, i,
          sign = "",
          whole_part = "",
          default_options = {
            precision: 2,
            delimiter: ",",
            separator: ".",
            unit: "&euro;",
            format: "%u %n",
            negativeFormat: false
          };

      opts = $.extend( default_options, opts );

      val = parseFloat(val);
      if( isNaN(val) ) {
        throw new Error( "toCurrency error: invalid number format " + val );
      }
      if ( val < 0 ) {
        sign = "-";
      }

      val_str = val.toFixed( opts.precision ).replace( "-", "" );
      reverse_whole_part = reverseString( val_str.split(".")[0] );
      decimals = ( opts.precision > 0 ? opts.separator : "" ) + ( val_str.split(".")[1] || "" );
   
      for ( i = 0; i < reverse_whole_part.length; i++ ) {
        if ( i % 3 === 0 && i !== 0 ) {
          whole_part += opts.delimiter;
        }
        whole_part += reverse_whole_part.charAt(i);
      }
      whole_part = reverseString( whole_part );

      if ( sign === "-" && opts.negativeFormat ) {
        return opts.negativeFormat.replace( "%n", whole_part + decimals ).replace( "%u", opts.unit );
      } else {
        return opts.format.replace( "%n", sign + whole_part + decimals ).replace( "%u", opts.unit );
      }
    }
  });

  $.fn.toCurrency = function( options ) {
    return this.each(function() {
      $(this).html( $.toCurrency( $(this).text(), options ) );
    });
  };
})( jQuery );