var map;
var infowindow = null;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -22.227520, lng: -54.809613 },
    zoom: 14
  });

  var card_list = document.querySelector("#card-columns");

  for (var i = 0; i < locals_list.length; i++) {
    var marker = new google.maps.Marker({
      position: {
        lat: locals_list[i].lat,
        lng: locals_list[i].lng
      },

      map: map,
      title: locals_list[i].title
    })

    card_list.innerHTML += /*html*/`
      <div class="open-modal card" data-local-id="${i}">
        <img class="card-img-top" src="${locals_list[i].img}" alt="Logo ${locals_list[i].name}">
        <div class="card-body">
          <h5 class="card-title">${locals_list[i].name}</h5>
          <p class="card-text">${locals_list[i].category}</p>
          <p class="card-text">
            <small class="badge ${locals_list[i].option_color}">${locals_list[i].option_type}</small>
          </p>
        </div>
      </div>
    `;

    marker.addListener('click', openInfoWindow(i, map, marker));
  }

  document.querySelectorAll(".open-modal").forEach((element) => {
    element.addEventListener("click", (event) => {
      let local_id = event.currentTarget.getAttribute('data-local-id');
      document.querySelector('#localModal .modal-title').innerHTML = locals_list[local_id].name;

      document.querySelector('#localModal .modal-body').innerHTML = /*html*/`
        <div class="row" >
          <div class="col-6">
            <span class="badge ${locals_list[local_id].option_color}">
              ${locals_list[local_id].option_type}
            </span>
          </div>
          <div class="col-6 text-right">
            ${get_links_networks(local_id)}
          </div>
          <div class="col-12 mt-2">
            <i class="fas fa-map-marker-alt"></i>
            ${locals_list[local_id].address}
          </div>
          <div class="col-12">
            <i class="fas fa-phone"></i>
            ${locals_list[local_id].phone}
          </div>
        </div>

        <div class="list-group mt-3">
          ${get_products_list(local_id)}
        </div>
      `;

      $('#localModal').modal('show');
    })
  })

}

function openInfoWindow(company, map, marker) {
  return (event) => {
    var info_structure = /*html*/`
      <h5 class="col-12">
        ${locals_list[company].name}
        <small class="badge ${locals_list[company].option_color} float-right d-none d-md-inline">
          ${locals_list[company].option_type}
        </small>
      </h5>
      <div class="col-12">
        ${locals_list[company].category}
        <span class="d-none d-md-inline float-right">
          ${get_links_networks(company)}
        </span>
      </div>
      <div class="col-12 text-center d-block d-md-none">
        <span class="badge ${locals_list[company].option_color}">
          ${locals_list[company].option_type}
        </span>
      </div>
      <div class="col-12 text-center d-block d-md-none">
        ${get_links_networks(company)}
      </div>
      <div class="col-12 mt-2">
        <i class="fas fa-map-marker-alt"></i>
        ${locals_list[company].address}
      </div>
      <div class="col-12">
        <i class="fas fa-phone"></i>
        ${locals_list[company].phone}
      </div>
      <div class="list-group mt-3">
        ${get_products_list(company)}
      </div>
    `;

    if (infowindow) {
      infowindow.close();
    }

    infowindow = new google.maps.InfoWindow({
      content: info_structure
    });

    infowindow.open(map, marker);
  }
}

function get_products_list(local_id) {
  return locals_list[local_id].products.reduce(
    (acumulator, currentValue, index) => {
      return /*html*/`
        ${acumulator}
        <div href="#" class="list-group-item ">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">
              ${currentValue.title}
            </h5>
            <small>
              <i class="fas ${currentValue.icon}"></i>
            </small>
          </div>
          <p class="mb-1">${currentValue.description}</p>
        </div>
      `
    },
    ""
  )
}

function get_links_networks(local_id) {
  return locals_list[local_id].social_networks.reduce(
    (acumulator, currentValue) => acumulator + `<a href="${currentValue.link}" target="_blank" class="mr-2"><i class="fab ${currentValue.icon}"></i></a>`,
    ""
  )
}
