async function buscaEndereco(cep){
    let mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    
    try{
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro){
            throw Error('CEP nao existe!');
        }
        
        const cidade = document.getElementById('cidade');
        const logradouro = document.getElementById('endereco');
        const estado = document.getElementById('estado');
        const bairro = document.getElementById('bairro');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;


        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch(erro) {
        mensagemErro.innerHTML = `<p>CEP invalido. Tente novamente!</p>`
        console.log(erro);
    }
}

let cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));

