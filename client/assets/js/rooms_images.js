

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
              <div class="col-lg-3 col-md-4">
                    <div class="venue-gallery">
                        <a href="${path} " class="glightbox" data-gall="venue-gallery" data-title="All rooms have king-size beds with comfortable mattresse, a mosquito net and two dimmable bedside
                        lamps. The rooms also have spacious closets with built in shelves. <br><br> &nbsp;">
                            <img src="${path}" alt=" " class="img-fluid">
                        </a>
                    </div>
                </div>
            `
            $(".rooms-gallery-container").append(template);
        }
    });
}

