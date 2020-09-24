
const url = 'https://hoermann-digital.firebaseio.com/bugs.json';

fetch(url)
    .then(res => res.json())
    .then(data => {
        let src = document.getElementById("header");
        for (report in data){
            let reportId = document.createElement("h2");
            reportId.innerHTML = "Bug report " + report + ":";
            src.appendChild(reportId);
            for (element in data[report]){
                if (element === 'screenshot') {
                    let img = document.createElement("img");
                    img.src = data[report][element];
                    src.appendChild(img);
                } else {
                    let text = document.createElement("p");
                    text.innerHTML = element + ": " + data[report][element];
                    src.appendChild(text);
                }
            }
        }
    }).catch(err => {
    console.log(err)
});