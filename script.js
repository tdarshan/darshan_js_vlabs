import { DATA } from './data.js';

function renderTable(data) {
    const tableBody = document.querySelector("#product--table tbody");
    tableBody.innerHTML = "";

    let tableData = data.map((item) => {
        let row = document.createElement("tr");
        row.setAttribute("id", `item--${item.id}`);

        row.innerHTML = "";
        row.innerHTML += `<td>
        <button id="row-${item.id}" class="check-btn border-0 bg-transparent">
            <i class="bi bi-check" id="row-item-${item.id}"></i>
        </button>
        </td>`;
        
        for (let key in item) {
            row.innerHTML += `<td data-key="${key}"> ${item[key]} </td>`;
        }

        tableBody.appendChild(row);
        return row;
    });

    attachRowCheckListeners();
};

renderTable(DATA);

let addDataForm = document.getElementById("addDataForm");
addDataForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(addDataForm);
    let itemData = { id: DATA.length + 1 };

    for (let [key, value] of formData.entries()) {
        itemData[key] = value;
    }

    renderTable([...DATA, itemData]);
});

function sortBy(key, rule) {
    let tableData = getTableElements();
    let isNum = !isNaN(tableData[0][key]);

    let sorted;
    if (isNum) {
        sorted = tableData.sort((a, b) => a[key] - b[key]);
    } else {
        sorted = tableData.sort((a, b) => a.chemical_name.localeCompare(b.chemical_name));
    }

    sorted = (rule === "ascending") ? sorted : sorted.reverse();
    renderTable(sorted);
}

const sortByDensityAsc = document.getElementById("sortByDensityAsc");
if (sortByDensityAsc) {
    sortByDensityAsc.addEventListener("click", () => {
        sortBy("density", "ascending");
    });
}

const sortByDensityDsc = document.getElementById("sortByDensityDsc");
if (sortByDensityDsc) {
    sortByDensityDsc.addEventListener("click", () => {
        sortBy("density", "descending");
    });
}

const sortByNameAsc = document.getElementById("sortByNameAsc");
if (sortByNameAsc) {
    sortByNameAsc.addEventListener("click", () => {
        sortBy("chemical_name", "ascending");
    });
}

const sortByNameDsc = document.getElementById("sortByNameDsc");
if (sortByNameDsc) {
    sortByNameDsc.addEventListener("click", () => {
        sortBy("chemical_name", "descending");
    });
}

const sortByViscosityAsc = document.getElementById("sortByViscosityAsc");
if (sortByViscosityAsc) {
    sortByViscosityAsc.addEventListener("click", () => {
        sortBy("viscosity", "ascending");
    });
}

const sortByViscosityDsc = document.getElementById("sortByViscosityDsc");
if (sortByViscosityDsc) {
    sortByViscosityDsc.addEventListener("click", () => {
        sortBy("viscosity", "descending");
    });
}


function attachRowCheckListeners() {
    let rowChecks = document.querySelectorAll("button.check-btn i");
    rowChecks = Array.from(rowChecks);

    if (rowChecks) {
        rowChecks.forEach((check) => {
            check.addEventListener("click", function () {
                rowChecks.forEach((r) => r.classList.remove("active"));
                this.classList.add("active");
                updateRowBtn.classList.remove("pointers-none");
                selectedRowId = this.id.split("-")[2];
            });
        });
    }
}

let selectedRowId = null;
attachRowCheckListeners(); 

let deleteRowBtn = document.getElementById("deleteRowBtn");
if (deleteRowBtn) {
    deleteRowBtn.addEventListener("click", () => {
        deleteRow(selectedRowId);
    });
}

function deleteRow(index = null) {
    let tableData = getTableElements();

    if (index !== null) {
        let filteredData = tableData.filter((item) => item.id != index);
        renderTable(filteredData);  
    } else {
        alert("Please select a Row!");
    }

    selectedRowId = null;
}


function getTableElements() {
    let items = document.querySelectorAll("table tbody tr");
    items = Array.from(items);

    let data = items.map((item) => {
        let res = {};
        let fields = item.children;
        fields = Array.from(fields);

        fields.forEach((field) => {
            if (field.getAttribute("data-key")) {
                res[field.getAttribute("data-key")] = isNaN(field.textContent.trim())
                    ? field.textContent.trim()
                    : +field.textContent.trim();
            }
        });

        return res;
    });

    return data;
}


const updateRowBtn = document.getElementById("updateRowBtn");
if (updateRowBtn) {
    updateRowBtn.addEventListener("click", function() {
        let editIdElement = document.getElementById("edit-item-id"); 

        editIdElement.innerHTML = selectedRowId;
    });
}