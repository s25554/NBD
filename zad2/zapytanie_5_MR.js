db.people.mapReduce(
    function () {
        for (var i = 0; i < this.credit.length; i++) {
            emit(this.credit[i].currency, parseFloat(this.credit[i].balance))
        }
    },
    function (key, values) {
        let sumCreditBalance = Array.sum(values) 
        let avgCreditBalance = sumCreditBalance / values.length
        return {
            sumCreditBalance,
			avgCreditBalance
        }
    },
    {
        query: {
            sex: 'Female',
            nationality: 'Poland'
        },
        out: 'wyniki5MR' 
    },
);
printjson(db.wyniki5MR.find({}).toArray());
