printjson(db.people.aggregate(
   [
     {
       $group:
         {
          	_id: "$sex",
           	avgWeight: { $avg: "$weight" },
		avgHeight: { $avg: "$height" }
         }
     }
   ]
).toArray())