import { Component } from 'react';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import calendarMonthGeneration, {
	spliceIntoChunks
} from '../utils/calendarMonthGeneration';

export default class Calendar extends Component {
	render() {
		const {date} = this.props;
		const weekName = capitalizeFirstLetter(
			new Intl.DateTimeFormat('ru-RU', {
				weekday: 'long'
			}).format(date)
		)
		const [day, month] = new Intl.DateTimeFormat('ru-RU', {
			day: 'numeric',
			month: 'long'
		}).format(date).split(' ')
		const monthCapitalize = capitalizeFirstLetter(
			new Intl.DateTimeFormat('ru-RU', {
				month: 'long'
			}).format(date)
		)
		const year = date.getFullYear()
		const calendarMonth = calendarMonthGeneration(date)
		const weeks = spliceIntoChunks(calendarMonth, 7)
			.map((week) => {
				const rows = week.map(
					(day, index) => {
						const other = day.other ? 'ui-datepicker-other-month' : null
						const current = day.current ? 'ui-datepicker-today' : null
						return <td className={other || current} key={index}>{day.day}</td>
					}
				)
				return <tr>{rows}</tr>
			})
		return (
			<div className="ui-datepicker">
				<div className="ui-datepicker-material-header">
					<div className="ui-datepicker-material-day">{weekName}</div>
					<div className="ui-datepicker-material-date">
						<div className="ui-datepicker-material-day-num">{day}</div>
						<div
							className="ui-datepicker-material-month">{month.toUpperCase()}</div>
						<div className="ui-datepicker-material-year">{year}</div>
					</div>
				</div>
				<div className="ui-datepicker-header">
					<div className="ui-datepicker-title">
						<span
							className="ui-datepicker-month">{monthCapitalize}</span>&nbsp;
						<span
							className="ui-datepicker-year">{year}</span>
					</div>
				</div>
				<table className="ui-datepicker-calendar">
					<colgroup>
						<col/>
						<col/>
						<col/>
						<col/>
						<col/>
						<col className="ui-datepicker-week-end"/>
						<col className="ui-datepicker-week-end"/>
					</colgroup>
					<thead>
					<tr>
						<th scope="col" title="Понедельник">Пн</th>
						<th scope="col" title="Вторник">Вт</th>
						<th scope="col" title="Среда">Ср</th>
						<th scope="col" title="Четверг">Чт</th>
						<th scope="col" title="Пятница">Пт</th>
						<th scope="col" title="Суббота">Сб</th>
						<th scope="col" title="Воскресенье">Вс</th>
					</tr>
					</thead>
					<tbody>{weeks}</tbody>
				</table>
			</div>
		);
	}
}
