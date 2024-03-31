let transactions = [];
let nextId = 1;

function addTransaction() {
  const desc = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  if (!desc || !amount) {
    alert('Please fill in both the description and amount.');
    return; // Exit the function early
  }

  // Parse the amount to a number to ensure it's valid
  const amountNumber = parseFloat(amount);
  if (isNaN(amountNumber)) {
    alert('Please enter a valid number for the amount.');
    return; // Exit the function early if amount is not a valid number
  }

  const transaction = {id: nextId++, description: desc, amount: amount, type: type };
  transactions.push(transaction);
  updateUI();

  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('unitType').selectedIndex = 0;
}

function updateUI() {
  const container = document.getElementById('transactions-container');
  container.innerHTML = ''; // Clear previous entries

  transactions.forEach(transaction => {
    const div = document.createElement('div');
    div.classList.add('transaction', transaction.type);
    div.innerHTML = `
                    ${transaction.description}: $${transaction.amount}
                    <button onclick="deleteTransaction(${transaction.id})">X</button>
                    `;
    container.appendChild(div);
  });

  const total = transactions.reduce((acc, curr) => {
    if (curr.type === 'income') {
      return acc + curr.amount;
    } else {
      return acc - curr.amount;
    }
  }, 0);

  document.getElementById('total').innerText = `$${total.toFixed(2)}`;
}

function deleteTransaction(id) {
  // Filter out the transaction with the given id
  console.log('Deleting transaction with ID:', id);
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateUI(); // Refresh the UI
}

document.getElementById('transactions-container').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    deleteTransaction(parseInt(id, 10)); // Ensure id is treated as a number
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Select input elements
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const unitTypeSelect = document.getElementById('unitType'); // If you want to allow pressing Enter on selects too
  const inputUnitSelect = document.getElementById('inputUnit');
  const outputUnitSelect = document.getElementById('outputUnit');

  // Helper function to check for Enter key and add transaction
  const checkForEnterKey = (event) => {
    if (event.key === 'Enter') {
      addTransaction(); // Make sure this is the correct function to call for adding a transaction
      event.preventDefault(); // Prevent the default form submission if inside a form
    }
  };

  // Attach event listener to input fields and selects
  [descriptionInput, amountInput, unitTypeSelect, inputUnitSelect, outputUnitSelect].forEach(element => {
    element.addEventListener('keydown', checkForEnterKey);
  });
});
