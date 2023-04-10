const puppeteer = require("puppeteer")
const fs = require('fs');
const http = require('http');
const https = require('https');
const { converBase64ToImage } = require('convert-base64-to-image')
const ModelNews = require('./models/news.model');
const removeVietnameseTones = require("./contants/removeVietnameseTones");

const download = (url, destination) => new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    if (!url.startsWith('data:')) {
        https.get(url, response => {
            response.pipe(file);

            file.on('finish', () => {
                file.close(resolve(true));
            });
        }).on('error', error => {
            fs.unlink(destination);

            reject(error.message);
        });
    }

    // var url2 = new URL(url)
    // var client = http;
    // client = (url2.protocol == "https:") ? https : client;
    // // Now the client is loaded with the correct Client to retrieve the URI.
    // client.get(url, response => {
    //     response.pipe(file);

    //     file.on('finish', () => {
    //         file.close(resolve(true));
    //     });
    // }).on('error', error => {
    //     fs.unlink(destination);

    //     reject(error.message);
    // });
    // console.log(url2.protocol)
    // if (url2.protocol == "https") {
    //     https.get(url, response => {
    //         response.pipe(file);

    //         file.on('finish', () => {
    //             file.close(resolve(true));
    //         });
    //     }).on('error', error => {
    //         fs.unlink(destination);

    //         reject(error.message);
    //     });
    // }
    // else {
    //     http.get(url, response => {
    //         response.pipe(file);

    //         file.on('finish', () => {
    //             file.close(resolve(true));
    //         });
    //     }).on('error', error => {
    //         fs.unlink(destination);

    //         reject(error.message);
    //     });
    // }

});

const rename = (name) => {
    return removeVietnameseTones(name).split(" ")
        .join("-")
        .toLowerCase()

}

const crawlernews = async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();

    // crawl new
    for (let i = 1; i < 50; i++) {
        await page.goto(`https://www.vietnambooking.com/du-lich/trai-nghiem?page=${i}`, {
            timeout: 30000,
            waitUntil: "load"
        })

        const listNameTour = await page.evaluate(() =>
            Array.from(document.querySelectorAll(".category-box-list-default-inner ul li h3"), (e) => e.innerText)
        );
        const listSummaryTour = await page.evaluate(() =>
            Array.from(document.querySelectorAll(".category-box-list-default-inner ul li .box-content .box-description"), (e) => e.innerText)
        );
        const listImagesTour = await page.evaluate(() =>
            Array.from(document.querySelectorAll(".category-box-list-default-inner ul li .box-img a img"), (e) => e.src)
        );
        for (let j = 0; j < listNameTour.length; j++) {
            // var url = new URL(listImagesTour[j])
            // console.log(url.protocol)
            // console.log(listImagesTour[j])
            // && url.protocol == 'https:'
            if (listNameTour[j] !== undefined && listImagesTour[j] !== undefined && listSummaryTour[j] !== undefined) {
                var url = new URL(listImagesTour[j])
                if (url.protocol == "https:") {

                    // console.log(listNameTour[j])
                    // console.log((listImagesTour[j]))
                    // const path = converBase64ToImage(listImagesTour[j], `./news/image_${i}.jpg`) //returns path /public/image.png 
                    // console.log(path)
                    // console.log(rename(listImagesTour[j]))
                    // console.log(download(listImagesTour[j], `upload/news/${i}.jpg`))
                    await download(listImagesTour[j], `upload/news/${rename(listNameTour[j])}.jpg`)
                    await ModelNews.create({
                        name: listNameTour[j],
                        image: `upload/news/${rename(listNameTour[j])}.jpg`,
                        summary: listSummaryTour[j],
                        view: Math.floor(Math.random() * 100) + j
                    })
                        .then(res => {
                            console.log("Thêm thành công" + res)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        }
        // console.log(listNameTour)
        // console.log(listImagesTour)

    }

    await browser.close();
}

module.exports = crawlernews