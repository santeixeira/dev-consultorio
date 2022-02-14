$.get("/assets/header_nav.html", function(data) {
    $("#nav-placeholder").replaceWith(data);
});
$.get("/assets/footer.html", function(data){
    $("#footer-placeholder").replaceWith(data); 
});
$.get("cadastro.html", function(data){
    $("#cad-placeholder").replaceWith(data);
});

let func = require('/js/database.js');

const crypto = this.crypto || require('crypto').webcrypto;

const sha1sum = async (message) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-1', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

function ExecutaPostgreSQL(str){
    const {Client} = require('pg')

    const client = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "16345578tT@",
        database: "SAN_TESTES"
    })

    client.connect();

    client.query(str, (err, res) => {
        if(!err){
            alert(res.rows);
        }else{
            alert(err.message);
        }
        client.end();
        
    })
}

function ChecarLogin() {
    var login = $('#txtLogin').val();
    ExecutaPostgreSQL(`select nm_login from login where nm_login = ${login} `);
    
}

function ChecarEmail() {
    var email = $('#txtEmail').val();
    var emailRepete = $('#txtEmailRepete').val();
    if(email != "") {
        switch(emailRepete){
            case email:
                $('#repete_email').hide();
                $('#txtEmailRepete').removeClass('form-control-quebrado');
                $('#txtEmailRepete').addClass('form-control');
                break
            default:
                $('#repete_email').show();
                $('#txtEmailRepete').addClass('form-control-quebrado');
                $('#txtEmailRepete').focus();
        }
    }else{
        $('#txtEmail').focus();
    }
}


function checarCaracteres(str) {
    var checar = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
    var verificacao = checar.test(str);

    switch(verificacao){
        case true:
            $('#senha_quebrada').hide();
            break;
        case false || !str || str.length === 0:
            $('#senha_quebrada').show();
            break;
    }
    return;
}

function checarSenha() {
    var senha = $('#txtSenha').val();
    var senhaRepete = $('#txtSenhaRepete').val();
    if (senha != ""){
        checarCaracteres(senha);
        switch (senhaRepete){
            case senha:
                $('#repete_senha').hide();
                $('#txtSenhaRepete').removeClass('form-control-quebrado');
                $('#txtSenhaRepete').addClass('form-control');
                break
            default:
                $('#repete_senha').show();
                $('#txtSenhaRepete').addClass('form-control-quebrado');
                $('#txtSenhaRepete').focus();      
        }
    }else{
        $('#txtSenha').focus();
    }
}

function CadastroCredenciais() {
    try{
        checarSenha();
        ChecarEmail();
        sha1sum(senha).then(digestHex => alert(digestHex))
    }
    catch {
        alert("Algo ocorreu de errado.")
    }
};
            

