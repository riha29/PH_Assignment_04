document.addEventListener('DOMContentLoaded', function() {
    const dBtn = document.getElementById('donation-btn');
    const hBtn = document.getElementById('history-btn');
    const dSec = document.getElementById('donation-section');
    const hSec = document.getElementById('history-section');
    const balance = document.querySelector('.text-yellow-500');
    let currentBalance = 5500;

    // Donation/History button
    dBtn.addEventListener('click', function() {
        dSec.classList.remove('hidden');
        hSec.classList.add('hidden');
        dBtn.classList.add('bg-green-200');
        hBtn.classList.remove('bg-green-200');
    });

    hBtn.addEventListener('click', function() {
        dSec.classList.add('hidden');
        hSec.classList.remove('hidden');
        hBtn.classList.add('bg-green-200');
        dBtn.classList.remove('bg-green-200');
    });

    // Donate Now buttons
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
            balance.textContent = `${currentBalance} BDT`;

            // Add to history
            const donationTitle = card.querySelector('h3').textContent;
            addToHistory(donationTitle, donationAmount);
        });
    });

    // Add to history function
    function addToHistory(title, amount) {
        const historyList = document.getElementById('history-list');
        const now = new Date();
        
        const historyItem = document.createElement('li');
        historyItem.classList.add('bg-white', 'p-4', 'rounded-sm', 'border-2');
        historyItem.innerHTML = `
            <div>
                <span class="font-semibold text-lg">${amount} Taka is Donated for ${title}</span>
                <p class="text-sm text-gray-500">Date: ${now.toUTCString()}</p>
            </div>
        `;
        historyList.appendChild(historyItem);
    }

});