export function openCategoryPopup(code, name) {
    const url = `category-input-popup.html?code=${code}&name=${name}&type=categoryModify`;
    window.open(url, "_blank", "width=600,height=400");
}
