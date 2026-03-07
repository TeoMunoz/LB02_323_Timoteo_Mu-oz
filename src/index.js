// initial status of the cards
let cards = [];

// functions to interact with the status
function createCard(question, answer) {
  return { id: Date.now(), question, answer, editing: false, rank: 0 };
}

function deleteCardState(cards, id) {
  return cards.filter((c) => c.id !== id);
}

function toggleEditState(cards, id) {
  return cards.map((c) => (c.id === id ? { ...c, editing: !c.editing } : c));
}

function updateCardState(cards, id, newQ, newA) {
  return cards.map((c) =>
    c.id === id ? { ...c, question: newQ, answer: newA, editing: false } : c,
  );
}

// Create the letters in HTML and Tailwind
function render() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  [...cards]
.sort((a, b) => a.rank - b.rank)
.forEach((card) => {
    const div = document.createElement("div");
    div.className =
      "bg-yellow-200 p-6 rounded-2xl shadow-md flex flex-col justify-between";

    if (card.editing) {
      div.innerHTML = `
        <div>
          <input id="q-${card.id}" class="border p-2 w-full mb-2 rounded" value="${card.question}">
          <input id="a-${card.id}" class="border p-2 w-full rounded" value="${card.answer}">
        </div>

        <div class="flex justify-between mt-6">
          <button onclick="saveEdit(${card.id})"
          class="bg-green-500 text-white px-4 py-1 rounded-lg">
          Save
          </button>

          <button onclick="deleteCard(${card.id})"
          class="bg-red-500 text-white px-4 py-1 rounded-lg">
          Delete
          </button>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div>
          <h2 class="font-semibold mb-3">${card.question}</h2>
        <p class="text-sm text-gray-700 hidden">${card.answer}</p>

  <p class="text-xs mt-2 text-gray-600">
    Rank: <span class="font-bold">${card.rank}</span>
  </p>
        </div>

        <div class="flex justify-between mt-6">

          <button onclick="toggleAnswer(this)"
          class="bg-blue-500 text-white px-4 py-1 rounded-lg">
          Show
          </button>

          <button onclick="deleteCard(${card.id})"
          class="bg-red-500 text-white px-4 py-1 rounded-lg">
          Delete
          </button>

          <button onclick="editCard(${card.id})"
          class="bg-yellow-500 text-white px-4 py-1 rounded-lg">
          Edit
          </button>

          <button onclick="rateCard(${card.id},0)"
  class="bg-red-400 text-white px-4 py-1 rounded-lg">
  Bad
  </button>

  <button onclick="rateCard(${card.id},1)"
  class="bg-green-500 text-white px-4 py-1 rounded-lg">
  Good
  </button>

  <button onclick="rateCard(${card.id},2)"
  class="bg-purple-500 text-white px-4 py-1 rounded-lFFFg">
  Perfect
  </button>

        </div>
      `;
    }

    container.appendChild(div);
  });
}

//events, create, edit, view response, delete
function addCard() {
  const q = questionInput.value;
  const a = answerInput.value;

  if (!q || !a) {
    alert("Bitte Frage und Antwort eingeben!");
    return;
  }

  function addCardState(cards, card) {
    return [...cards, card];
  }

  const newCard = createCard(q, a);
  cards = addCardState(cards, newCard);

  render();

  questionInput.value = "";
  answerInput.value = "";
}

function deleteCard(id) {
  cards = deleteCardState(cards, id);
  render();
}

function toggleAnswer(btn) {
  btn.closest(".bg-yellow-200").querySelector("p").classList.toggle("hidden");
}

function editCard(id) {
  cards = toggleEditState(cards, id);
  render();
}

function saveEdit(id) {
  const newQ = document.getElementById(`q-${id}`).value;
  const newA = document.getElementById(`a-${id}`).value;

  cards = updateCardState(cards, id, newQ, newA);
  render();
}

function rateCard(id, points) {
  cards = cards.map((c) => (c.id === id ? { ...c, rank: c.rank + points } : c));
  render();
}
