import { Genders } from "../Genders";

// Meteor.methods({
//     'genders.insert'(gender) {
//         Genders.insert(gender)
//     }
// })

if(Genders.findOne() === undefined) {
    const male = {
        gender: 'Male',
    }
    const female = {
        gender: 'Female',
    }

    Genders.insert(male)
    Genders.insert(female)
}