const axios = require('axios').default;
const cheerio = require('cheerio');
const Book = require('../models/book');

/**
 * 获取页面的html
 * @returns 
 */
async function getBooksHtml() {
    const resp = await (await axios.get('https://book.douban.com/latest'));
    return resp.data;
}

/**
 * 根据html获取每一本书详情页地址
 */
async function getBooksLink() {
    const html = await getBooksHtml();
    const $ = cheerio.load(html);
    const as = $('.grid-12-12 ul li .cover');
    const links = as.map((i, elem) => {
        const href = elem.attribs['href'];
        return href;
    }).get();
    return links;
}

/**
 * 根据书的url获取书本的详细信息
 * @param {*} bookUrl 
 */
async function getBookDetails(bookUrl) {
    const html = await (await axios.get(bookUrl)).data;
    const $ = cheerio.load(html);
    const name = $('h1').text().trim(); // 书本名字
    const imgurl = $('#mainpic a.nbg img').attr('src'); // 书本图片地址
    const author = $('#info span:first-child a').text(); // 书本作者
    const spans = $('#info .pl');
    const publishSpan = spans.filter((i, ele) => {
        return $(ele).text().includes('出版年');
    });
    const publishDate = publishSpan[0].nextSibling.nodeValue.trim(); // 书本的出版年
    return {
        name,
        imgurl,
        author,
        publishDate
    };
}

// 获取所有书本信息
async function getAllBooksList() {
    const links = await getBooksLink();
    const proms = links.map((link) => {
        return getBookDetails(link)
    });
    return Promise.all(proms);
}

/**
 * 保存数据到数据库
 */
async function toSaveBooks() {
    const books = await getAllBooksList();
    await Book.bulkCreate(books);
    console.log('爬取并保存数据完成');
}
toSaveBooks();

