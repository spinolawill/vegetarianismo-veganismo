var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -22.227520, lng: -54.809613 },
        zoom: 14
    });
    
    var card_list = document.querySelector("#card-columns");

    for (var i = 0; i < locals_list.length; i++) {
    	console.log("ola mundo")
    	new google.maps.Marker ({
    		position: {
    			lat: locals_list[i].lat,
    			lng: locals_list[i].lng
    		},

    		map: map,
    		title: locals_list[i].name
    	})


    	card_list.innerHTML +=
    		`<div class="card mb-3 mr-5 col-sm-12 col-md-6 col-lg-4">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src="${locals_list[i].img}" class="card-img" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${locals_list[i].name}</h5>
                    <p class="card-text">${locals_list[i].category}</p>
                    <p class="card-text badge badge-success">${locals_list[i].option_type}</p>
                  </div>
                </div>
              </div>
            </div>`;
   		
    }
}


