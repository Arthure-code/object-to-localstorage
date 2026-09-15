// Step 1 and 2: an object with three properties and three methods.
const bicycle = {
  brand: "Peugeot",
  gears: 7,
  colour: "red",

  ride() {
    return `The ${this.colour} ${this.brand} rolls away on ${this.gears} gears.`;
  },
  shiftUp() {
    this.gears += 1;
    return `Shifted up: ${this.gears} gears now.`;
  },
  repaint(colour) {
    this.colour = colour;
    return `Repainted ${colour}.`;
  },
};

const STORAGE_KEY = "bicycle";

// Step 3: every property, then every method.
console.log("brand:", bicycle.brand);
console.log("gears:", bicycle.gears);
console.log("colour:", bicycle.colour);
showProperties("properties", bicycle);
const methodResults = [bicycle.ride(), bicycle.shiftUp(), bicycle.repaint("blue")];
methodResults.forEach((result) => console.log(result));
showMethods(methodResults);

// Step 4: new values for the three properties.
bicycle.brand = "Brompton";
bicycle.gears = 3;
bicycle.colour = "green";
console.log("after the change:", bicycle.brand, bicycle.gears, bicycle.colour);

// Step 5: the object becomes a JSON string and goes to localStorage. The
// three methods are dropped on the way: JSON has no representation for a
// function.
localStorage.setItem(STORAGE_KEY, JSON.stringify(bicycle));
const stored = localStorage.getItem(STORAGE_KEY);
console.log("stored in localStorage:", stored);
document.getElementById("storedJson").textContent = stored;

// Step 6: the string comes back as a new object, properties only.
const restored = JSON.parse(stored);
console.log("read back:", restored);
showProperties("restoredProperties", restored);

const survived = typeof restored.ride === "function";
document.getElementById("methodsSurvived").textContent = survived
  ? "The methods came back."
  : "ride, shiftUp and repaint did not come back: the restored object has properties only.";

// Writes each property of an object into a description list.
function showProperties(listId, object) {
  const list = document.getElementById(listId);
  for (const [name, value] of Object.entries(object)) {
    if (typeof value === "function") {
      continue;
    }
    const term = document.createElement("dt");
    term.className = "col-5";
    term.textContent = name;
    const detail = document.createElement("dd");
    detail.className = "col-7";
    detail.textContent = String(value);
    list.append(term, detail);
  }
}

// Writes what each method returned.
function showMethods(results) {
  const list = document.getElementById("methods");
  for (const result of results) {
    const item = document.createElement("li");
    item.className = "list-group-item px-0";
    item.textContent = result;
    list.append(item);
  }
}
