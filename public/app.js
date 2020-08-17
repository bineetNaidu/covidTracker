const select = document.querySelector("#stateSelect");
const info = document.querySelector("#info");

const states = [];

const getStates = async function () {
    const data = await fetch("/api/v1/states");
    const statesDATA = await data.json();
    statesDATA.forEach((state) => {
        const option = document.createElement("option");
        option.setAttribute("id", state.id);
        option.innerText = state.name;
        states.push(state);
        select.appendChild(option);
    });
    select.removeAttribute("disabled");
};

getStates();

if (select.attributes !== "disabled") {
    select.addEventListener("keypress", (e) => {
        if (e.which == 13) {
            e.preventDefault();
            let query = select.value;
            const response = states.filter((state) => state.name == query);
            info.innerHTML = `<pre>${JSON.stringify(response, null, 2)}</pre>`;
        }
    });
}
