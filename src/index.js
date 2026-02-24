//Fungtion to add a new card, show the mesage and delete the card
function addCard(){

const question = document.getElementById("questionInput").value;
const answer = document.getElementById("answerInput").value;

if(!question || !answer){
alert("Bitte Frage und Antwort eingeben!");
return;
}

const card = document.createElement("div");
card.className="bg-yellow-200 p-6 rounded-2xl shadow-md flex flex-col justify-between";

card.innerHTML = `
<div>
<h2 class="font-semibold mb-3">${question}</h2>
<p class="text-sm text-gray-700 hidden">${answer}</p>
</div>

<div class="flex justify-between mt-6">
<button onclick="this.closest('div').previousElementSibling.querySelector('p').classList.toggle('hidden')"
class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg">
Show
</button>

<button onclick="this.parentElement.parentElement.remove()"
class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg">
Delete
</button>
</div>
`;

document.getElementById("cardContainer").appendChild(card);

document.getElementById("questionInput").value="";
document.getElementById("answerInput").value="";
}