import { sortObjectArray } from './sort.util';

const sortable: Array<ITestable> = [
    { member: 'What is love?', other: 43 },
    { member: 'yeaaah yeaah yeaah whats going on?', other: 88 },
    { member: 'never going to give you up', other: 11 },
    { member: 'ooo mandy when you..', other: 75 },
    { member: 'take on me...', other: 85 },
    { member: 'you can dance if you want to...', other: 75 },
    { member: 'take on me' },
    { member: 'take on me...', other: 85 },
    { member: 'you can dance if you want to...', other: 1785 },
];

interface ITestable {
    member: string;
    other?: number;
}

describe('SortUtil', () => {
    it('sortObjectArray ASC 1 Field', () => {
        sortObjectArray(sortable, { propertyName: 'member', sortOrder: 'ASC' });

        expect(sortable[0].member).toBe('never going to give you up');
        expect(sortable[1].member).toBe('ooo mandy when you..');
        expect(sortable[2].member).toBe('take on me');
        expect(sortable[3].member).toBe('take on me...');
        expect(sortable[4].member).toBe('take on me...');
        expect(sortable[5].member).toBe('What is love?');
        expect(sortable[6].member).toBe('yeaaah yeaah yeaah whats going on?');
        expect(sortable[7].member).toBe('you can dance if you want to...');
        expect(sortable[8].member).toBe('you can dance if you want to...');
    });

    it('sortObjectArray DESC 1 Field', () => {
        sortObjectArray(sortable, { propertyName: 'member', sortOrder: 'DESC' });

        expect(sortable[8].member).toBe('never going to give you up');
        expect(sortable[7].member).toBe('ooo mandy when you..');
        expect(sortable[6].member).toBe('take on me');
        expect(sortable[5].member).toBe('take on me...');
        expect(sortable[4].member).toBe('take on me...');
        expect(sortable[3].member).toBe('What is love?');
        expect(sortable[2].member).toBe('yeaaah yeaah yeaah whats going on?');
        expect(sortable[1].member).toBe('you can dance if you want to...');
        expect(sortable[0].member).toBe('you can dance if you want to...');

    });

    it('sortObjectArray DESC on number field', () => {
        sortObjectArray(sortable, { propertyName: 'other', sortOrder: 'DESC' });

        expect(sortable[1].other).toBe(1785);
        expect(sortable[2].other).toBe(88);
        expect(sortable[3].other).toBe(85);
        expect(sortable[4].other).toBe(85);
        expect(sortable[5].other).toBe(75);
        expect(sortable[6].other).toBe(75);
        expect(sortable[7].other).toBe(43);
        expect(sortable[8].other).toBe(11);
        expect(sortable[0].other).toBeUndefined();

    });


    it('sortObjectArray DESC first field, ASC second field', () => {
        sortObjectArray(sortable, { propertyName: 'other', sortOrder: 'DESC' }, { propertyName: 'member', sortOrder: 'ASC' });

        expect(sortable[1].other).toBe(1785);
        expect(sortable[1].member).toBe('you can dance if you want to...');
        expect(sortable[2].other).toBe(88);
        expect(sortable[2].member).toBe('yeaaah yeaah yeaah whats going on?');
        expect(sortable[3].other).toBe(85);
        expect(sortable[3].member).toBe('take on me...');
        expect(sortable[4].other).toBe(85);
        expect(sortable[4].member).toBe('take on me...');
        expect(sortable[5].other).toBe(75);
        expect(sortable[5].member).toBe('ooo mandy when you..');
        expect(sortable[6].other).toBe(75);
        expect(sortable[6].member).toBe('you can dance if you want to...');
        expect(sortable[7].other).toBe(43);
        expect(sortable[7].member).toBe('What is love?');
        expect(sortable[8].other).toBe(11);
        expect(sortable[8].member).toBe('never going to give you up');
        expect(sortable[0].other).toBeUndefined();
        expect(sortable[0].member).toBe('take on me');
    });

    it('sortObjectArray DESC first field, DESC second field', () => {
        sortObjectArray(sortable, { propertyName: 'other', sortOrder: 'DESC' }, { propertyName: 'member', sortOrder: 'DESC' });

        expect(sortable[1].other).toBe(1785);
        expect(sortable[1].member).toBe('you can dance if you want to...');
        expect(sortable[2].other).toBe(88);
        expect(sortable[2].member).toBe('yeaaah yeaah yeaah whats going on?');
        expect(sortable[3].other).toBe(85);
        expect(sortable[3].member).toBe('take on me...');
        expect(sortable[4].other).toBe(85);
        expect(sortable[4].member).toBe('take on me...');
        expect(sortable[5].other).toBe(75);
        expect(sortable[5].member).toBe('you can dance if you want to...');
        expect(sortable[6].other).toBe(75);
        expect(sortable[6].member).toBe('ooo mandy when you..');
        expect(sortable[7].other).toBe(43);
        expect(sortable[7].member).toBe('What is love?');
        expect(sortable[8].other).toBe(11);
        expect(sortable[8].member).toBe('never going to give you up');
        expect(sortable[0].other).toBeUndefined();
        expect(sortable[0].member).toBe('take on me');
    });

    it('sortObjectArray on Author and id', () => {
        const sortStuff = [
            { index: 1, name: 'Alex Eagle' },
            { index: 2, name: 'Alex Eagle' },
            { index: 3, name: 'Alex Eagle' },
            { index: 4, name: 'Alex Eagle' },
            { index: 5, name: 'Alex Eagle' },
            { index: 6, name: 'Alex Eagle' },
            { index: 7, name: 'Alex Eagle' },
            { index: 8, name: 'Alex Eagle' },
            { index: 9, name: 'Alex Eagle' },
            { index: 10, name: 'Alex Eagle' },
            { index: 11, name: 'Alex Eagle' },
            { index: 12, name: 'Xenorth' },
            { index: 13, name: 'Xenorth' },
            { index: 14, name: 'Xenorth' },
            { index: 15, name: 'Chuck Norris' },
            { index: 16, name: 'Chuck Norris' },
            { index: 17, name: 'Chuck Norris' },
            { index: 18, name: 'Chuck Norris' },
            { index: 19, name: 'Alex Eagle' },
            { index: 20, name: 'Alex Eagle' },
            { index: 21, name: 'Alex Eagle' },
        ];
        sortObjectArray(sortStuff, { propertyName: 'name', sortOrder: -1 }, { propertyName: 'index', sortOrder: -1 });
        expect(sortStuff[0].index).toBe(1);
    });
});
