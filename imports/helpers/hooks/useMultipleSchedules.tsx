import { useTracker } from "meteor/react-meteor-data";
import { Schedules } from "../../api/schedules/Schedules";
import { Schedule } from "../types";

export function useMultipleSchedules() {
    const {schedules, isScheduleLoading} = useTracker(() => {
        const subscription = Meteor.subscribe('schedules');
        const schedules = Schedules.find().fetch() as Schedule[];
        return {schedules, isScheduleLoading: !subscription.ready()};
    });
    return {schedules, isScheduleLoading};
}