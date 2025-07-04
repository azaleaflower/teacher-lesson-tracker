const monthYear = document.getElementById('monthYear');
const calendarBody = document.getElementById('calendar-body');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// week tracking
let currentWeek = 1;
const currentWeekDisplay = document.getElementById("currentWeek");

// months
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

    let weekCell = document.createElement('td');
    weekCell.textContent = `W${i + 1}`;
    weekCell.style.backgroundColor = "#f8bbd0";
    weekCell.style.fontWeight = "bold";
    row.appendChild(weekCell);

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        row.appendChild(document.createElement('td'));
      } else if (date > daysInMonth) {
        row.appendChild(document.createElement('td'));
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

// prev/next month
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
  renderCalendar(currentMonth, currentYear);
});

// week overview
document.getElementById("prevWeek").addEventListener("click", () => {
  if (currentWeek > 1) {
    currentWeek--;
    updateWeekTable();
  }
});

document.getElementById("nextWeek").addEventListener("click", () => {
  if (currentWeek < 5) {
    currentWeek++;
    updateWeekTable();
  }
});

function updateWeekTable() {
  currentWeekDisplay.textContent = `Week ${currentWeek}`;
  const weeklyTable = document.getElementById("weekly-table");

  // clear
  weeklyTable.innerHTML = `
    <tr><td>Monday</td><td>-</td><td>-</td><td>-</td></tr>
    <tr><td>Tuesday</td><td>-</td><td>-</td><td>-</td></tr>
    <tr><td>Wednesday</td><td>-</td><td>-</td><td>-</td></tr>
    <tr><td>Thursday</td><td>-</td><td>-</td><td>-</td></tr>
    <tr><td>Friday</td><td>-</td><td>-</td><td>-</td></tr>
  `;

  const weekData = JSON.parse(localStorage.getItem(`week-${currentWeek}`));
  if (weekData) {
    ["Monday","Tuesday","Wednesday","Thursday","Friday"].forEach((day, index) => {
      weeklyTable.rows[index].cells[1].textContent = weekData[day]?.class1 || "-";
      weeklyTable.rows[index].cells[2].textContent = weekData[day]?.class2 || "-";
      weeklyTable.rows[index].cells[3].textContent = weekData[day]?.class3 || "-";
    });
  }
}

renderCalendar(currentMonth, currentYear);
updateWeekTable();
