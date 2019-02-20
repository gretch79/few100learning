import { roundToTwoPlaces } from "./utils";
describe('destructuring', () => {
    it('destructuring arrays', () => {
        const friends = ['sean', 'billy', 'david', 'sarah', 'mo'];

        const f1 = friends[0];
        const f2 = friends[1];
        expect(f1).toBe('sean');
        expect(f2).toBe('billy');

        const [d1, d2] = friends;
        expect(d1).toBe('sean');
        expect(d2).toBe('billy');

        const [e1, , e2, ...rest] = friends;
        expect(e1).toBe('sean');
        expect(e2).toBe('david');
        expect(rest).toEqual(['sarah', 'mo']);
    });

    it('destructuring objects', () => {
        const friends = {
            number1: 'sean',
            number4: 'sarah',
            number3: 'david',
            number2: 'billy',
            number5: 'mo'
        };

        const { number1, number2 } = friends;
        expect(number1).toBe('sean');
        expect(number2).toBe('billy');

        const { number4: g1, number5: g2 } = friends;
        expect(g1).toBe('sarah');
        expect(g2).toBe('mo');

        const { number1: n1, ...other } = friends;
        expect(n1).toBe('sean'); //toBe is this exactly the same object
        expect(other).toEqual({ //toEqual is this equal to this other object
            number4: 'sarah',
            number3: 'david',
            number2: 'billy',
            number5: 'mo'
        });
    });
});

