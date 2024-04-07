export default function createModal(modalElement) {

    const modalCloseBtn = modalElement.querySelector(".modal__close")

    function close(e) {
        modalElement.close()
    }

    function open(e) {
        modalElement.show()
    }

    modalCloseBtn.addEventListener("click", close)

    return {
        open,
        close
    }
}