export function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    // return hours + ':' + minutes;
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '00' : minutes}:00`;
};