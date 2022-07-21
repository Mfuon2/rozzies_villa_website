

const update_rooms_slider = () => {
    const settings = {
        "url": "/api/images?category=rooms",
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

const update_rooms_gallery = () => {
    const settings = {
        "url": "/api/images?category=rooms",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        const resp = response.data;
        let template = `No data Loaded`;
        for(let i = 0; i < resp.length; i++){
            const path = resp[i].path
            const description = resp[i].description
            console.log(path)
            console.log(description)
            template = `
              <li>
                        <figure class="grid__figure">
                         <a href="${path}" target="_blank" class="glightbox" data-gall="venue-gallery" data-title="${description} &nbsp;">
                            <img src="${path}" alt="">
                            <figcaption>${description}</figcaption>
                            </a>
                        </figure>
                    </li>
            `
            $(".rooms-gallery-container").append(template);
        }
    });
}

