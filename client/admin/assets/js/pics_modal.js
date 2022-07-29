// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
const notification = $('#notification')
const uploadImages1 = $('#uploadImageId')
const picturesSection = $(".rooms_cl")
async function fetch_pictures(categories) {

    async function promised_fetch(category) {

        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/images?category=${category}`,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    resolve(JSON.parse(JSON.stringify(response)));
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
    }

    return promised_fetch(categories);
}
const uploadImages = () => {
    notification.hide()
    uploadImages1.text("Uploading...")
    uploadImages1.prop('disabled', true);
    const e = document.getElementById("category");
    const category = e.value;
    const categories = ["rooms", "culinary", "activities", "local", "tour"];
    if(!categories.includes(category)){
        notification.show()
        uploadImages1.text("Upload Pictures")
        uploadImages1.prop('disabled', false);
        return 0;
    }else {
        uploadImages1.text("Uploading...")
        uploadImages1.prop('disabled', true);
        notification.hide()
    }
    let data = new FormData()
    $.each($("input[type='file']")[0].files, function(i, file) {
        if(file.name === undefined){
            notification.hide();
            return 0;
        }
        data.append('image', file, file.name);
    });
    const title = $('#title').val();
    const description = $('#description').val();
    data.append("title",title)
    data.append("description",description)
    const settings = {
        "url": `/upload-images?category=${category}&title=${title}&description=${description}`,
        "method": "POST",
        "async": false,
        "cache": false,
        "timeout": 60000,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": data,
        error: (err) => {
            uploadImages1.text("Upload Pictures")
            uploadImages1.prop('disabled', false);
        },
        success: (res) => {
            const da = JSON.parse(res)
            let data = da.data
            if(data.length > 0) {
                notification.hide();
                $("#myModal").hide();
            }

        }
    };
    $.ajax(settings);
}
const deleteImage = (e) => {
    console.log(e.id)
    const settings = {
        url: "/api/images/delete/image",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            imageId: e.id
        }),
    };

    $.ajax(settings).done(function (response) {
        location.reload();
    });
}

$('#selectCategory').change(async function () {
    picturesSection.empty()
    const $option = $(this).find('option:selected');
    const value = $option.val();
    notification.hide();
    const rooms = await fetch_pictures(`${value}`).then(x => {return x})
    const data = rooms.data
    let template = `No data Loaded`;
    if(data.length > 0){
        data.forEach((x) => {
            console.log(x.path)
            template = `
             <div class="col-md-4">
                        <div class="card card-background">
                            <div class="full-background" style="background-image: url('${x.path}')"></div>
                            <div class="card-body pt-6">
                                <h4 class="text-white font-weight-normal">${x.title}</h4>
                                <p>${x.description}</p>
                            </div>
                        </div>
                        <hr>
                        <button id="${x.imageId}" onclick="deleteImage(this)" class="btn btn-icon btn-3 btn-sm btn-outline-danger" type="button">
                            <span class="btn-inner--icon"><i class="material-icons">delete</i></span>
                            <span class="btn-inner--text">Delete</span></button>
                    </div>
            `
            $(".rooms_cl").append(template);
        });
    }else {
        picturesSection.empty()
        picturesSection.append(`<p>No Data Loaded </p>`);
    }
});

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
