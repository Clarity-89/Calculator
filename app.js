/**
 * Created by Alex on 26/10/2015.
 */
(function ($) {

    var output = $('#output'),
        button = $('.btn');

    function Calculator() {
        this.expression = '';
        this.operation = false;
    }

    Calculator.prototype = {
        makeExpression: function (input) {

            /*if (!this.operation) {

             if (isNaN(input) && input !== '.') {
             this.operation = true;
             console.log(this.expression);
             } else {
             this.expression += input;
             }
             } else {
             if (isNaN(input) && input !== '.') {
             this.calculate(this.expression);
             this.expression += input;
             this.operation = false;
             } else {
             this.expression += input;
             }
             }*/

            if (!this.expression) {
                if (input === 'C') {
                    output.text('0');
                } else if (!isNaN(input)) {
                    this.expression += input;
                    output.text(this.expression);
                }
            } else {
                if (isNaN(this.expression[this.expression.length - 1]) && isNaN(input)) {
                    this.expression[this.expression.length - 1] = input;
                    output.text(this.expression);
                } else if (input === '=') {
                    this.calculate();
                    this.expression = '';
                } else if (input === 'C') {
                    this.expression = '';
                    output.text('0');
                } else if (input === 'CE') {
                    if (!isNaN(this.expression[this.expression.length - 1])) {
                        this.expression = this.expression.substring(0, this.expression.length - 1);
                        output.text(this.expression);
                    }
                }
                else {
                    this.expression += input;
                    output.text(this.expression);
                }

            }
            console.log('res', this.expression)
            return this.expression;
        },

        calculate: function () {
            this.expression = eval(this.expression);
            output.text(this.expression);
            return this.expression;
        },
        parseInput: function (input) {
            switch (input) {
                case '\xD7':
                    return '*';
                case '\xF7':
                    return '/';
                case '\u221A':
                    return 'sqrt';
                default:
                    return input;
            }
        }
    };

    var calculator = new Calculator();
    button.on('click', function () {
        var value = $(this).val();
        //console.log(value)
        calculator.makeExpression(calculator.parseInput(value));
    });
})(jQuery);