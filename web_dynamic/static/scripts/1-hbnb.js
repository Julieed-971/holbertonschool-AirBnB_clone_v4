// Your script must be executed only when DOM is loaded
$( document ).ready(() => {
// Listen for changes on each input checkbox tag:
$( 'input[type=checkbox]' ).change(() => {
	amenityIdList = [];
	// if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
	if (this.checked) {
		amenityIdList.push(this.data_id);
	} else if (!this.checked) {
	// if the checkbox is unchecked, you must remove the Amenity ID from the variable
		amenityIdList.remove(this.data_id);
	}
	// update the h4 tag inside the div Amenities with the list of Amenities checked
	for (amenityId of amenityIdList) {
		$( 'div:amenities, h4' )
	}
	});
});

