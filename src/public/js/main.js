$(function(){
    
    const socket = io();

    // Elementos del DOM
    const $form  = $('#message-form'),
       $message  = $('#message'),
          $chat  = $('#chat');


    // Elementos del DOM Login
    const $loginForm  = $('#loginForm'),
          $username   = $('#username'),
          $loginError = $('#loginError');


    // Elementos del DOM usuarios 

    const $users = $('#usernames');

    // Enviando Mensajes
    $form.submit( e => {
        e.preventDefault();
        socket.emit('send message',$message.val(), data => {
            $chat.append(`<p class="error">${data}</p>`);
        });
        $message.val('');
        console.log('enviando datos');
    });     
       
    // Recibiendo Mensajes
    socket.on('new message',function(data){
        $chat.append('<b>'+ data.nick +'</b>:'+ data.msg +'<br/>');
    });


    $loginForm.submit(e => {

        e.preventDefault();
        socket.emit('new user',$username.val(),data => {
            if(data) {
                $('#loginContainer').hide();
                $('#wrapContainer').show();
            } else {
                $loginError.html(`
                    <div class="alert alert-danger">
                    El usuario ya existe
                    <div>
                `);
            }


        });
    });

    
    socket.on('usernames', data => {
        console.log(data);
        let html = '';

        for(i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i> ${data[i]} </p>`;
        }

        $users.html(html);
    });

    socket.on('whisper', data => {
        $chat.append(`<p class="whisper"><b>${data.nick}</b> ${data.msg} </p>`);
    });
    

    socket.on('load old msgs', msgs => {
        for(let i = 0; i < msgs.length; i++){
            displayMsg(msgs[i]);
        }
    });

    function displayMsg(data) {
        $chat.append(`<p class="whisper"><b>${data.nick}</b> ${data.msg} </p>`);
    }

       


})

