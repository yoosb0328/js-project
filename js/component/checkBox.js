const checkAll = document.getElementById("check-all");

checkAll.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    const rowCheckboxes = document.querySelectorAll("#common-tbody .row-checkbox");
    // const rowCheckboxes = document.querySelectorAll(".table-tbody .row-checkbox");
    rowCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
});
