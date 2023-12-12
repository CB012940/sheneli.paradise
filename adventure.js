document.addEventListener('DOMContentLoaded', function () {
    const bookAdventureBtn = document.getElementById('bookAdventureBtn');

    bookAdventureBtn.addEventListener('click', function () {
        // Fetch values from the form
        const adventureType = document.getElementById('adventureType').value;
        const guideAdult = document.getElementById('guideAdult').checked;
        const guideKids = document.getElementById('guideKids').checked;

        // Calculate cost
        let adventureCost = 0;
        switch (adventureType) {
            case 'localAdult':
                adventureCost = 5000;
                break;
            case 'localKids':
                adventureCost = 2000;
                break;
            case 'foreignAdult':
                adventureCost = 10000;
                break;
            case 'foreignKids':
                adventureCost = 5000;
                break;
        }

        // Additional cost for a guide
        if (guideAdult) {
            adventureCost += 1000;
        }
        if (guideKids) {
            adventureCost += 500;
        }

        // Display the billing summary
        displayBookingSummary('Adventure Booking', adventureType, 1, guideAdult ? 1 : 0, guideKids ? 1 : 0, 1, adventureCost);

        // Reset form values
        document.getElementById('adventureType').value = 'localAdult';
        document.getElementById('guideAdult').checked = false;
        document.getElementById('guideKids').checked = false;
    });
});

function displayBookingSummary(bookingType, adventureType, numRooms, numAdults, numChildren, duration, totalCost) {
    // Display the booking summary on the page
    const currentBookingElement = document.getElementById('currentBooking');
    const currentCostElement = document.getElementById('currentCost');
    const overallBookingElement = document.getElementById('overallBooking');
    const overallCostElement = document.getElementById('overallCost');

    const bookingDetails = `${bookingType}: ${numRooms} ${adventureType} for ${numAdults} Adults, ${numChildren} Children, ${duration} hr${duration > 1 ? 's' : ''}.`;

    currentBookingElement.textContent = `Current Booking: ${bookingDetails}`;
    currentCostElement.textContent = `Cost of Current Booking: LKR ${totalCost.toFixed(2)}`;

    const overallBookingDetails = `${bookingType}: ${numRooms} ${adventureType} for ${duration} hr${duration > 1 ? 's' : ''}`;
    overallBookingElement.textContent = `Overall Booking: ${overallBookingDetails}`;
    overallCostElement.textContent = `Overall Cost: LKR ${totalCost.toFixed(2)}`;
}
