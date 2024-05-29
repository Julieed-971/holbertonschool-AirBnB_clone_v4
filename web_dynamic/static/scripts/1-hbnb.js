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
