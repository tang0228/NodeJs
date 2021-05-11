const util = require('util');

// function delay(duration = 1000) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(duration);
//         }, duration);
//     })
// }

// const delayCall = util.callbackify(delay);

// delayCall(500, (err, data) => {
//     console.log(data);
// })

// function cb(duration, callback) {
//     setTimeout(() => {
//         callback(null, duration);
//     }, duration)
// }

// const pro = util.promisify(cb);

// pro(500).then(res => {
//     console.log(res)
// })

// const obj1 = {
//     a: 1,
//     b: {
//         c: 1,
//         d: {
//             e: 1
//         }
//     }
// }

// const obj2 = {
//     a: 1,
//     b: {
//         c: 1,
//         d: {
//             e: '1'
//         }
//     }
// }

// console.log(util.isDeepStrictEqual(obj1, obj2));