// Initialize data
let data = {
    income: [],
    expenses: []
};

// Initialize UI
const incomeContainer = document.getElementById('income__container');
const expensesContainer = document.getElementById('expenses__container');
const earnedAmount = document.getElementById('amount__earned');
const spentAmount = document.getElementById('amount__spent');
const availableAmount = document.getElementById('amount__available');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addIncomeBtn = document.getElementById('add__income');
const addExpenseBtn = document.getElementById('add__expense');

// Render UI
function renderUI() {
    incomeContainer.innerHTML = '';
    expensesContainer.innerHTML = '';

    // Render Income
    data.income.forEach((item, index) => {
        const newItem = document.createElement('div');
        newItem.innerHTML = `<h4>${item.description}</h4><p>€${item.amount}</p><i class="fas fa-trash delete" data-type="income" data-index="${index}"></i>`;
        incomeContainer.appendChild(newItem);
    });

    // Render Expenses
    data.expenses.forEach((item, index) => {
        const newItem = document.createElement('div');
        newItem.innerHTML = `<h4>${item.description}</h4><p>€${item.amount}</p><i class="fas fa-trash delete" data-type="expense" data-index="${index}"></i>`;
        expensesContainer.appendChild(newItem);
    });

    // Update Earned, Spent, and Available Amounts
    let earned = 0;
    data.income.forEach(item => earned += parseFloat(item.amount));
    earnedAmount.textContent = earned.toFixed(2);

    let spent = 0;
    data.expenses.forEach(item => spent += parseFloat(item.amount));
    spentAmount.textContent = spent.toFixed(2);

    availableAmount.textContent = (earned - spent).toFixed(2);
}

// Event Listeners
addIncomeBtn.addEventListener('click', () => {
    const description = descriptionInput.value;
    const amount = amountInput.value;
    if (description && amount) {
        data.income.push({ description, amount });
        renderUI();
        descriptionInput.value = '';
        amountInput.value = '';
    } else {
        alert('Please fill out both fields.');
    }
});

addExpenseBtn.addEventListener('click', () => {
    const description = descriptionInput.value;
    const amount = amountInput.value;
    if (description && amount) {
        data.expenses.push({ description, amount });
        renderUI();
        descriptionInput.value = '';
        amountInput.value = '';
    } else {
        alert('Please fill out both fields.');
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const type = e.target.dataset.type;
        const index = e.target.dataset.index;
        if (type === 'income') {
            data.income.splice(index, 1);
        } else if (type === 'expense') {
            data.expenses.splice(index, 1);
        }
        renderUI();
    }
});

// Initial render
renderUI();
