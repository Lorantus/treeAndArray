const tree = {
    id: 'root-1',
    name: 'Root',
    children: [{
        id: 'leaf-1',
        name: 'Leaf 1',
        children: [{
            id: 'leaf-1-1',
            name: 'Leaf 1-1',
            children: [{
                id: 'leaf-1-1-1',
                name: 'Leaf 1-1-1',
                children: [],
            }, {
                id: 'leaf-1-1-2',
                name: 'Leaf 1-1-2',
                children: []
            }]
        }],
    }, {
        id: 'leaf-2',
        name: 'Leaf 2',
        children: []
    }]
};

const searchInTree = (predicate, stack) => 
    stack.find(node => predicate(node)) || 
        stack.reduce((acc, node) => (acc.push(searchInTree(predicate, node.children)), acc), [])
            .filter(item => item)
            .pop();

const toMine = ({id, name}) => ({id, name});

console.log(JSON.stringify(toMine(searchInTree(({id}) => id === 'root-1', [tree]))));
console.log(JSON.stringify(searchInTree(({id}) => id === 'leaf-3', [tree])));
console.log(JSON.stringify(toMine(searchInTree(({id}) => id === 'leaf-1-1-2', [tree]))));
console.log(JSON.stringify(toMine(searchInTree(({id}) => id === 'leaf-1-1-1', [tree]))));

const flatTree = (stack, flattenFn = node => node, acc = {}) => {
    stack.reduce((acc, node) => {
        acc[node.id] = flattenFn(node);
        flatTree(node.children, flattenFn, acc);
        return acc;
    }, acc);
    return acc;
}

const toMineMap = map => {
    return Object.keys(map).map(key => {
        return {id: key, name: map[key].name};
    });
}

const flattenTree = flatTree([tree], ({id, name}) => ({id, name}));
console.log(JSON.stringify(flattenTree));
console.log(JSON.stringify(toMineMap(flatTree([searchInTree(({id}) => id === 'root-1', [tree])]))));
console.log(JSON.stringify(toMine(flattenTree['root-1'])));
