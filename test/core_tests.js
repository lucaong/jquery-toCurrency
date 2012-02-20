$(document).ready(function() {
  test('$.toCurrency', function() {
    equal($.toCurrency("1234567.123"), "&euro; 1,234,567.12", "it should accept String and apply default formatting");
    equal($.toCurrency(1234567.123), "&euro; 1,234,567.12", "it should accept Number and apply default formatting");
    equal($.toCurrency("1234567.126"), "&euro; 1,234,567.13", "it should apply a correct approximation");
    equal($.toCurrency("-1234567.123"), "&euro; -1,234,567.12", "it should handle negative number");
    equal($.toCurrency("1234567.123", {precision: 3}), "&euro; 1,234,567.123", "it should apply custom precision");
    equal($.toCurrency("1234567.123", {precision: 0}), "&euro; 1,234,567", "it should't use a separator when precision = 0");
    equal($.toCurrency("1234567.123", {delimiter: "|"}), "&euro; 1|234|567.12", "it should apply custom delimiter");
    equal($.toCurrency("1234567.123", {separator: ":"}), "&euro; 1,234,567:12", "it should apply custom separator");
    equal($.toCurrency("1234567.123", {unit: "pint"}), "pint 1,234,567.12", "unit option");
    equal($.toCurrency("1234567.123", {format: "<%n>[%u]"}), "<1,234,567.12>[&euro;]", "it should apply custom format");
    equal($.toCurrency("-1234567.123", {negativeFormat: "(%u %n)"}), "(&euro; 1,234,567.12)", "it should apply custom negativeFormat");
    equal($.toCurrency("1234567.123", {negativeFormat: "(%u %n)"}), "&euro; 1,234,567.12", "negativeFormat should not impact on positive numbers");
  });
  test('$(selector).toCurrency()', function() {
    equal($("#test1").toCurrency({unit: "pints", precision: 3}).text(), "pints 1,234,567.123", "it should apply substitution and accept options");
    ok($("#1.test2").toCurrency({unit: "pints", precision: 3}).text() == "pints 1,234,567.123" && $("#2.test2").toCurrency({unit: "pints", precision: 3}).text() == "pints 7,654,321.321", "it should handle multiple elements");
  });
});
