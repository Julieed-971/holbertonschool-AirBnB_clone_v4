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
});

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

// Call the checkApiStatus function to check the API status
checkApiStatus();
