import { useTracker } from "meteor/react-meteor-data";
import { Schedules } from "../../api/schedules/Schedules";
import { Schedule } from "../types";

export function useSchedule() {
    const {schedule, isScheduleLoading} = useTracker(() => {
        const subscription = Meteor.subscribe('schedules');
        const schedule = Schedules.findOne() as Schedule;
        return {schedule, isScheduleLoading: !subscription.ready()};
    });
    
    return {schedule, isScheduleLoading};
}