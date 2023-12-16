import { useTracker } from "meteor/react-meteor-data";
import { Genders } from "../../api/gender/Genders";
import { Gender } from "../types";

export function useGenders() {
    const {genders, isGendersLoading} = useTracker(() => {
        const subscription = Meteor.subscribe('genders');
        const genders = Genders.find().fetch() as Gender[];
        return {genders, isGendersLoading: !subscription.ready()};
    });
    return {genders, isGendersLoading};
}