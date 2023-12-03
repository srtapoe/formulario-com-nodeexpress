document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('nome').addEventListener('input', validarNome);
    document.getElementById('telefone').addEventListener('input', formatarTelefone);
    document.getElementById('telefone').addEventListener('input', validarTelefone);
    document.getElementById('email').addEventListener('input', validarEmail);
});

function validarFormulario() {
    limparMensagensErro();

    var nome = document.getElementById('nome').value;
    var telefone = document.getElementById('telefone').value;
    var email = document.getElementById('email').value;

    if (nome.length < 3) {
        exibirErro('nomeErro', 'O nome deve ter pelo menos 3 caracteres.');
        document.getElementById('nome').classList.add('invalid');
    } else {
        document.getElementById('nome').classList.remove('invalid');
        document.getElementById('nome').classList.add('valid');
    }

    var telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
        exibirErro('telefoneErro', 'O telefone deve estar no formato correto: (99) 99999-9999');
        document.getElementById('telefone').classList.add('invalid');
    } else {
        document.getElementById('telefone').classList.remove('invalid');
        document.getElementById('telefone').classList.add('valid');
    }

    if (!document.getElementById('meuFormulario').checkValidity()) {
        exibirErro('emailErro', 'Por favor, insira um endereço de e-mail válido.');
        document.getElementById('email').classList.add('invalid');
    } else {
        document.getElementById('email').classList.remove('invalid');
        document.getElementById('email').classList.add('valid');
    }

    var dados = {
        nome: nome,
        telefone: telefone,
        email: email
    };

    fetch('http://localhost:3000/salvar-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Erro ao salvar os dados:', error);
    });

}

function exibirErro(elementoId, mensagem) {
    var elementoErro = document.getElementById(elementoId);
    elementoErro.textContent = mensagem;
}

function limparMensagensErro() {
    exibirErro('nomeErro', '');
    exibirErro('telefoneErro', '');
    exibirErro('emailErro', '');
}

function validarNome() {
    var nome = document.getElementById('nome');
    if (nome.value.length >= 3) {
        nome.classList.remove('invalid');
        nome.classList.add('valid');
    } else {
        nome.classList.remove('valid');
        nome.classList.add('invalid');
    }
}

function validarTelefone() {
    var telefone = document.getElementById('telefone');
    var telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (telefoneRegex.test(telefone.value)) {
        telefone.classList.remove('invalid');
        telefone.classList.add('valid');
    } else {
        telefone.classList.remove('valid');
        telefone.classList.add('invalid');
    }
}

function formatarTelefone() {
    var telefone = document.getElementById('telefone');
    var valor = telefone.value.replace(/\D/g, ''); 
    var formato = '(' + valor.substring(0, 2) + ') ' + valor.substring(2, 7) + '-' + valor.substring(7, 11);
    telefone.value = formato;
}

function validarEmail() {
    var email = document.getElementById('email');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value)) {
        email.classList.remove('invalid');
        email.classList.add('valid');
    } else {
        email.classList.remove('valid');
        email.classList.add('invalid');
    }
}