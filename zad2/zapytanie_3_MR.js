db.people.mapReduce(
    function () {
        emit(this.job, 1);
    },
    function (key, values) {
        return 1 ;
    },
     { out: 'wyniki3MR' }
);
printjson(db.wyniki3MR.find({}).toArray())
