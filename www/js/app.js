/*****************************
Autor:Jesus Omar Rodriguez 
Fecha Modificacion: 07/07/2018
Archivo JS
******************************/
var $$ = Dom7;

var app7 = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'APIZACO',
  // App id
 

  id: 'com.apizaco.app',
  // Enable swipe panel
  /*panel: {
    swipe: 'left',
  },*/
  // Add default routes
  routes: routes
  // ... other parameters
});


var mainView = app7.views.create('.view-main'); 


var app = { 

    autenticado: false,
    usuario:"",
    password:"",
    hostname:"http://www.apiza.co",
    name:"",
    nombre:"",
    subject:"",
    message:"",
    mail:"",
    numero:"",
    calle:"",
    comentario:"",
    nombre2:"",
    numero2:"",
    calle2:"",
    comentario2:"",
    dias:"",

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');


 console.log("VARIABLE AUTENTICADO:"+window.localStorage.getItem("autenticado"));


         if(window.localStorage.getItem("autenticado")=="true"){

                mainView.router.navigate('/home/',{animate:false});
         }
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
        var push = PushNotification.init({
    android: {
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    }
});


push.on('registration', function (data) {
            RegisterToken(data.registrationId);
            console.log(data.registrationId);
            console.log(data.registrationType);
            
        });


push.on('notification', function (data) {
            
            console.log(data.message);
            console.log(data.title);
            console.log(data.count);
            console.log(data.sound);
            console.log(data.image);
            console.log(data.additionalData);
        });

    },

    loginAccess:function(){


      this.usuario = $$('#usuario').val();
      this.password = $$('#password').val();


      if(this.usuario == "" || this.password == ""){
         
         app7.dialog.alert('Debes de ingresar usuario y/o contraseña');
           
      }else{

        app7.preloader.show();
        

        app7.request({
           url: this. hostname +'/mplay/api/login.php',
           data:{username:this.usuario,password:this.password},
           method:'POST',
           crossDomain: true,
           success:function(data){
            
            app7.preloader.hide();

            var objson = JSON.parse(data);
            if(objson.data =="Autenticado"){

            
            window.localStorage.setItem("autenticado", "true");
            this.autenticado = window.localStorage.getItem("autenticado");
            
            mainView.router.navigate('/home/',{animate:true});
            }else{

        app7.dialog.alert('Usuario y/o contraseña incorrecta');
            }
            
           
           },
           error:function(error){

            app7.preloader.hide();
            app7.dialog.alert("Hubo un error por favor intenta nuevamente");
            console.log(error);
           }
           
        });
             
          

      }

    },
    
    RegisterAccess:function(){

      mainView.router.navigate('/register/',{animate:true});
    
    },

    RegisterUser:function(){
      
      this.name = $$('#frm_name').val();
      this.usuario = $$('#frm_username').val();
      this.password = $$('#frm_password').val();

      app7.request({
           url: this.hostname+'/mplay/api/users.php',
           data:{username:this.usuario,password:this.password,name:this.name},
           method:'POST',
           crossDomain: true,
           success:function(data){
            
            app7.preloader.hide();

            var objson = JSON.parse(data);
            app7.dialog.alert("Tu registro fue existo");
             mainView.router.navigate('/login/',{animate:true});
            
           
           },
           error:function(error){

            app7.preloader.hide();
            app7.dialog.alert("Hubo un error por favor intenta nuevamente");
            console.log(error);
           }
           
        });

    

    },
    SemaforoUser:function(){
  this.nombre2=$$('#nombre2').val();
  this.numero2=$$('#numero2').val();
  this.calle2=$$('#calle2').val();
  this.comentario2=$$('#comentario2').val();

  app7.request({
  url: this.hostname+'/mplay/api/semaforo.php',
  data:{nombre2:this.nombre2,numero2:this.numero2,calle2:this.calle2,comentario2:this.comentario2},
  method:'POST',
  crossDomain: true,
  success:function(data){
    app7.preloader.hide();

    var objson = JSON.parse(data);
    app7.dialog.alert("Gracias por comunicarte con el presidente en breve nos comunicaremos contigo");
    mainView.router.navigate('/home/',{animate:true});

  },
  error:function(error){
    app7.preloader.hide();
    app7.dialog.alert("Hubo un error por favor intente nuevamente");
    console.log(error);

}
});
},
    BacheUser:function(){
  this.nombre=$$('#nombre').val();
  this.numero=$$('#numero').val();
  this.calle=$$('#calle').val();
  this.comentario=$$('#comentario').val();

  app7.request({
  url: this.hostname+'/mplay/api/bache.php',
  data:{nombre:this.nombre,numero:this.numero,calle:this.calle,comentario:this.comentario},
  method:'POST',
  crossDomain: true,
  success:function(data){
    app7.preloader.hide();

    var objson = JSON.parse(data);
    app7.dialog.alert("Gracias por comunicarte con el presidente en breve nos comunicaremos contigo");
    mainView.router.navigate('/home/',{animate:true});

  },
  error:function(error){
    app7.preloader.hide();
    app7.dialog.alert("Hubo un error por favor intente nuevamente");
    console.log(error);

}
});
},
 CamionUser:function(){
  this.nombre=$$('#nombre').val();
  this.numero=$$('#numero').val();
  this.dias=$$('#dias').val();
  this.calle=$$('#calle').val();

  app7.request({
  url: this.hostname+'/mplay/api/camion.php',
  data:{nombre:this.nombre,numero:this.numero,dias:this.dias,calle:this.calle},
  method:'POST',
  crossDomain: true,
  success:function(data){
    app7.preloader.hide();

    var objson = JSON.parse(data);
    app7.dialog.alert("Gracias por comunicarte con el presidente en breve nos comunicaremos contigo");
    mainView.router.navigate('/home/',{animate:true});

  },
  error:function(error){
    app7.preloader.hide();
    app7.dialog.alert("Hubo un error por favor intente nuevamente");
    console.log(error);

}
});
},
 
 
LamparaUser:function(){
  this.nombre=$$('#nombre').val();
  this.numero=$$('#numero').val();
  this.calle=$$('#calle').val();
  this.comentario=$$('#comentario').val();

  app7.request({
  url: this.hostname+'/mplay/api/lampara.php',
  data:{nombre:this.nombre,numero:this.numero,calle:this.calle,comentario:this.comentario},
  method:'POST',
  crossDomain: true,
  success:function(data){
    app7.preloader.hide();

    var objson = JSON.parse(data);
    app7.dialog.alert("Gracias por comunicarte con el presidente en breve nos comunicaremos contigo");
    mainView.router.navigate('/home/',{animate:true});

  },
  error:function(error){
    app7.preloader.hide();
    app7.dialog.alert("Hubo un error por favor intente nuevamente");
    console.log(data);

}
});
},

    AlcaldeUser:function(){
  this.nombre=$$('#nombre').val();
  this.mail=$$('#mail').val();
  this.subject=$$('#subject').val();
  this.message=$$('#message').val();

  app7.request({
  url: this.hostname+'/mplay/api/contacto.php',
  data:{nombre:this.nombre,mail:this.mail,subject:this.subject, message:this.message},
  method:'POST',
  crossDomain: true,
  success:function(data){
    app7.preloader.hide();

    var objson = JSON.parse(data);
    app7.dialog.alert("Gracias por comunicarte con el presidente en breve nos comunicaremos contigo");
    mainView.router.navigate('/home/',{animate:true});

  },
  error:function(error){
    app7.preloader.hide();
    app7.dialog.alert("Hubo un error por favor intente nuevamente");
    console.log(data);

}
});
},
    loginClose:function(){
     

        app7.panel.close();
        app7.dialog.confirm('¿Seguro, deseas salir de la aplicación?', function () {
            
        window.localStorage.setItem("autenticado", "false");
        mainView.router.navigate('/login/',{animate:true});
    
      });

    }
};


