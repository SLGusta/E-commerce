document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpar mensagens de erro
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');

    // Obter valores dos campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const street = document.getElementById('street').value.trim();
    const neighborhood = document.getElementById('neighborhood').value.trim();
    const number = document.getElementById('number').value.trim();
    const address = document.getElementById('address').value.trim();
    const observations = document.getElementById('observations').value.trim();
    const payment = document.getElementById('payment').value;
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Validação de campos
    let isValid = true;

    if (name === '') {
        document.getElementById('name-error').textContent = 'Nome é obrigatório.';
        isValid = false;
    }
    if (email === '' || !/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('email-error').textContent = 'Email inválido.';
        isValid = false;
    }
    if (street === '') {
        document.getElementById('street-error').textContent = 'Rua é obrigatória.';
        isValid = false;
    }
    if (neighborhood === '') {
        document.getElementById('neighborhood-error').textContent = 'Bairro é obrigatório.';
        isValid = false;
    }
    if (number === '') {
        document.getElementById('number-error').textContent = 'Número é obrigatório.';
        isValid = false;
    }
    if (payment === 'credit-card') {
        if (cardNumber === '' || !/^\d{16}$/.test(cardNumber)) {
            document.getElementById('card-number-error').textContent = 'Número de cartão inválido.';
            isValid = false;
        }
        if (expiryDate === '' || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
            document.getElementById('expiry-date-error').textContent = 'Data de validade inválida.';
            isValid = false;
        }
        if (cvv === '' || !/^\d{3}$/.test(cvv)) {
            document.getElementById('cvv-error').textContent = 'CVV inválido.';
            isValid = false;
        }
    }

    if (isValid) {
        // Simular chamada à API de pagamento
        processPayment({ name, email, street, neighborhood, number, address, observations, payment, cardNumber, expiryDate, cvv }).then(response => {
            if (response.success) {
                document.getElementById('checkout-form').classList.add('hidden');
                document.getElementById('confirmation').classList.remove('hidden');
                document.getElementById('order-details').textContent = `
                    Nome: ${name}
                    Email: ${email}
                    Endereço: Rua ${street}, Nº ${number}, Bairro ${neighborhood}, Complemento: ${address}
                    Observações: ${observations}
                    Método de Pagamento: ${payment === 'credit-card' ? 'Cartão de Crédito' : 'PayPal'}
                `;
            } else {
                alert('Erro ao processar pagamento. Tente novamente.');
            }
        }).catch(error => {
            console.error('Erro:', error);
            alert('Erro ao processar pagamento. Tente novamente.');
        });
    }
});

document.getElementById('payment').addEventListener('change', function(event) {
    const creditCardInfo = document.getElementById('credit-card-info');
    if (event.target.value === 'credit-card') {
        creditCardInfo.classList.remove('hidden');
    } else {
        creditCardInfo.classList.add('hidden');
    }
});

function processPayment(data) {
    return new Promise((resolve, reject) => {
        // Simulação de um atraso de rede
        setTimeout(() => {
            // Simulação de resposta da API de pagamento
            resolve({ success: true });
        }, 1000);
    });
}
