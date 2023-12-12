/**Hotel Booking */
document.addEventListener('DOMContentLoaded', function () {
    const bookNowBtn = document.getElementById('bookNowBtn');
    const checkLoyaltyBtn = document.getElementById('checkLoyaltyBtn');
    //  console.log("Working")

    bookNowBtn.addEventListener('click', function () {
        // Fetch values from the form
        const roomType = document.getElementById('roomType').value;
        const numRooms = parseInt(document.getElementById('numRooms').value, 10);
        const numAdults = parseInt(document.getElementById('numAdults').value, 10);
        const numChildren = parseInt(document.getElementById('numChildren').value, 10);
        const duration = parseInt(document.getElementById('duration').value, 10);
        const wifi = document.getElementById('wifi').checked;
        const poolView = document.getElementById('poolView').checked;
        const gardenView = document.getElementById('gardenView').checked;
        const promoCode = document.getElementById('promoCode').value;

        // Calculate cost
        let roomCost = 0;
        switch (roomType) {
            case 'single':
                roomCost = 25000;
                break;
            case 'double':
                roomCost = 35000;
                break;
            case 'triple':
                roomCost = 40000;
                break;
        }

        const extraMealCost = (numChildren > 0) ? (numChildren * 5000) : 0;
        const extraBedCost = (numAdults > 0 && numChildren > 0) ? 8000 : 0;

        let totalCost = (roomCost * numRooms * duration) + extraMealCost + extraBedCost;

        // Apply promo code discount if valid
        if (promoCode === 'Promo123') {
            totalCost *= 0.95; // 5% discount
        }

        // Display the billing summary
        displayBookingSummary('Hotel Booking', roomType, numRooms, numAdults, numChildren, duration, wifi, poolView, gardenView, totalCost);

        // Save order as a favorite in local storage
        saveOrderAsFavorite();

        // Update loyalty points
        updateLoyaltyPoints(numRooms);
    });

    checkLoyaltyBtn.addEventListener('click', function () {
        // Display loyalty points from local storage
        displayLoyaltyPoints(getLoyaltyPoints());
    });

    // Initialize the page
    initializePage();
});

function displayBookingSummary(bookingType, roomType, numRooms, numAdults, numChildren, duration, wifi, poolView, gardenView, totalCost) {
    // Display the booking summary on the page
    const currentBookingElement = document.getElementById('currentBooking');
    const currentCostElement = document.getElementById('currentCost');
    const overallBookingElement = document.getElementById('overallBooking');
    const overallCostElement = document.getElementById('overallCost');

    const bookingDetails = `${bookingType}: ${numRooms} ${roomType} room(s) for ${numAdults} Adults, ${numChildren} Children, ${duration} days stay. Extra requirements: ${wifi ? 'WiFi, ' : ''}${poolView ? 'Pool View, ' : ''}${gardenView ? 'Garden View' : ''}`;

    currentBookingElement.textContent = `Current Booking: ${bookingDetails}`;
    currentCostElement.textContent = `Cost of Current Booking: LKR ${totalCost.toFixed(2)}`;

    const overallBookingDetails = `${bookingType}: ${numRooms} ${roomType} room(s) for ${duration} days`;
    overallBookingElement.textContent = `Overall Booking: ${overallBookingDetails}`;
    overallCostElement.textContent = `Overall Cost: LKR ${totalCost.toFixed(2)}`;
}

function saveOrderAsFavorite() {
    // Save the current booking as a favorite in local storage
    const bookingDetails = {
        roomType : document.getElementById('roomType').value,
        numRooms: parseInt(document.getElementById('numRooms').value, 10),
        numAdults: parseInt(document.getElementById('numAdults').value, 10),
        numChildren: parseInt(document.getElementById('numChildren').value, 10),
        duration: parseInt(document.getElementById('duration').value, 10),
        wifi: document.getElementById('wifi').checked,
        poolView: document.getElementById('poolView').checked,
        gardenView: document.getElementById('gardenView').checked,
        promoCode: document.getElementById('promoCode').value
    };

    // localStorage.setItem('favoriteBooking', JSON.stringify(bookingDetails));
    localStorage.setItem("Data_store", JSON.stringify(bookingDetails));
}

function updateLoyaltyPoints(numRooms) {
    // Update loyalty points in local storage
    const loyaltyPoints = (numRooms > 3) ? numRooms * 20 : 0;
    localStorage.setItem('loyaltyPoints', loyaltyPoints.toString());
}

function getLoyaltyPoints() {
    // Retrieve loyalty points from local storage
    return parseInt(localStorage.getItem('loyaltyPoints'), 10) || 0;
}

function displayLoyaltyPoints(points) {
    // Display loyalty points on the page
    alert(`Loyalty Points: ${points}`);
}

function initializePage() {
    // Initialize the page when it first loads
    const currentBookingElement = document.getElementById('currentBooking');
    const currentCostElement = document.getElementById('currentCost');
    const overallBookingElement = document.getElementById('overallBooking');
    const overallCostElement = document.getElementById('overallCost');

    // Reset the booking information
    currentBookingElement.textContent = 'Current Booking:';
    currentCostElement.textContent = 'Cost of Current Booking: LKR 0.00';
    overallBookingElement.textContent = 'Overall Booking:';
    overallCostElement.textContent = 'Overall Cost: LKR 0.00';
}


