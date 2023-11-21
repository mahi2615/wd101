function calculateMinDate() {
    const today = new Date();
    return new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()).toISOString().split('T')[0];
}


function calculateMaxDate() {
    const today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
}

const dobInput = document.getElementById('dob');
dobInput.setAttribute('min', calculateMinDate());
dobInput.setAttribute('max', calculateMaxDate());

const userForm = document.getElementById("userForm");

const getUserEntries = () => {
    let entries = localStorage.getItem("userEntries");
    return entries ? JSON.parse(entries) : [];
}

let userEntries = getUserEntries();

const displayEntries = () => {
    const entries = getUserEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class="bor">${entry.name}</td>`;
        const emailCell = `<td class="bor">${entry.email}</td>`;
        const passwordCell = `<td class="bor">${entry.password}</td>`;
        const dobCell = `<td class="bor">${entry.dob}</td>`;
        const atncCell = `<td class="bor">${entry.atnc}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${atncCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<h1>Entries</h1><table class="table"><tr class="bor"><th class="bor">Name</th><th class="bor">Email</th><th class="bor">Password</th><th class="bor">Dob</th><th class="bor">Accepted terms?</th></tr>${tableEntries}</table>`;

    let details = document.getElementById("tableView");
    details.innerHTML = table;
}

displayEntries();

const handleFormSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dateOfBirth = document.getElementById("dob").value;
    const atnc = document.getElementById("atnc").checked;

    const entry = { name, email, password, dob: dateOfBirth, atnc };

    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries));
    displayEntries();
}

userForm.addEventListener("submit", handleFormSubmit);
