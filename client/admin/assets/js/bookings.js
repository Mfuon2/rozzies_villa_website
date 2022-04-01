const apply = async () => {
    const content = $('#content')
    content.children().remove();
    content.empty();
    content.html(await tables())
}
let ssss = 'Active bookings'

const tables = async () => {
    Swal.fire({
        html: 'Loading...',
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        }
    })
    const res = await $.get("/api/bookings", function (data, status) {
        Swal.close()
        if (status) {
            return data
        }
    });
    let tableRow = await populate(res.data)
    console.log(' =========== > ' + tableRow)
    if(res.success){
        return `<div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 class="text-white text-capitalize ps-3">${ssss}</h6>
              </div>
            </div>
            <div class="card-body">
              <div class="table-bordered">
                <table class="table table-striped table-sm align-items-center table-responsive table-bordered mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Client</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Start Date</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">End Date</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Account Number</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Transaction Ref</th>
                      <th class="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                  ${tableRow}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>`
    }
}

const populate = async (data) => {
    let html = ''
    for(let x = 0; x < data.length; x ++){
        let t = `<tr>
                      <td style="display: none">
                       ${data[x].bookingId}
                      </td>
                      <td>
                       ${data[x].clientName}
                      </td>
                      <td>
                      ${data[x].email}
                      </td>
                      <td>
                       ${data[x].startDate}
                      </td>
                      <td>
                       ${data[x].endDate}
                      </td>
                      <td>
                      ${data[x].accountNumber}
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">${data[x].bookingStatus}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${data[x].paymentTransactionRef}</span>
                      </td>
                      <td class="align-middle">
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                          View
                        </a>
                      </td>
                    </tr>`
      html += t
    }
    return html;
}
