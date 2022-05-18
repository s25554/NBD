printjson(db.people.find({"nationality":"China"}).limit(1).pretty().toArray())
