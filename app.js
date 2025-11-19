
// app.js - controle de acesso com senha + hash + flag localStorage

(function () {
    // Tabela de strings "escondida"
    const _d = [
        'Digite a senha de acesso:',                              // 0
        'Senha incorreta!',                                       // 1
        'amc_auth',                                               // 2 (chave no localStorage)
        'ok',                                                     // 3 (valor de flag)
        'private/A71C9F3EA19F213.html',                          // 4 (arquivo protegido)
        'SHA-256'                                                 // 5 (algoritmo hash)
    ];

    function _t(i) {
        return _d[i];
    }

    // Gera SHA-256 em hex
    async function _h(mensagem) {
        const encoder = new TextEncoder();
        const data = encoder.encode(mensagem);
        const hashBuffer = await crypto.subtle.digest(_t(5), data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Loop de validação da senha
    async function _main() {
        const hashCorreto = '988c5050c81e819971f206f9040b775686d42e1f02f6b5aff528e6d89af933be';

        while (true) {
            const senhaDigitada = prompt(_t(0));

            // Se cancelar, apenas continua no loop (fica na página)
            if (senhaDigitada === null) {
                continue;
            }

            try {
                const hashGerado = await _h(senhaDigitada);

                if (hashGerado === hashCorreto) {
                    // Marca no localStorage que passou pela autenticação
                    try {
                        localStorage.setItem(_t(2), _t(3));
                    } catch (e) {
                        // Se der erro em localStorage, segue mesmo assim
                    }

                    // Redireciona para o arquivo protegido
                    window.location.href = _t(4);
                    break;
                } else {
                    alert(_t(1)); // "Senha incorreta!"
                    // volta pro início do while → pede novamente
                }
            } catch (e) {
                alert('Erro ao validar a senha.');
                break;
            }
        }
    }

    _main();

})();
