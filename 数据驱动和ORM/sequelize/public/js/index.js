// 简单请求
// fetch("http://localhost:2000/api/student")
//     .then(resp => resp.json())
//     .then(resp => {
//         console.log(resp);
//     });
// 复杂请求


// fetch("http://localhost:2000/api/student", {
//     method: "POST",
//     headers: {
//         a: 1
//     },
//     credentials: 'include'
// }).then(resp => resp.json()).then(resp => {
//     console.log(resp);
// })


login.onclick = function () {
    fetch("api/admin/login", {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            loginId: "tyq",
            loginPwd: "123123",
        })
    }).then(resp => resp.json()).then(resp => {
        console.log(resp);
    })
}


updateStu.onclick = function () {
    fetch("api/student/21", {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: "abc"
        })
    }).then(resp => resp.json()).then(resp => {
        console.log(resp);
    })
}