describe('array methods', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    it('forEach allows you to look at each member this doesn\'t produce anything!)', () => {
        numbers.forEach((element) => console.log(element));
    });
    describe('methods that produce a new array', () => {
        it('selecting just specific stuff from an array', () => {
            const evens = numbers.filter(n => n % 2 === 0);
            expect(evens).toEqual([2, 4, 6, 8]);
            expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]); //just showing it doesn't change the original array
            expect("").toBeFalsy();
            expect(" ").toBeTruthy();
        });

        /* xit('example', () => {
             let movie = { title: 'Jaws', director: 'Spielberg', yearReleased: 1977 };
 
             let movie2 = { title: 'Star Wars', director: 'Lucas' };
 
             const movies = [movie, movie2];
             movies.forEach(m => {
                 let msg = `Movie ${m.title} by ${m.director}`;
                 if (m.yearReleased) {
                     msg += ` was released in ${m.yearReleased}`;
                 }
                 console.log(msg);
             });
 */
        it('map lets you transform each element of the source array', () => {
            //if there's a place you want to go, it'll get your there you know.  it's the map.  it's the map.  it's the map
            const doubled = numbers.map(n => n * 2);
            expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
        });


        it('a quick practice', () => {
            interface Vehicle {
                vin: string;
                makeAndModel: string;
                mileage: number;
            }
            const vehicles: Vehicle[] = [
                { vin: '9999', makeAndModel: 'Chevy Tahoe', mileage: 182000 },
                { vin: 'aka92', makeAndModel: 'Toyota Prius', mileage: 89999 },
                { vin: 'kduwi', makeAndModel: 'Ford Explorer', mileage: 99998 }
            ];
            const answer = ['Toyota Prius', 'Ford Explorer'];

            // find all the vehicles with < 100_000, but just give me the make and model.

            const result = vehicles             //all of the vehicles
                .filter(v => v.mileage < 100000)     //just the vehicle objects with <100000
                .map(v => v.makeAndModel);            // an array of strings that are just the make and model of those

            expect(result).toEqual(answer);
        });

        it('another example', () => {
            interface Product {
                id: number;
                description: string;
                cost: number;
            }

            const products: Product[] = [
                { id: 1, description: 'Eggs', cost: 1.99 },
                { id: 2, description: 'Beer', cost: 7.99 },
                { id: 3, description: 'Chips', cost: 2.99 },
            ];

            // our price markup is 30%.
            // for each product create an array of objects that look like this:
            interface SaleItem {
                id: number;
                description: string;
                price: number;
            }

            // but only if the price is > $5.00 
            //mine
            const res = products.map(p => {
                let price = p.cost;
                if (p.cost > 5)
                    price = p.cost * 1.3;
                const ret: SaleItem = {
                    id: p.id,
                    description: p.description,
                    price: price
                };
                return ret;
            });
            console.log(res);

            //his
            const answer: SaleItem[] = products
                .map(p => {
                    const result: SaleItem = {
                        id: p.id,
                        description: p.description,
                        price: p.cost * 1.30
                    };
                    return result;
                }).filter(si => si.price > 5.00);

            expect(answer).toEqual([{ id: 2, description: 'Beer', price: 10.387 }]);

        });
        it('another take on that example', () => {
            interface Product {
                id: number;
                description: string;
                cost: number;
            }

            const products: Product[] = [
                { id: 1, description: 'Eggs', cost: 1.99 },
                { id: 2, description: 'Beer', cost: 7.99 },
                { id: 3, description: 'Chips', cost: 2.99 },
            ];

            // our price markup is 30%.
            // for each product create an array of objects that look like this:
            interface SaleItem {
                id: number;
                description: string;
                price: number;
            }

            // but only if the price is > $5.00
            function makeSaleItemFromProduct(product: Product): SaleItem {
                const result: SaleItem = {
                    id: product.id,
                    description: product.description,
                    price: roundToTwoPlaces(product.cost * 1.3)
                };
                return result;
            }

            function highPricedItems(item: SaleItem) {
                return item.price > 5.00;
            }
            const answer: SaleItem[] = products
                .map(makeSaleItemFromProduct).filter(highPricedItems);

            expect(answer).toEqual([{
                id: 2, description: 'Beer', price: 10.39
            }]);


        });
    });
    describe('methods that produce a single value (scalar)', () => {
        it('has methods to check the membership of an array', () => {
            expect(numbers.some(n => n > 8)).toBe(true);
            expect(numbers.every(n => n < 10)).toBe(true);
        });
        it('has reduce', () => {
            expect(numbers.reduce((p, c) => p + c)).toBe(45);
            expect(numbers.reduce((p, c) => { console.log({ p, c }); return p + c; }, 100));
        });
        it('an example', () => {
            interface Vehicle {
                vin: string;
                makeAndModel: string;
                mileage: number;
            }
            const vehicles: Vehicle[] = [
                { vin: '9999', makeAndModel: 'Chevy Tahoe', mileage: 182000 },
                { vin: 'aka92', makeAndModel: 'Toyota Prius', mileage: 89999 },
                { vin: 'kduwi', makeAndModel: 'Ford Explorer', mileage: 99998 }
            ];

            // I want the make and model of the car with the highest mileage (don't worry about ties. that can be homework)


            interface TempResult {
                makeAndModel: string;
                mileage: number;
            }
            const initialState: TempResult = {
                makeAndModel: null,
                mileage: -1
            };
            const answer = vehicles
                .reduce((state, next) => {
                    if (next.mileage > state.mileage) {
                        return {
                            makeAndModel: next.makeAndModel,
                            mileage: next.mileage
                        };
                    } else {
                        return state;
                    }

                }, initialState).makeAndModel;

            expect(answer).toBe('Chevy Tahoe');

        });

        it('ok one more example', () => {

            const friends = ['sean', 'billy', 'stacey', 'david'];

            interface Answer {
                list: string;
                numberOfFriends: number;
            }
            const initialState: Answer = {
                list: '',
                numberOfFriends: 0
            }
            const answer = friends
                .map(f => f.toUpperCase())
                .reduce((state, next) => {
                    return {
                        list: state.list ? state.list + ' ' + next : next,
                        numberOfFriends: state.numberOfFriends + 1
                    }
                }, initialState)

            expect(answer.list).toBe('SEAN BILLY STACEY DAVID');
            expect(answer.numberOfFriends).toBe(4);
        });
        it('final example and I mean it', () => {

            interface Action {
                type: string;
            }

            const stuffThatHappened: Action[] = [
                { type: 'ADDED' },
                { type: 'ADDED' },
                { type: 'SUBTRACTED' },
                { type: 'ADDED' },
            ];

            const initialState = 0;

            const answer = stuffThatHappened.reduce((state, next) => {
                switch (next.type) {
                    case 'ADDED': {
                        return state + 1;
                    }
                    case 'SUBTRACTED': {
                        return state - 1;
                    }
                }
            }, initialState)

            expect(answer).toBe(2);
        });

    });
});