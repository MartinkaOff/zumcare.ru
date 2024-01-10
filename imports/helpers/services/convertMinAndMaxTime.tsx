export function convertMinAndMaxTime(time) {
    if (time !== undefined) {
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        // {`${eventContentHour}:${eventContentMinutes < 10? '00' : eventContentMinutes}`}
        return `${hour}:${minutes < 10 ? '00' : minutes}:${seconds < 10 ? '00' : seconds}`
    }
}