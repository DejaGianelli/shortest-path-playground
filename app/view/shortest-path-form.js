export default function createShortestPathForm(app) {
    let path = [];

    const submitBtn = document.querySelector(".shortest-path-form__submit-btn")

    submitBtn.addEventListener("click", handleSubmit)

    function handleSubmit(e) {
        e.preventDefault()
        const fromInput = document.querySelector("#shortest-path-form input[name='from']")
        const toInput = document.querySelector("#shortest-path-form input[name='to']")
        if (!fromInput.value || !toInput.value) {
            throw Error("You must inform from and to")
        }
        console.log(fromInput.value, toInput.value)
        path = app.getShortestPath(fromInput.value, toInput.value)
        console.log(path)
        showResult()
    }

    function stringfyPath() {
        let result = ""
        for (let i = 0; i < path.length; i++) {
            result += path[i]
            if (i < (path.length - 1)) {
                result += " -> "
            }
        }
        return result
    }

    function showResult() {
        const resultElement = document.querySelector(".shortest-path-form__result")
        resultElement.innerHTML = stringfyPath()
    }

    return {
        path
    }
}