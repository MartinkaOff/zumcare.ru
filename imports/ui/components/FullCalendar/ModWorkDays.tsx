import { convertMinAndMaxTime } from "../../../helpers/services/convertMinAndMaxTime"
import { getTimeFromMins } from "../../../helpers/services/getTimeFromMins"

interface IOptions {
    workDaysDates?,
    dateInfo?,
}

// .filter(item => item.class === 'fc-mod')
// .filter(item => item.class === 'fc-mod')

export function ModWorkDays(options: IOptions, forFuncStart) {
    function findModWorkDay(timeName) {
        if (options.dateInfo !== undefined && options.workDaysDates !== undefined) {
            const modDaysArray = options.workDaysDates?.filter(item => item.title == options.dateInfo?.startStr?.slice(0, 10))
            if (modDaysArray?.length > 0) {
                if (timeName === 'minTime') {
                    if (modDaysArray?.length !== 0) {
                        return convertMinAndMaxTime(modDaysArray[0].minTime)
                    }
                } else {
                    if (modDaysArray?.length !== 0) {
                        return convertMinAndMaxTime(modDaysArray[0].maxTime)
                    }
                }
            }
        } else if (timeName === 'minTime') {
            return '08:00:00'
        } else {
            return '23:00:00'
        }
    }

    function findModStepDay() {
        if (options.dateInfo !== undefined && options.workDaysDates !== undefined) {
            const modDaysArray = options.workDaysDates.filter(item => item.title == options.dateInfo?.startStr?.slice(0, 10))
            if (modDaysArray?.length > 0) {
                // modDaysArray.forEach(item => {
                //   if (item.title == dateInfo?.startStr?.slice(0, 10)) {
                //     // console.log(convertMinAndMaxTime(dateInfo.minTime))
                //   } else {
                //     console.log('conv')
                //     console.log(minTime)
                //    
                //   }
                // })
                if (modDaysArray?.length !== 0) {
                    return getTimeFromMins(modDaysArray[0].step)
                }
            }
        } else {
            return '01:00:00'
        }
    }

    if (forFuncStart === 'minTime') {
        return findModWorkDay('minTime')
    } else if (forFuncStart === 'maxTime') {
        return findModWorkDay('maxTime')
    } else if (forFuncStart === 'step') {
        return findModStepDay()
    }
}