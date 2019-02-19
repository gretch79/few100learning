describe('funtions', () => {
    describe('syntax for creating them', () => {
        it('declaring them', () => {
            // Named Functions - can reference it before it's actually located in the file (forward reference)
            function add(a: number, b: number) {
                return a + b;
            }
            expect(add(3, 3)).toBe(6);

            //Anonymous Functions - can't be forward referenced
            // -- an anonymous function that I immediately invoke

            expect((function (a, b) { return a / b; })(10, 5)).toBe(2);

            const multiply = function (a: number, b: number) { return a * b; };
            expect(multiply(3, 3)).toBe(9);

            const divide = (a: number, b: number) => a / b;
            expect(divide(10, 2)).toBe(5);

            const logIt = (msg: string) => {
                msg = msg.toUpperCase();
                console.log(msg);
                return true;
            };
            expect(logIt('Hi World')).toBe(true);
        });
    });
    describe('higher order functions', () => {
        // A higher order function is a function that takes as an argument one or more functions and/or returns a function
        it('first example', () => {

           

        });
    });
});