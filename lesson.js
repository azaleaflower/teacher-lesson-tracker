const params = new URLSearchParams(window.location.search);
const day = params.get("day");
const month = params.get("month");
const year = params.get("year");

document.getElementById("lessonDate").textContent = `Lesson for ${month}/${day}/${year}`;

const class1Input = document.getElementById("class1Input");
const class2Input = document.getElementById("class2Input");
const class3Input = document.getElementById("class3Input");
const lessonNotes = document.getElementById("lessonNotes");

const summaryTable = document.getElementById("lessonSummaryTable");
const summaryClass1 = document.getElementById("summaryClass1");
const summaryClass2 = document.getElementById("summaryClass2");
const summaryClass3 = document.getElementById("summaryClass3");
const summaryNotes = document.getElementById("summaryNotes");

// load saved data
const saved = JSON.parse(localStorage.getItem(`${year}-${month}-${day}`));
if (saved) {
  class1Input.value = saved.class1 || "";
  class2Input.value = saved.class2 || "";
  class3Input.value = saved.class3 || "";
  lessonNotes.value = saved.notes || "";

  summaryClass1.textContent = saved.class1 || "-";
  summaryClass2.textContent = saved.class2 || "-";
  summaryClass3.textContent = saved.class3 || "-";
  summaryNotes.textContent = saved.notes || "-";
  summaryTable.style.display = "table";
}

document.getElementById("lessonForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    class1: class1Input.value,
    class2: class2Input.value,
    class3: class3Input.value,
    notes: lessonNotes.value
  };
  localStorage.setItem(`${year}-${month}-${day}`, JSON.stringify(data));

  // update the table
  summaryClass1.textContent = data.class1 || "-";
  summaryClass2.textContent = data.class2 || "-";
  summaryClass3.textContent = data.class3 || "-";
  summaryNotes.textContent = data.notes || "-";
  summaryTable.style.display = "table";

  alert("Lesson saved!");
});

