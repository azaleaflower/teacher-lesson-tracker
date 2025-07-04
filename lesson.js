const params = new URLSearchParams(window.location.search);
const day = params.get("day");
const month = params.get("month");
const year = params.get("year");

document.getElementById("lessonDate").textContent = `Lesson for ${month}/${day}/${year}`;

const class1Input = document.getElementById("class1Input");
const class2Input = document.getElementById("class2Input");
const class3Input = document.getElementById("class3Input");
const lessonNotes = document.getElementById("lessonNotes");

// load previous data if it exists
const saved = JSON.parse(localStorage.getItem(`${year}-${month}-${day}`));
if (saved) {
  class1Input.value = saved.class1 || "";
  class2Input.value = saved.class2 || "";
  class3Input.value = saved.class3 || "";
  lessonNotes.value = saved.notes || "";
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
  alert("Lesson saved!");
});
