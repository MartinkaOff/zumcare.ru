import { useTracker } from "meteor/react-meteor-data";
import { Cities } from "../../api/cities/Cities";
import { City } from "../types";

export function useCities() {
    const {cities, isCitiesLoading} = useTracker(() => {
        const subscription = Meteor.subscribe('cities');
        const cities = Cities.find().fetch() as City[];
        return {cities, isCitiesLoading: !subscription.ready()};
    });
    return {cities, isCitiesLoading};
}