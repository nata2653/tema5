let retter = [];
let dest = document.querySelector("#liste");
let filter = "alle";


document.addEventListener("DOMContentLoaded", sidenVises);

function sidenVises() {

    async function getJson() {
        console.log("JSON hentes");
        let jsonData = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1jxxxFoWBuMJ1qhQ9BQIAyKHmP38XtAF9_sQr0xo5JLo");
        retter = await jsonData.json();
        retter.sort((a, b) => {
            return b.kategori.localeCompare(a.kategori);
        })

        visRetter();
    }

    function visRetter() {
        dest.innerHTML = "";
        retter.forEach(ret => {
            if (filter == "alle" || filter == ret.kategori) {
                let template = `
                    <div class="visteRetter">

              <h2>${ret.navn}</h2>
 <div> <img src="imgs/large/${ret.billede}.jpg"> </div>
                            <p><strong>Pris:</strong> ${ret.pris}</p>
                            <p>${ret.kort}</p>
                            <p><strong>Oprindelse: </strong> ${ret.oprindelse}</p>

                    </div>`;

                dest.insertAdjacentHTML("beforeend", template);
                dest.lastElementChild.addEventListener("click", åbn);

                function åbn() {
                    document.querySelector("#indhold").innerHTML = `<article class="person">
 <h2>${ret.navn}</h2>
  <div> <img src="imgs/large/${ret.billede}.jpg"> </div>
                            <p><strong> Pris: </strong> ${ret.pris}</p>
                            <p>${ret.lang}</p>
                            <p><strong>Oprindelse: </strong> ${ret.oprindelse}</p>

</article>`;
                    document.querySelector("#popup").style.display = "block";
                }
            }
        })
    }
    document.querySelector("#luk button").addEventListener("click", () => {
        document.querySelector("#popup").style.display = "none";
    })


    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })

    function filtrering() {
        filter = this.getAttribute("data-hold");
        document.querySelector("h1").textContent = this.textContent;

        document.querySelectorAll(".filter").forEach(elm => {
            elm.classList.remove("valgt");
        })
        this.classList.add("valgt");

        visRetter();
    }


    getJson();
    console.log("json");


}
