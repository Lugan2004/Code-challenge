// scripts.js

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

const createArray = (length) => {
    const result = [];

    for (let i = 0; i < length; i++) {
        result.push(i);
    }

    return result;
}

const createData = () => {
    const current = new Date();
    current.setDate(1); // Set the day of the month to 1

    const startDay = current.getDay(); // Get the day of the week (0-6)
    const daysInMonth = getDaysInMonth(current);

    const weeks = createArray(6); // Create an array of 6 weeks
    const days = createArray(7); // Create an array of 7 days
    const result = [];

    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex + 1,
            days: [],
        });

        for (const dayIndex of days) {
            const day = (dayIndex - startDay) + (weekIndex * 7) + 1;
            const isValid = day > 0 && day <= daysInMonth;

            result[weekIndex].days.push({
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : '',
            });
        }
    }

    return result;
}

const addCell = (existing, classString, value) => {
    return /* html */ `
        ${existing}
        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `;
}

const createHtml = (data) => {
    let result = '';

    for (const { week, days } of data) {
        let inner = '';
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`);

        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value;
            const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
            const isAlternate = week % 2 === 0;
            
            let classString = 'table__cell';

            if (isToday) classString += ' table__cell_today';
            if (isWeekend) classString += ' table__cell_weekend';
            if (isAlternate) classString += ' table__cell_alternate';
            inner = addCell(inner, classString, value);
        }

        result += `
            <tr>${inner}</tr>
        `;
    }
    
    return result;
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)