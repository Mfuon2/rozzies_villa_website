
$(() => {
    update_rooms_images();
});
const update_rooms_images = () => {
    const settings = {
        "url": "http://localhost:3000/api/images?category=rooms",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        const resp = response.data;
        let template = `No data Loaded`;
        for(let i = 0; i < resp.length; i++){
            const path = resp[i].path
            console.log(path)
            template = `
             <div class="swiper-slide ">
                    <a href="${path}" class="gallery-lightbox "><img src="${path}" class="img-fluid " alt=" "></a>
                </div>
            `
            $(".rooms-container").append(template);
        }
    });
}