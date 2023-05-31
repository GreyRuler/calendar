/**
 * Функция генерирует календарь
 * @param date
 * Возвращет сгенерированный календарь и индекс дня переданной даты
 * @returns {(*[]|number)[]}
 */
export default function calendarMonthGeneration(date) {
	const calendarMonth = []

	const currDate = date.getDate()
	const prevDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
	date.setDate(1)
	const firstWeekday = date.getDay()

	// Заполняем не достающими днями
	for (let i = firstWeekday - 2; i >= 0; i--) {
		calendarMonth.push({
			day: prevDate -i,
			other: true,
			current: false,
		})
	}

	const lastDayMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

	// Заполняем днями месяца
	for (let i = 1; i <= lastDayMonth; i++) {
		calendarMonth.push({
			day: i,
			other: false,
			current: i === currDate,
		})
	}

	// Количество не достающих дней
	const days = Math.ceil(calendarMonth.length / 7) * 7 - calendarMonth.length
	for (let i = 1; i <= days; i++) {
		calendarMonth.push({
			day: i,
			other: true,
			current: false,
		})
	}

	return calendarMonth
}

// new Date(date.getFullYear(), date.getMonth(), 0) -> предыдущий месяц с последним днем

// date.setDate(1)
// date.getDay() -> первый день недели

export function spliceIntoChunks(arr, chunkSize) {
	const res = [];
	while (arr.length > 0) {
		const chunk = arr.splice(0, chunkSize);
		res.push(chunk);
	}
	return res;
}
