/*!
 * jquery-toCurrency Plugin for jQuery
 *
 * Version 0.1.2
 *
 * Copyright 2012, Luca Ongaro
 * Licensed under the MIT license.
 */ 
(function( $ ) {
  "use strict";
  $.extend({
    toCurrency: function( val, opts ) {
      var decimals, whole_part,
          sign = "",
          regexp = /(\d+)(\d{3})/,
          default_options = {
            precision: 2,
            delimiter: ",",
            separator: ".",
            unit: "&euro;",
            format: "%u %n",
            negativeFormat: false
          };

      opts = $.extend( default_options, opts );

      val = parseFloat( val );
      if( isNaN(val) ) {
        throw new Error( "toCurrency error: invalid number format " + val );
      }
      if ( val < 0 ) {
        sign = "-";
      }

      val = val.toFixed( opts.precision ).replace( "-", "" );
      whole_part = val.split(".")[0];
      decimals = ( opts.precision > 0 ? opts.separator : "" ) + ( val.split(".")[1] || "" );
   
      while ( regexp.test( whole_part ) ) {
        whole_part = whole_part.replace( regexp, "$1" + opts.delimiter + "$2" );
      }

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