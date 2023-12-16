import { Cities } from "../Cities";

Meteor.methods({
    'cities.insert'(city) {
        if(city !== undefined && city !== null) {
            const duplicate = Cities.findOne(city) 
            if(duplicate) {
                return
            } else {
                Cities.insert(city)
            }
        }
    }
})
