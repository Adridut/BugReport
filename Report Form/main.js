let screenshot;

document.getElementById('screenshot').addEventListener('change', (event) => {
    img = '';
    status.textContent = '';
    const file = event.target.files[0];
    if (!file.type) {
        status.textContent = 'Error: The File.type property does not appear to be supported on this browser.';
        return;
    }
    if (!file.type.match('image.*')) {
        status.textContent = 'Error: The selected file does not appear to be an image.';
        return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', event => {
        img = event.target.result;
        screenshot = img;
    });
    reader.readAsDataURL(file);
});


const getData = () => {

    let priority;
    if (document.getElementById('medium').checked) {
        priority = "Medium"
    } else if (document.getElementById('high').checked) {
        priority = "High"
    } else {
        priority = "Low"
    }

    const data = {
        bug_title: document.getElementById('bug_title').value,
        reporter: document.getElementById('reporter').value,
        submit_date: document.getElementById('submit_date').value,
        summary: document.getElementById('summary').value,
        url: document.getElementById('url').value,
        screenshot: screenshot,
        browser: document.getElementById('browser').value,
        priority: priority,
        description: document.getElementById('description').value
    };

    return data;

};

const sendMail = (data) => {

    let url = "mailto:support@bugjack.com?Subject=Bug Report" + "&Body=Bug Report:%0A%0A"
        + "Bug title: " + data.bug_title + "%0A"
        + "Reporter: " + data.reporter + "%0A"
        + "Submit date: " + data.submit_date + "%0A"
        + "Summary: " + data.summary + "%0A"
        + "URL: " + data.url + "%0A"
        + "Browser: " + data.browser + "%0A"
        + "Priority: " + data.priority + "%0A"
        + "Description: " + data.description + "%0A";

    window.open(url);

};


let submit_button = document.getElementById('submit');
submit_button.addEventListener('click', () => {

    let data = getData();

    sendMail(data);

    let url = 'https://hoermann-digital.firebaseio.com/bugs.json';


    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(res => res.json())
        .then(res => console.log(res));

});
