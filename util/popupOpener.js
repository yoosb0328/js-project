class PopupOpener {
    openPopup(url, size) {
        switch (size) {
            case "small":
                window.open(url, "small-popup", "width=600,height=300");
                break;
            case "large":
                window.open(url, "large-popup", "width=600,height=600");
                break;
            default:
                break;
        }
    }
    
}

export default PopupOpener;
