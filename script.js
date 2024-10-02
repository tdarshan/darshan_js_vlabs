import { DATA } from './data.js';


function renderTable(data = DATA) {
    // console.log(DATA);

    const tableBody = document.querySelector("#product--table tbody");
    
    let tableData = data.map((item) => {

        let row = document.createElement("tr");

        row.innerHTML = "";
        for (let key in item) {
            row.innerHTML += `<td> ${item[key]} </td>`;
        }

        tableBody.appendChild(row);

        return row;
    });

};
renderTable();


let addDataForm = document.getElementById("addDataForm");

addDataForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(addDataForm);

    let itemData = {id: DATA.length+1};

    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
        itemData[key] = value;
    }


    console.log([...DATA, itemData]);
    renderTable([...DATA, itemData]);
});


const sortBy = function(key) {
    console.log(key);
}