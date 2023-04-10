const puppeteer = require("puppeteer")
const fs = require('fs');
const https = require('https');
const ModelTour = require('./models/tour.model')
const ModelDetailTour = require('./models/detailTour.model')

const download = (url, destination) => new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, response => {
        response.pipe(file);

        file.on('finish', () => {
            file.close(resolve(true));
        });
    }).on('error', error => {
        fs.unlink(destination);

        reject(error.message);
    });
});
const convertPrice = (price) => {
    return Number(price.replace(/,|đ/g, ''))
}
const rename = (name) => {
    const lengthName = name.split("/").length
    const rename1 = name.split("/")[lengthName - 1]
    return rename1.split(".")[0]
}

const renamecode = (name) => {
    return name.split(" ")[1]
}


const crawler = async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 0 });
    const page = await browser.newPage();

    // crawl tour

    await page.goto("https://www.vietnambooking.com/du-lich")
    const listTour = await page.evaluate(() =>
        Array.from(document.querySelectorAll("#tab_footer_tour ul li a"), (e) => e.href)
    );
    // console.log(listTour.length)
    for (let i = 0; i <= listTour.length; i++) {
        await page.goto(`https://www.vietnambooking.com/du-lich/tour-du-lich/${listTour[i]}`);

        // crawl tour
        // const listNameTour = await page.evaluate(() =>
        //     Array.from(document.querySelectorAll("ul li .box-content .title-h3"), (e) => e.innerText)
        // );
        // const listCodeTour = await page.evaluate(() =>
        //     Array.from(document.querySelectorAll(".category-box-list-default-inner .box-content .box-summary-content-tour .tlb-time-and-traffic-tour tbody tr:first-child td:first-child"), (e) => e.innerText)
        // );
        // const listImagesTour = await page.evaluate(() =>
        //     Array.from(document.querySelectorAll("ul li .box-img a img"), (e) => e.src)
        // );
        // const listPriceTour = await page.evaluate(() =>
        //     Array.from(document.querySelectorAll("ul li .box-price-promotion-tour span"), (e) => e.innerText)
        // );
        // for (let j = 0; j < listNameTour.length; j++) {
        //     if (listNameTour[j] !== undefined && listImagesTour[j] !== undefined && listPriceTour[j] !== undefined) {
        //         // console.log(listNameTour[j])
        //         // console.log(renamecode(listCodeTour[j]))
        //         // console.log((listImagesTour[j]))
        //         // console.log(rename(listImagesTour[j]))
        //         // console.log(listPriceTour[j])
        //         let findtour = 0
        //         await ModelTour.find({ name: listNameTour[j] })
        //             .then(res => {
        //                 console.log("trả về: " + res.length)
        //                 findtour = res.length
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //             })
        //         if (findtour < 1) {
        //             await download(listImagesTour[j], `upload/tour/${rename(listImagesTour[j])}.jpg`)
        //             const timeStart = new Date()
        //             await ModelTour.create({
        //                 name: listNameTour[j],
        //                 code: renamecode(listCodeTour[j]),
        //                 image: `upload/tour/${rename(listImagesTour[j])}.jpg`,
        //                 price: convertPrice(listPriceTour[j]),
        //                 timeStart: timeStart,
        //                 timeEnd: timeStart.setDate(timeStart.getDate() + Math.floor(Math.random() * 5) + 1),
        //             })
        //                 .then(res => {
        //                     console.log("Thêm thành công" + res)
        //                 })
        //                 .catch(err => {
        //                     console.log(err)
        //                 })
        //         }
        //     }
        // }

        ////////////////////////////////////////////////////////////////
        // crawl detail tour
        const listNameTour3 = await page.evaluate(() =>
            Array.from(document.querySelectorAll("ul li .box-content .title-h3 a"), (e) => e.href)
        );
        for (let a = 0; a < listNameTour3.length; a++) {
            await page.goto(listNameTour3[a])
            const name = await page.evaluate(() => document.querySelector(".single-box-content-inner .title-tour").innerText)
            const tour = await ModelTour.find({ name: name })
                .then(data => {
                    return data[0]._id
                })
                .catch(err => {
                    console.log(err)
                })
            const findtour = await ModelDetailTour.find({ tour: tour })
                .then(res => {
                    return res.length
                })
                .catch(err => {
                    console.log(err)
                })
            if (findtour < 1) {
                const schedule = await page.evaluate(() => document.querySelector('#program-tour-0 .panel-body').innerHTML);

                await ModelDetailTour.create({
                    tour: tour,
                    listImage: [
                        "upload/tour/bai-xep-300x194.jpg",
                        "upload/tour/baidinh2-300x194.jpg",
                        "upload/tour/ban-cat-cat-sapa-300x200.jpg",
                        "upload/tour/bao-tang-mo-Muang-Boran-Bangkok-300x172.jpg",
                        "upload/tour/canh-dong-hoa-thach-thao-Vung-Tau-300x194.jpg",
                    ],
                    seats: Math.floor(Math.random() * 20) + 10,
                    departureFrom: "",
                    schedule: [
                        `${schedule}`
                    ]
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

    //crawl tin tức
    // await page.goto(`https://www.vietnambooking.com/du-lich/trai-nghiem?page=2`)
    // console.log("số lượng tour" + count)
    await browser.close();
}

module.exports = crawler