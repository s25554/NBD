printjson(db.people.aggregate([{
    $match: { 
		nationality: "Poland", sex: "Female" }
	},{
    $unwind: {
		path: "$credit"
		}
		},{
    $group: {
        _id: "$credit.currency",
        sumCreditBalance: { $sum: { $toDouble: "$credit.balance" }},
        avgCreditBalance: { $avg: { $toDouble: "$credit.balance" }}
    }
}]).toArray())
