const searchbtn = document.getElementById("search");
const name = document.getElementById("nameSearch");

const tehilimDivs = document.querySelectorAll(".tehilim");
const tehilimArray = Array.from(tehilimDivs);

const contentTehilim = document.getElementById("content-tehilim");
const lettres = document.getElementById("lettre");

searchbtn.addEventListener("click", function () {
    showTehilimBYName(name.value);
});

function showTehilimBYName(name) {
    contentTehilim.innerHTML = "";
    lettres.innerHTML = "";

    let formattedLetters = "";

    const cleanedName = name.replace(/\s+/g, "");

    cleanedName.split("").forEach((letter, index, array) => {
        if (letter === "ך") {
            letter = "כ";
        }
        if (letter === "ם") {
            letter = "מ";
        }
        if (letter === "ן") {
            letter = "נ";
        }
        if (letter === "ף") {
            letter = "פ";
        }
        if (letter === "ץ") {
            letter = "צ";
        }
        const matchingDiv = tehilimArray.find(div => div.dataset.letter === letter);
        console.log(matchingDiv ? matchingDiv.textContent : `Lettre non trouvée: ${letter}`);

        if (matchingDiv) {
            matchingDiv.style.display = "block";
            const cloneDiv = matchingDiv.cloneNode(true);
            contentTehilim.appendChild(cloneDiv);
        }
    });

    lettres.innerHTML = `<p style="color: #4258ff">אותיות: ${cleanedName.split("").join("-")}</p>`;
}

document.getElementById("print").addEventListener("click", function () {
    document.getElementById('saisie').style.display = "none";
    document.getElementById('title').textContent = "לעילוי נשמת " + name.value;
    window.print();
});
document.getElementById("export-pdf").addEventListener("click", function () {
    const {jsPDF} = window.jspdf;
    document.getElementById('saisie').style.display = "none";
    document.getElementById('title').textContent = "לעילוי נשמת " + name.value;

    // Sélectionner l'élément à capturer
    const element = document.getElementById("capture");

    // Utiliser html2canvas pour capturer l'élément
    html2canvas(element, {scale: 2}).then(canvas => {
        // Convertir le canvas en image (Base64)
        const imgData = canvas.toDataURL("image/png");

        // Créer un fichier PDF avec jsPDF
        const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimètres, format A4

        // Calculer la largeur et hauteur pour remplir la page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Ajouter l'image capturée dans le PDF
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Télécharger le fichier PDF
        pdf.save("tehilim.pdf");
    });
});

