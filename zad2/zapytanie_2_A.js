printjson(db.people.aggregate(
   [{
        $unwind: { path: "$credit" }
    },
     {
			$group: {
            _id: "$credit.currency",
            suma: { $sum: { $toDouble: "$credit.balance"}}
        }
     }
   ]
).toArray())