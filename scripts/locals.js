var map;
var infowindow = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -22.227520, lng: -54.809613 },
        zoom: 14
    });
    
    var card_list = document.querySelector("#card-columns");

    for (var i = 0; i < locals_list.length; i++) {
    	console.log("ola mundo")
    	var marker = new google.maps.Marker ({
    		position: {
    			lat: locals_list[i].lat,
    			lng: locals_list[i].lng
    		},

    		map: map,
    		title: locals_list[i].name
    	})


    	card_list.innerHTML +=
    		`<div class="open-modal card mb-3 mr-5 col-sm-12 col-md-6 col-lg-4" data-local-id="${i}">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src="${locals_list[i].img}" class="card-img" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${locals_list[i].name}</h5>
                    <p class="card-text">${locals_list[i].category}</p>
                    <p class="card-text badge ${locals_list[i].option_color}">${locals_list[i].option_type}</p>
                  </div>
                </div>
              </div>
            </div>`;

        


        

        marker.addListener('click',openInfoWindow(i, map, marker));


    }

    document.querySelectorAll(".open-modal").forEach((element) => {
    	element.addEventListener("click", (event) => {
    		let local_id = event.currentTarget.getAttribute('data-local-id');
    		document.querySelector('#localModal .modal-title').innerHTML = locals_list[local_id].name;
    		document.querySelector('#localModal .modal-body').innerHTML = 
    			`<div>
    			  <p class="card-text badge ${locals_list[local_id].option_color}">${locals_list[local_id].option_type}</p>
    			  <p><i class="fas fa-map-marker-alt"></i> ${locals_list[local_id].address}</p>
    			  <p><i class="fas fa-phone"></i> ${locals_list[local_id].phone}</p>
    			  <p>${locals_list[local_id].products}</p>
    			</div>`;


    		$('#localModal').modal('show');
    	})
    }) 

}

function openInfoWindow(company, map, marker){
	return (event) => {
		var info_estrutura = `<div>
		                        <h5>${locals_list[company].name}</h5>
		                        <p>${locals_list[company].category}</p>
		                        <p class="card-text badge ${locals_list[company].option_color}">${locals_list[company].option_type}</p>
        					  </div>`;
        if (infowindow){
        	infowindow.close();
        }

        infowindow = new google.maps.InfoWindow({
        	content: info_estrutura
        });

        infowindow.open(map,marker);
	}
}

