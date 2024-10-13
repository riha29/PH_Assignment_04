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
            const donationAmount = inputField.value.trim();
            const currentAmountDisplay = card.querySelector('.text-yellow-500');
            let currentDonationAmount = parseInt(currentAmountDisplay.textContent.replace(' BDT', ''));

            // Validate donation input
            if (!validateDonationInput(donationAmount)) return;

            // Update donation amount and balance
            currentDonationAmount += parseInt(donationAmount);
            currentAmountDisplay.textContent = `${currentDonationAmount} BDT`;
            updateBalance(parseInt(donationAmount));

            // Add to history
            const donationTitle = card.querySelector('h3').textContent;
            addToHistory(donationTitle, parseInt(donationAmount));

            // Confirmation modal
            showConfirmationModal();
        });
    });

    function updateBalance(amount) {
        currentBalance -= amount;
        balance.textContent = `${currentBalance} BDT`;
    }

    function validateDonationInput(donationAmount) {
        const amount = Number(donationAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid numeric donation amount.');
            return false;
        }
        if (amount > currentBalance) {
            alert('Insufficient balance.');
            return false;
        }
        return true;
    }

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

    // Function to show the confirmation modal
    function showConfirmationModal() {
        const modal = document.getElementById('confirmation-modal');
        modal.classList.remove('hidden');
    }

    // Function to hide the confirmation modal
    function hideConfirmationModal() {
        const modal = document.getElementById('confirmation-modal');
        modal.classList.add('hidden');
    }

    // Close button functionality for the modal
    document.getElementById('close-modal').addEventListener('click', hideConfirmationModal);

});