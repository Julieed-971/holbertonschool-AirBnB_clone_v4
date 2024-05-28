// Your script must be executed only when DOM is loaded
$(document).ready(function() {
	const maxLength = 30;
	const amenityIdDict = {};
	// Listen for changes on each input checkbox tag:
	$('input[type=checkbox]').change(function() {

		// if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
		if (this.checked) {
			amenityIdDict[$(this).data('id')]=$(this).data('name');
		} else {
		// if the checkbox is unchecked, you must remove the Amenity ID from the variable
			delete amenityIdDict[$(this).data('id')];
		}

		// update the h4 tag inside the div Amenities with the list of Amenities checked
		const amenityNames = Object.values(amenityIdDict).join(', ');
		const truncatedText = amenityNames.length > maxLength
      ? amenityNames.substring(0, maxLength) + '...'
      : amenityNames;
		$('.amenities').find('h4').text(truncatedText);
		});
});
