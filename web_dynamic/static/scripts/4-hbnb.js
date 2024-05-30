// Function to check the status of the API
function checkApiStatus () {
  // Send a GET request to the API status endpoint
  $.get('http://localhost:5001/api/v1/status/')
    .done(function (response) {
      // If the response status is 'OK', add the 'available' class to the element with id 'api_status'
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        // If the response status is not 'OK', remove the 'available' class from the element with id 'api_status'
        $('#api_status').removeClass('available');
      }
    })
    .fail(function () {
      // If the request fails, remove the 'available' class from the element with id 'api_status'
      $('#api_status').removeClass('available');
    });
}

function fetchPlaces (data = {}) {
  // Send a POST request with Content-Type: application/json and an empty dictionary in the body - cURL version:
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (response) {
      // Loop into the result of the request
      // Handle if search button is clicked
      $.each(response, function (index, place) {
        // Create a new article element for each place and add place data to the article section
        const article = $('<article></article>');
        const titleBox = $('<div></div>').addClass('title_box').html('<h2>' + place.name + '</h2>');
        article.append(titleBox);

        const priceByNight = $('<div></div>').addClass('price_by_night').html('$' + place.price_by_night);
        titleBox.append(priceByNight);

        const information = $('<div></div>').addClass('information');
        const guestText = place.max_guest === 1 ? ' Guest' : ' Guests';
        const guests = $('<div></div>').addClass('max_guest').html(place.max_guest + guestText);
        article.append(information);

        const numberRoomsText = place.number_rooms === 1 ? ' Bedroom' : ' Bedrooms';
        const numberRooms = $('<div></div>').addClass('number_rooms').html(place.number_rooms + numberRoomsText);

        const numberBathroomsText = place.number_bathrooms === 1 ? ' Bathroom' : ' Bathrooms';
        const numberBathrooms = $('<div></div>').addClass('number_bathrooms').html(place.number_bathrooms + numberBathroomsText);

        information.append(guests, numberRooms, numberBathrooms);

        const user = $('<div></div>').addClass('user');
        const description = $('<div></div>').addClass('description').html(place.description);
        article.append(user);
        user.append(description);

        $('.places').append(article);
      });
    }
  });
}

// Script execute only when DOM is loaded
$(document).ready(function () {
  // Define the maximum length for the displayed amenity names
  const maxLength = 30;

  // Dictionary to store the selected amenity IDs and names
  const amenityIdDict = {};

  // Listen for changes on each input checkbox tag:
  $('input[type=checkbox]').change(function () {
    // If the checkbox is checked, store the Amenity ID in the dictionary
    if (this.checked) {
      amenityIdDict[$(this).data('id')] = $(this).data('name');
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the dictionary
      delete amenityIdDict[$(this).data('id')];
    }

    // Update the h4 tag inside the div Amenities with the list of checked amenity names
    const amenityNames = Object.values(amenityIdDict).join(', ');
    const truncatedText =
      amenityNames.length > maxLength
        ? amenityNames.substring(0, maxLength) + '...'
        : amenityNames;
    $('.amenities').find('h4').text(truncatedText);
  });

  // Call the checkApiStatus function to check the API status
  checkApiStatus();
  // Fetch all places
  fetchPlaces();
  // When the button tag is clicked,
  $('button').click(function () {
    $('.places').empty();
    // Fetch and display all places filtered by amenities
    const idsList = Object.keys(amenityIdDict);
    fetchPlaces({
      amenities: idsList
    });
  });
});
