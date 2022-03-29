$(document).ready(function () {
    console.log("ready!");
    ClassicEditor
        .create(document.querySelector('#editor'))
        .then(newEditor => {
            editor = newEditor;
        })
        .catch(error => {
            console.error(error);
        });


    document.querySelector('#sendBtn').addEventListener('click', () => { // send data on the server
        const recipients = document.getElementById("exampleFormControlTextarea1").value.split();
        const editorData = { element: editor.getData() };
        console.log(editorData, recipients);
        return fetch("bulk", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({editorData, recipients})
        })
        .then(res => {
            console.log("Request complete! response:", res);
        })
        .catch((err) => console.log(err))
    });
});