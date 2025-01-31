const input = document.querySelector(".input");
const search = document.querySelector(".search");
const meaning = document.querySelector(".meaning");

search.addEventListener("click", () => {
  const searchvalue = input.value;
  url(searchvalue);
  clearinput();
});
const url = (searchvalue) => {
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchvalue}`;
  dictionary(url);
};

async function dictionary(url) {
  const data = await fetch(url);
  const responses = await data.json();
  responses.forEach((response) => {
    response.meanings.forEach((meaning) => {
      let meaningdata = meaning.definitions[0].definition;
        meaningcollector(meaningdata);
    });
  });
}
const meaningcollector = (data) => {
  const text = document.querySelector(".textdiv");
  const para = document.createElement("p");
  para.innerText = data;
  text.appendChild(para);
};

const clearinput = () => {
  input.value = "";
};
