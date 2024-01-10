export function convertDateToString(date) {
    if (date !== undefined) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц начинается с 0, поэтому добавляем 1
        const day = String(date.getDate()).padStart(2, '0');

        // Создаем строку в формате "YYYY-MM-DD"
        return `${year}-${month}-${day}`;
    }
}