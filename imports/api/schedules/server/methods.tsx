import { Schedules } from "../Schedules";

Meteor.methods({
    'schedule.insert'(data, specialistName, specialistUserId) {

        const schedule = Schedules.findOne({ specialistUserId: specialistUserId });

        if (schedule === undefined) {
            Schedules.insert(data)
        } else {
            Schedules.update(schedule._id, { $set: { workDays: data.workDays } });
        }
    },
    'schedule.booked'(newData) {
        // if(schedule !== undefined && client !== undefined && bookedDay !== undefined) {
        //    return Schedules.update(client, {$set: {client: clientName, booked: bookedDay}});   // Логика для объединение schedules
        // } else if (client === undefined || bookedDay === undefined) {
        //     return Schedules.insert(newData, bookedDay);
        // }
        // const assign = Object.assign(newData, bookedDay)
        Schedules.insert(newData)
    },
    'schedule.removeWorkDay'(workDay) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const schedule = Schedules.findOne({ workDays: workDay });

        if (schedule !== undefined) {
            const removeArray = schedule.workDays.filter(item => item.id !== workDay.id);
            Schedules.update(schedule._id, { $set: { workDays: removeArray } });
        }
    },
    'schedule.remove'(bookedDayiD) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        const schedule = Schedules.findOne({ _id: bookedDayiD });
        if (schedule !== undefined) {
            Schedules.remove(schedule._id);
        }
    },
    'schedule.removeAfterDate'(currentSpecialistWorkDays, workDaysArrayFiltered) {

        const schedule = Schedules.findOne({ workDays: currentSpecialistWorkDays });
        if (schedule !== undefined) {
            Schedules.update(schedule._id, { $set: { workDays: workDaysArrayFiltered } })
        }
    },
    'schedule.timeSteps'(step, specialistUserId) {
        const schedule = Schedules.findOne({ specialistUserId: specialistUserId })
        if (schedule !== undefined) {
            Schedules.update(schedule._id, { $set: { step } })
        }
    },
    'schedule.setTimeWork'(timeWork, specialistUserId) {
        const schedule = Schedules.findOne({ specialistUserId: specialistUserId })
        if (schedule !== undefined) {
            Schedules.update(schedule._id, { $set: { ...timeWork } })
        }
    }
})