db.people.mapReduce(
    function () {
        emit(this.sex, { weight: this.weight, height: this.height });
    },
    function (key, values) {
        let sumWeight = 0.0;
        let sumHeight = 0.0;
        for (var i = 0; i < values.length; i++) {
            sumWeight +=  parseFloat(values[i].weight);
            sumHeight +=  parseFloat(values[i].height);
        }
        return {
            avgWeight: sumWeight / values.length,
            avgHeight: sumHeight / values.length
            };
        },
    { out: 'wyniki1MR' }
);
printjson(db.wyniki1MR.find({}).toArray())
