function openSmallPopup(url, size) {
    switch (size) {
        case "small":
            console.log("case small");
            window.open("", "small-popup", "width=600,height=300");
            break;
        default:
            break;
    }
}

function openLargePopup(url) {
    window.open(url, "large-popup", "width=600,height=600");
}

export { openSmallPopup, openLargePopup };
