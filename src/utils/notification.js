export const showNotification = (message, force = false) => {
    if (!force && localStorage.getItem("notification") === "false") return;
    const isError = message.toLowerCase().includes("lỗi") ||
        message.toLowerCase().includes("thất bại") ||
        message.toLowerCase().includes("sai") ||
        message.toLowerCase().includes("không khớp");

    const div = document.createElement("div");
    div.innerText = (isError ? "Thất bại " : "Thành công ") + message;
    div.style.position = "fixed";
    div.style.top = "30px";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.backgroundColor = isError ? "#dc3545" : "#4caf50";
    div.style.color = "white";
    div.style.padding = "15px 40px";
    div.style.fontSize = "18px";
    div.style.fontWeight = "500";
    div.style.borderRadius = "8px";
    div.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
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
