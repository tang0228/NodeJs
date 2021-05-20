// 简单请求
// fetch("http://localhost:2000/api/student")
//     .then(resp => resp.json())
//     .then(resp => {
//         console.log(resp);
//     });
// 复杂请求

fetch("http://localhost:2000/api/student", {
    method: "POST",
    headers: {
        a: 1
    },
    credentials: 'include'
}).then(resp => resp.json()).then(resp => {
    console.log(resp);
})