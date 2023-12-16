import { useTracker } from "meteor/react-meteor-data";
import { Timezones } from "../../api/timezones/Timezones";
import { Timezone } from "../types";

export function useTimezones() {
    const {timezones, isTimezonesLoading} = useTracker(() => {
        const subscription = Meteor.subscribe('timezones');
        const timezones = Timezones.find().fetch() as Timezone[];
        return {timezones, isTimezonesLoading: !subscription.ready()};
    });
    return {timezones, isTimezonesLoading};
}