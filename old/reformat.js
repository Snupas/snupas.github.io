var makeTree = (function() {
    var defaultClone = function(record) {
        var newRecord = JSON.parse(JSON.stringify(record));
        delete newRecord.parent;
        return newRecord;
    };
    return function(flat, clone) {
        return flat.reduce(function(data, record) {
            var oldRecord = data.catalog[record.id];
            var newRecord = (clone || defaultClone)(record);
            if (oldRecord && oldRecord.children) {
                newRecord.children = oldRecord.children;
            }
            data.catalog[record.id] = newRecord;
            if (record.parent) {
                var parent = data.catalog[record.parent] =
                        (data.catalog[record.parent] || {id: record.parent});
                (parent.children = parent.children || []).push(newRecord);
            } else {
                data.tree.push(newRecord);
            }
            return data;
        }, {catalog: {}, tree: []}).tree;
    }
}());


var fflat = [
    { id: 1, name: "Business", parent: 0 },
    { id: 2, name: "Management", parent: 1 },
    { id: 3, name: "Leadership", parent: 2 },
    { id: 4, name: "Finance", parent: 1 },
    { id: 5, name: "Fiction", parent: 0 },
    { id: 6, name: "Accounting", parent: 1 },
    { id: 7, name: "Project Management", parent: 2  }
];

var flat = '[{"id":"1","name":"Start","parent":"0"},{"id":"2","name":"Decision A","parent":"1"},{"id":"3","name":"Decision B","parent":"1"},{"id":"4","name":"Possibility A-1","parent":"2"},{"id":"5","name":"Possibility A-2","parent":"2"},{"id":"6","name":"Possibility B-1","parent":"3"},{"id":"7","name":"Possibility B-2","parent":"3"},{"id":"8","name":"Consequence A-1","parent":"4"},{"id":"9","name":"Consequence A-2","parent":"5"},{"id":"10","name":"Consequence B-1","parent":"6"},{"id":"11","name":"Consequence B-2","parent":"7"}]';

var jsonObject = JSON.parse(flat, function(k, v) {
    return (typeof v === "object" || isNaN(v)) ? v : parseInt(v, 10);
});

// Just for displaying output
console.log(jsonObject);

console.log(JSON.stringify(makeTree(jsonObject), null, 4));