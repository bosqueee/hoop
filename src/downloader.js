    const axios = require("axios")
    const cheerio = require("cheerio")


    async function tiktok(url) {
           try {
          let data = await axios.get("https://tiktokdownload.online/en", {
             headers: {
                "Hx-Current-Url": "https://tiktokdownload.online/en",
                "Hx-Request": true,
                "Hx-Target": "target",
                "Hx-Trigger": "_gcaptcha_pt",
                "Origin": "https://tiktokdownload.online",
                "Referer": "https://tiktokdownload.online/en",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188"
             }
          })

          let tt = /tt:(["'])(.*?)\1/g.exec(data.data)[2]

          data = await axios.post("https://tiktokdownload.online/abc?url=dl", {
             id: url,
             locale: "en",
             tt
          }, {
             headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "id,en-US;q=0.9,en;q=0.8",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Hx-Current-Url": "https://tiktokdownload.online/en",
                "Hx-Request": true,
                "Hx-Target": "target",
                "Hx-Trigger": "_gcaptcha_pt",
                "Origin": "https://tiktokdownload.online",
                "Referer": "https://tiktokdownload.online/en",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188"
             }
          })

          let $ = cheerio.load(data.data)

          let slide = $("ul > li").map((a, b) => {
             return $(b).find("a").attr('href') || $(b).find("img").attr("src")
          }).get()

          let result = {
             thumbnail: $("img.result_author").attr("src"),
             author: $("div.pure-u-18-24.pd-lr > h2").text().trim() || $("div.pure-u-20-24.pd-lr > h2").text().trim(),
             description: $("div.pure-u-18-24.pd-lr > p").text().trim(),
             mp4: $("a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark.vignette_active.notranslate").attr("href") || slide,
             mp3: $("a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.music.vignette_active.notranslate").attr("href") || $("a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.music.notranslate").attr("href"),
             like: $("div.d-flex.flex-1.align-items-center.justify-content-start").text().trim(),
             comment: $("div.d-flex.flex-1.align-items-center.justify-content-center").text().trim(),
             share: $("div.d-flex.flex-1.align-items-center.justify-content-end").text().trim()
          }

          return result
       } catch (e) {
          throw e
       }
    }



    module.exports = { tiktok }
