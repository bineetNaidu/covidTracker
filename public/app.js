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
            showChart(response[0]);
        }
    });
}

const showChart = ({ name, cases, deaths, recoveries, active }) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",
        fill: false,
        // The data for our dataset
        data: {
            labels: ["Cases", "Deaths", "Recoveries", "Active"],
            datasets: [
                {
                    label: name,
                    pointBackgroundColor: "rgb(40,120,190)",
                    borderColor: "rgb(128, 90, 213)",
                    pointHitRadius: 5,
                    pointRadius: 5,
                    data: [cases, deaths, recoveries, active],
                },
            ],
        },

        // Configuration options go here
        options: {
            animation: {
                duration: 0, // general animation time
            },
            hover: {
                animationDuration: 0, // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0, // animation duration after a resize

            tooltips: {
                mode: "point",
            },
            legend: {
                display: true,
                labels: {
                    fontColor: "rgb(0, 0, 0)",
                },
            },
        },
    });
};
