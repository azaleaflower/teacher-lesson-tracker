const monthYear = document.getElementById('monthYear');
const calendarBody = document.getElementById('calendar-body');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function renderCalendar(month, year) {
  monthYear.textContent = `${months[month]} ${year}`;
  calendarBody.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let date = 1;

  for (let i = 0; i < 6; i++) {
    let row = document.createElement('tr');

    // add week number in a separate left column
    let weekCell = document.createElement('td');
    weekCell.textContent = `W${i + 1}`;
    weekCell.style.backgroundColor = "#f8bbd0";
    weekCell.style.fontWeight = "bold";
    row.appendChild(weekCell);

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement('td');
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        let cell = document.createElement('td');
        row.appendChild(cell);
      } else {
        let cell = document.createElement('td');
        cell.textContent = date;
        cell.classList.add('clickable');
        cell.addEventListener('click', () => {
          window.location.href = `lesson.html?day=${date}&month=${month + 1}&year=${year}`;
        });
        row.appendChild(cell);
        date++;
      }
    }
    calendarBody.appendChild(row);
  }
}

document.getElementById('prevMonth').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, c
