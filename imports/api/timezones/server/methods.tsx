import { Timezones } from "../Timezones";

Meteor.methods({
    'timezones.insert'(timezone) {
        const duplicate = Timezones.findOne(timezone) 
        if(duplicate) {
            return
        } else {
            Timezones.insert(timezone)
        }
        
    }
})

// Timezones.remove({})