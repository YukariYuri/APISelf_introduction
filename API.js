const ApiPort = 'http://localhost:3000'

async function getInfoData() {
    const blacklist = ["profile_img"];
    const info_tag = document.getElementById("info");
    const profile_img_tag = document.getElementById("profile-img");

    const response = await fetch(`${ApiPort}/Info`)
        .then(res => res.json())
        .catch(err => {
            return {error : err};
        })

    
    if (!response.error) {
        info_tag.innerHTML = "";

        for (let key in response) {
            if (blacklist.includes(key)) continue;

            let val = response[key];
            
            if (Array.isArray(val)) {
                val = val.join(", ");
            }

            info_tag.innerHTML += `<p id="${key}">${key} : ${val}</p>`;
        }

        profile_img_tag.src = response.profile_img;
    } else {
        info_tag.innerHTML = `<center><p id="info-err">ไม่สามารถดึงข้อมูลได้ ${response.error}</p></center>`;
    }
}

getInfoData()