import * as _ from 'lodash';
import { formatName } from "./utils";

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

            const answer = formatName('Han', 'Solo', makeItUpper);
            expect(answer).toBe('SOLO, HAN');

            const answer2 = formatName('Han', 'Solo', (x: string) => `***${x}***`);
            expect(answer2).toBe('***Solo, Han***');
            function makeItUpper(what: string) {
                return what.toUpperCase();
            }
        });
        describe('a function that returns a function', () => {
            it('a way to do it that doesn\'t seem crazy', () => {


                // <h1>Hello</h1>
                //  tag, content
                // straight ahead procedural function type thing.
                function makeElement(tag: string, content: string) {
                    return `<${tag}>${content}</${tag}>`;
                }

                expect(makeElement('h1', 'Hello')).toBe('<h1>Hello</h1>');
                expect(makeElement('p', 'the story')).toBe('<p>the story</p>');
            });
            it('you could try oop', () => {
                class ElementMaker {
                    tag: string;
                    constructor(tag: string) {
                        this.tag = tag;
                    }

                    make(content: string) {
                        return `<${this.tag}>${content}</${this.tag}>`;
                    }
                }

                const h1Maker = new ElementMaker('h1');

                expect(h1Maker.make('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker.make('Big!')).toBe('<h1>Big!</h1>');
            });
            it('a higher-order function version', () => {
                function tagMaker(tag: string) {
                    return (content: string) => `<${tag}>${content}</${tag}>`;
                }

                const h1Maker = tagMaker('h1');
                const pMaker = tagMaker('p');
                expect(h1Maker('Big!')).toBe('<h1>Big!</h1>');
                expect(pMaker('small')).toBe('<p>small</p>');
            });
        });
    });
});
describe('some lodash goodness', () => {
    it('supports memoization', () => {
        function doSomeHardWork() {
            console.log('Doing Hard Work Here!');
            return 'Work Is Done!';
        }
        const memo = _.memoize(doSomeHardWork);

        expect(memo()).toBe('Work Is Done!');
        expect(memo()).toBe('Work Is Done!');
        expect(memo()).toBe('Work Is Done!');
        expect(memo()).toBe('Work Is Done!');
        expect(memo()).toBe('Work Is Done!');
        expect(memo()).toBe('Work Is Done!');
        expect(memo()).toBe('Work Is Done!');
        expect(memo()).toBe('Work Is Done!');

    });
    it('currying', () => {
        function makeElement(tag: string, content: string) {
            return `<${tag}>${content}</${tag}>`;
        }

        const curriedTagMaker = _.curry(makeElement);
        const h1Maker = curriedTagMaker('h1');
        const pMaker = curriedTagMaker('p');

        expect(h1Maker('Hello')).toBe('<h1>Hello</h1>');
        expect(pMaker('see you tomorrow')).toBe('<p>see you tomorrow</p>');
    });
});