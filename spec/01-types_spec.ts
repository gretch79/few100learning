describe('variables and constants and stuff', () => {
    describe('declaring variables', () => {
        it('using let to create a binding', () => {
            let name;

            name = 'Joe';
            expect(name).toBe('Joe');

            name = 11;
            expect(name).toBe(11);
        });
        it('some typescript stuff for variables', () => {
            let name: string | number = 'Joe'; //Union Type

            expect(name).toBe('Joe');

            name = 11;
            expect(name).toBe(11);
        });
        it('declaring constants', () => {
            const PI = 3.1415927;

            const FAVORITE_NUMBERS = [9, 22, 108];

            //FAVORITE_NUMBERS = []; can't do this (assign to new array)
            FAVORITE_NUMBERS[0] = 10; // can do this (update part of the array)

            const MOVIE = {
                title: 'The Force Awakens',
                director: 'Abrams'
            };

            MOVIE.director = 'Johnson';
        });
        it('var is still there but it stinks and should NOT be used', () => {
            if (true) {
                var name = 'Fido'; //change var to let and it fails (like it should) for scoping reasons
            }

            expect(name).toBe('Fido');
        });
    });
    describe('strings', () => {
        it('delimiting', () => {
            let first = 'Joe',
                last = "Schmidt";
            expect("Joe").toBe(first);

            let msg = "She told \"Get Lost!\"";
            let msg2 = 'She told me "Get Lost!"';

            let story = `Chapter 1.
        
It was a drak and stormy night`;
            console.log(story);

            let fullName = `That is ${last}, ${first}`;  // only works with back tick, not with single or double quote
            expect(fullName).toBe('That is Schmidt, Joe');
        });
    });
});