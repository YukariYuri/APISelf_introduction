const ApiPort = 'http://localhost:3000'
const ApiJikan = 'https://api.jikan.moe/v4'

const Anime = ["gosick", "toradora", "shadows house"]

async function getResponse(port, path) {
    let url
    if (!path) {
        url = `${port}`;
    } else {
        url = `${port}/${path}`;
    }

    const response = await fetch(url)
        .then(res => res.json())
        .catch(err => {
            return {
                error : err,
                status : err.status
            };
        })
    return response
}

async function getInfoData() {
    const blacklist = ["profile_img"];
    const info_tag = document.getElementById("info");
    const profile_img_tag = document.getElementById("profile-img");

    const anime_tag = document.getElementById("anime");

    // API ตัวเอง
    const response_self = await getResponse(ApiPort, "Info");

    // แสดงข้อมูลตัวเอง
    if (!response_self.error) {
        info_tag.innerHTML = "";

        for (let key in response_self) {
            if (blacklist.includes(key)) continue;

            let val = response_self[key];
            
            if (Array.isArray(val)) {
                val = val.join(", ");
            }

            info_tag.innerHTML += `<p id="${key}">${key} : ${val}</p>`;
        }

        profile_img_tag.src = response_self.profile_img;
    } else {
        info_tag.innerHTML = `<center><p id="info-err">ไม่สามารถดึงข้อมูลได้ ${response_self.error}</p></center>`;
    }

    // API Jikan + แสดงข้อมูล
    for (let key in Anime) {
        let val = Anime[key]

        const response_jikan = await getResponse(ApiJikan, `anime?q=${val}`);

        if (response_jikan && response_jikan.data) {
            const anime = response_jikan.data[0]; // เอาตัวแรก
            console.log(anime)

            // ข้อมูล
            const Img = anime.images.jpg.large_image_url;
            const title = anime.title;
            const score = anime.score;
            const synopsis = anime.synopsis;

            anime_tag.innerHTML += `
                <div id="${val}" style="display: flex; gap: 15px">
                    <span>
                        <img src="${Img}" style="width: 120px; height: 170px; object-fit: cover;">
                    </span>
                    <div id="${val}_data" style="display: flex; flex-direction: column; text-align: left">
                        <span style="padding: 5px;">Anime Name : ${title}</span>
                        <span style="padding: 5px;">Anime Rating : ${score} / 10</span>
                        <span style="padding: 5px;">Synopsis : ${synopsis.slice(0, 100) + "..."}</span>
                    </div>
                </div>
            `
                    
        } else if (response_jikan.status === "429"){
            anime_tag.innerHTML += `<p>Error Status : ${response_jikan.status} (Too Many Requests)</p>`
        }
    }
}

getInfoData()