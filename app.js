document.addEventListener('DOMContentLoaded', function() {
    const donationBtn = document.getElementById('donation-btn');
    const historyBtn = document.getElementById('history-btn');
    const donationSection = document.getElementById('donation-section');
    const historySection = document.getElementById('history-section');
    const balanceDisplay = document.querySelector('.text-yellow-500');
    let currentBalance = 5500; // Initial balance

    // Handle Donation/History button toggle
    donationBtn.addEventListener('click', function() {
        donationSection.classList.remove('hidden');
        historySection.classList.add('hidden');
        donationBtn.classList.add('bg-green-200');
        historyBtn.classList.remove('bg-green-200');
    });

    historyBtn.addEventListener('click', function() {
        donationSection.classList.add('hidden');
        historySection.classList.remove('hidden');
        historyBtn.classList.add('bg-green-200');
        donationBtn.classList.remove('bg-green-200');
    });

    // Handle Donate Now buttons
    const donateButtons = document.querySelectorAll('.bg-green-500');
    donateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const card = e.target.closest('.flex');
            const inputField = card.querySelector('input');
            const donationAmount = parseInt(inputField.value);
            const currentAmountDisplay = card.querySelector('.text-yellow-500');
            let currentDonationAmount = parseInt(currentAmountDisplay.textContent.replace(' BDT', ''));

            // Validate donation input
            if (isNaN(donationAmount) || donationAmount <= 0) {
                alert('Please enter a valid donation amount.');
                return;
            }

            if (donationAmount > currentBalance) {
                alert('Insufficient balance.');
                return;
            }

            // Update donation amount and balance
            currentDonationAmount += donationAmount;
            currentAmountDisplay.textContent = `${currentDonationAmount} BDT`;
            currentBalance -= donationAmount;
            balanceDisplay.textContent = `${currentBalance} BDT`;

            // Add to history
            const donationTitle = card.querySelector('h3').textContent;
            addToHistory(donationTitle, donationAmount);
        });
    });

    // Add to history function
    function addToHistory(title, amount) {
        const historyList = document.getElementById('history-list');
        const now = new Date();
        const listItem = document.createElement('li');
        listItem.textContent = `${now.toLocaleString()} - ${title}: ${amount} BDT`;
        historyList.appendChild(listItem);
    }
});