const fromText = document.querySelector(".from_text");
const toText = document.querySelector(".to_text");
const selectTag = document.querySelectorAll("select");
const translatorBtn = document.querySelector("button");
const exchangeIcon = document.querySelector(".exchange")
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    // selecting English by default as FROM language and Hindi as To second language.
    for (const contries_code in contries) {
        let selected;

        if (id === 0 && contries_code === "en-GB") {
            selected = "selected";
        }
        else if (id === 1 && contries_code === "mr-IN") {
            selected = "selected";
        }

        const option = `<option value="${contries_code}" ${selected} class="option_color">${contries[contries_code]}</option>`

        // Adding option tag inside select tag
        tag.insertAdjacentHTML("beforeend", option);
    }
});


// Exchange Icon 

exchangeIcon.addEventListener("click", () => {
    // Changing data one side to another
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    // Changing language one side to another
    let tempLan = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLan;
})

translatorBtn.addEventListener("click", () => {
    let text = fromText.value.toLowerCase();
    let translateFrom = selectTag[0].value; // Getting from select tag value.
    let translateTo = selectTag[1].value;   // Getting to select tag value.

    let aupUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    // Fetching API response and returning it with parsing into JS obj
    // and in another then method receiving that obj
    fetch(aupUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
    });
});

icons.forEach((icon) => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            // if clicked icon has from id, copy the fromTextarea value else copy the toTextarea value.
            if (target.id === "from") {
                // console.log("From icon click")
                navigator.clipboard.writeText(fromText.value);
            }
            else {
                // console.log("To icon click")
                navigator.clipboard.writeText(toText.value);
            }
        }
        else {
            let speaking_voice;

            if (target.id === "from") {
                speaking_voice = new SpeechSynthesisUtterance(fromText.value);

                // Setting utterance language to fromSelect tag value.
                speaking_voice.lang = selectTag[0].value;
            }
            else {
                speaking_voice = new SpeechSynthesisUtterance(toText.value);

                // Setting utterance language to toSelect tag value.
                speaking_voice.lang = selectTag[1].value;
            }

            // Speak the passed utterance
            speechSynthesis.speak(speaking_voice);
        }
    })
})