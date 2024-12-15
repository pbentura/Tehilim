const searchbtn = document.getElementById("search");
const name = document.getElementById("nameSearch");

const tehilimDivs = document.querySelectorAll(".tehilim");
const tehilimArray = Array.from(tehilimDivs);

const contentTehilim = document.getElementById("content-tehilim");
const lettres = document.getElementById("lettre");

// tehilimArray.forEach(div => {
//     div.style.display = "none";
// });

searchbtn.addEventListener("click", function () {
    showTehilimBYName(name.value);
});

searchbtn.addEventListener("click", function () {
    showTehilimBYName(name.value);
});

function showTehilimBYName(name) {
    contentTehilim.innerHTML = "";
    lettres.innerHTML = "";

    let formattedLetters = "";

    const cleanedName = name.replace(/\s+/g, "");

    cleanedName.split("").forEach((letter, index, array) => {
        const matchingDiv = tehilimArray.find(div => div.dataset.letter === letter);
        console.log(matchingDiv ? matchingDiv.textContent : `Lettre non trouvée: ${letter}`);

        if (matchingDiv) {
            matchingDiv.style.display = "block";
            const cloneDiv = matchingDiv.cloneNode(true);
            cloneDiv.classList.add('column', 'is-one-third');
            contentTehilim.appendChild(cloneDiv);
        }

        formattedLetters += letter;
        if (index < array.length - 1) {
            formattedLetters += "-";
        }
    });

    lettres.innerHTML = `<p style="color: #4258ff">אותיות: ${formattedLetters}</p>`;
}

document.getElementById("print").addEventListener("click", function () {
    document.getElementById('saisie').style.display = "none";
    document.getElementById('title').textContent = "לעילוי נשמת " + name.value;
    window.print();
});