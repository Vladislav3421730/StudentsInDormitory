
const isUserLoggedIn = localStorage.getItem('userLoggedIn');
function ViewModelaWindow(modalTrigger) {


    const windowInnerWidth = document.documentElement.clientWidth;
    const scrollbarWidth = parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth);

    const bodyElementHTML = document.getElementsByTagName("body")[0];
    const modalBackground = document.getElementsByClassName("modalBackground")[0];
    const modalClose = document.getElementsByClassName("modalClose")[0];
    const modalActive = document.getElementsByClassName("modalActive")[0];
    function bodyMargin() {
        bodyElementHTML.style.marginRight = "-" + scrollbarWidth + "px";
    }

    bodyMargin();

    modalTrigger.addEventListener("click", function () {
        modalBackground.style.display = "block";

        if (windowInnerWidth >= 1366) {
            bodyMargin();
        }
        modalActive.style.left = "calc(50% - " + (175 - scrollbarWidth / 2) + "px)";
    });

    modalClose.addEventListener("click", function () {
        modalBackground.style.display = "none";
        if (windowInnerWidth >= 1366) {
            bodyMargin();
        }
    });

    modalBackground.addEventListener("click", function (event) {
        if (event.target === modalBackground) {
            modalBackground.style.display = "none";
            if (windowInnerWidth >= 1366) {
                bodyMargin();
            }
        }
    });
}

if (!isUserLoggedIn) {
    const modalTrigger = document.getElementById("InputButton")
    ViewModelaWindow(modalTrigger)
}