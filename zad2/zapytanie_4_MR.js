db.people.mapReduce(
    function () {
        emit(this.nationality, { weight: this.weight, height: this.height } )
    },
    function (key, values) {
        let avgBMI = 0
        let maxBMI = 0
        let minBMI = 0
        for (var i = 0; i < values.length; i++) {
            heightTo2 = (parseFloat(values[i].height) / 100)
			heightTo2 = heightTo2*heightTo2
            bmi = parseFloat(values[i].weight) / heightTo2
            avgBMI += bmi
			
            if (bmi > maxBMI) maxBMI = bmi
            if (i == 0) minBMI = maxBMI
            if (minBMI > bmi) minBMI = bmi
        }
        return {
            avgBMI: avgBMI / values.length,
            maxBMI,
            minBMI
        }
    },
    { out: 'wyniki4MR' }
);
printjson(db.wyniki4MR.find({}).toArray())