function showMenu(){

   app7.panel.open('left', true);

}


$$(document).on('page:init', '.page[data-name="home"]', function (e) {
      console.log('View Home load Init!');
      app7.panel.allowOpen = true;
      app7.panel.enableSwipe('left');
       var $ptrContent = app7.ptr.create('.ptr-content');

      
        
      //    getslider();
      
});
function RegisterToken(idtoken){

app7.preloader.show();
var idtoken = idtoken;
var hostname = "http://www.apiza.co";

    app7.request({
           url: hostname+'/mplay/api/register_token.php',
           data:{token:idtoken},
           method:'POST',
           crossDomain: true,
           success:function(data){
            
            app7.preloader.hide();
            document.getElementById('token').value = idtoken;      
            var objson = JSON.parse(data);
           
           },
           error:function(error){

            app7.preloader.hide();
            app7.dialog.alert("Hubo un error al intentar registrar el token"+error);
            console.log(error);
           }
           
        });

};
function getslider(){


 app7.preloader.show();

  app7.request({
           url: 'http://superaplicacion.com/mplay/api/slider.php',
           method:'GET',
           crossDomain: true,
           success:function(data){
            
            app7.preloader.hide();

            var objson = JSON.parse(data);
            var video = "";
            var swiper = app7.swiper.get('.swiper-container');
            swiper.removeAllSlides();
             
             for(x in objson.data){
                  console.log(objson.data[x].titulo);
                  var slider=' <div class="swiper-slide"><div class="mask"></div><img src="'+img+'"/><div class="caption"><h2>'+objson.data[x].titulo+'</h2><p>'+objson.data[x].fecha+'</p></div></div>';
                  swiper.appendSlide(slider);

                  

                   $$('#content-videos').append(video);

             }
           
           },
           error:function(error){

            app7.preloader.hide();
            app7.dialog.alert("Hubo un error por favor intenta nuevamente");
            console.log(error);
           }
           
        });


}