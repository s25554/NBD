printjson(db.people.aggregate([{
    $addFields: { BMI: {
        $divide: [{ $toDouble: "$weight" }, { 
            $pow: [{ 
                $divide: [{ $toDouble: "$height" }, 100] },2]}]
    }}},{
    $group: {
        _id: "$nationality",
		maxBmi: { $max: "$BMI" },
        avgBmi: { $avg: "$BMI" },
        minBmi: { $min: "$BMI" }
    }}
]).toArray())
