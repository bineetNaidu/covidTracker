const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://en.wikipedia.org/wiki/COVID-19_pandemic_in_India";

async function getCovidData() {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);
    const table = $("#covid19-container > table > tbody");
    const states = [];
    table.find("tr").each((i, element) => {
        const $row = $(element);
        let index = i - 2;
        const state = {};
        state.id = index;
        state.name = $row.find("th[scope=row]").text().trim();
        state.cases = Number(
            $row
                .find("td")
                .first()
                .text()
                .trim()
                .replace(",", "")
                .replace("[b]", "")
        );
        state.deaths = Number(
            $row
                .find("td:nth-child(3)")
                .text()
                .trim()
                .replace(",", "")
                .replace("[c]", "")
        );
        state.recoveries = Number(
            $row.find("td:nth-child(4)").text().trim().replace(",", "")
        );
        state.active = Number(
            $row.find("td:nth-child(5)").text().trim().replace(",", "")
        );
        if (state.name !== "") {
            states.push(state);
        }
    });
    return states;
}
module.exports = getCovidData;
