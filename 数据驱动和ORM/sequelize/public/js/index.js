
function jsonp(url) {
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);

    script.onload = () => {
        script.remove();
    }
}


function callback(data) {
    console.log(data);
}

jsonp("http://localhost:2000/api/student");