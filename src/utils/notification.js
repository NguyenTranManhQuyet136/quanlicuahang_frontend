export const showNotification = (message) => {
    const div = document.createElement("div");
    div.innerText = message;
    div.style.position = "fixed";
    div.style.top = "20px";
    div.style.right = "20px";
    div.style.backgroundColor = "#4caf50";
    div.style.color = "white";
    div.style.padding = "10px 20px";
    div.style.borderRadius = "5px";
    div.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    div.style.zIndex = "10000";
    div.style.transition = "opacity 0.5s ease";

    document.body.appendChild(div);

    setTimeout(() => {
        div.style.opacity = "0";
        setTimeout(() => {
            div.remove();
        }, 500);
    }, 3000);
};
