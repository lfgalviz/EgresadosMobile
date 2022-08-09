var estado=''; //SI
var name=''; //SI
var sname=''; //SI
var apell=''; //SI
var email=''; //SI
var db; // SI
var carrerasArray = []; //SI
var resultadosArray = []; //SI OBTENER LOS RESULTADO DESDE  EL WEB SERVICE
var p1='',p2='',p3='',p4='',p5='',p6=''; //SI
var r1='',r2='',r3='',r4='',r5='',r6=''; //SI
var info1='',info2='',info3=''; //SI
var Pnom='',Psnom='',Pape='',Psape='',Pced='',Pcor=''//SI
var contador_respuesta=0; // SI
var sumat=0; //SI

var app = {
    initialize: function() {
        // setting required to use $.mobile.changePage()
        // http://jquerymobile.com/demos/1.2.0/docs/pages/phonegap.html
        //this.bindEvents();
        $.mobile.allowCrossDomainPages = true;
    },
};
$(document).ready(function(){
  $('#btn_ok').hide();
  $('#div_telpadre').hide();
  $('#div_pais').hide();
  $('#div_departamento').hide();


  if (window.localStorage.getItem('sesion') != null)
  {
    var ced = window.localStorage.getItem('sesion');
    $.ajax({
      type: "POST",
      url: "http://comino.uninorte.edu.co/prospectos/resultados_usuario.php",
      data:{cedula:ced},
      success: function(mensaje) {
        var obj = JSON.parse(mensaje);
        //alert("Todo: "+mensaje +"___Datos: "+ obj.datos[0].correo+" - "+obj.datos[0].nombre+" - "+obj.datos[0].cedula+" - "+obj.datos[0].direccion);
        //obj.datos[0].correo       Obtiene el objeto
        //obj.datos.length          Obtiene el tamaño
        contador_respuesta = obj.datos.length-1;

        if(obj.exito == "1"){

          resultadosArray[0]=[];
          resultadosArray[1]=[];
          resultadosArray[2]=[];
          resultadosArray[3]=[];
          resultadosArray[4]=[];
          resultadosArray[5]=[];

          for (var i = 0; i < obj.datos.length-1; i++){
            if (i == 0)
            {
              $("#n1").text(obj.datos[i].interes1);
              $("#barra1").val(obj.datos[i].porcentaje1);
              $("#p1").text(obj.datos[i].porcentaje1+"%");
              verificarResultados2(obj.datos[i].interes1,1);

              $("#n2").text(obj.datos[i].interes2);
              $("#barra2").val(obj.datos[i].porcentaje2);
              $("#p2").text(obj.datos[i].porcentaje2+"%");
              verificarResultados2(obj.datos[i].interes2,2);

              $("#n3").text(obj.datos[i].interes3);
              $("#barra3").val(obj.datos[i].porcentaje3);
              $("#p3").text(obj.datos[i].porcentaje3+"%");
              verificarResultados2(obj.datos[i].interes3,3);

              $("#n4").text(obj.datos[i].interes4);
              $("#barra4").val(obj.datos[i].porcentaje4);
              $("#p4").text(obj.datos[i].porcentaje4+"%");
              verificarResultados2(obj.datos[i].interes4,4);

              $("#n5").text(obj.datos[i].interes5);
              $("#barra5").val(obj.datos[i].porcentaje5);
              $("#p5").text(obj.datos[i].porcentaje5+"%");
              verificarResultados2(obj.datos[i].interes5,5);

              $("#n6").text(obj.datos[i].interes6);
              $("#barra6").val(obj.datos[i].porcentaje6);
              $("#p6").text(obj.datos[i].porcentaje6+"%");
              verificarResultados2(obj.datos[i].interes6,6);
            }
            //alert(obj.datos[i].cedula+" - "+obj.datos[i].preg01+" - "+obj.datos[i].preg02+" - "+obj.datos[i].preg03+" - "+obj.datos[i].preg04+" - "+obj.datos[i].preg05);
            resultadosArray[i][0] = obj.datos[i].interes1;
            resultadosArray[i][1] = obj.datos[i].porcentaje1;
            resultadosArray[i][2] = obj.datos[i].interes2;
            resultadosArray[i][3] = obj.datos[i].porcentaje2;
            resultadosArray[i][4] = obj.datos[i].interes3;
            resultadosArray[i][5] = obj.datos[i].porcentaje3;
            resultadosArray[i][6] = obj.datos[i].interes4;
            resultadosArray[i][7] = obj.datos[i].porcentaje4;
            resultadosArray[i][8] = obj.datos[i].interes5;
            resultadosArray[i][9] = obj.datos[i].porcentaje5;
            resultadosArray[i][10] = obj.datos[i].interes6;
            resultadosArray[i][11] = obj.datos[i].porcentaje6;
            resultadosArray[i][12] = obj.datos[i].fecha;
            //alert(resultadosArray[i][0]+" - "+resultadosArray[i][1]+" - "+resultadosArray[i][2]+" - "+resultadosArray[i][3]+" - "+resultadosArray[i][4]+" - "+resultadosArray[i][5]);
          }
        }
        else
        {
          if (obj.exito == "2")
          {
            //$.mobile.loading( "hide" );
            //navigator.notification.alert('Aun no tienes resultados registrado!',null,'Mensaje','Ok');
          }
          else
          {
            //$.mobile.loading( "hide" );
            //navigator.notification.alert('Hubo un error en la solicitud, favor intente de nuevo!',null,'Mensaje','Ok');
          }
        }
      }
    });


    $("#nom").val(window.localStorage.getItem("nom"));
    $("#snom").val(window.localStorage.getItem("snom"));
    $("#apel").val(window.localStorage.getItem("ape"));
    $("#sapel").val(window.localStorage.getItem("sape"));
    $("#ced").val(window.localStorage.getItem("sesion"));
    $("#cor").val(window.localStorage.getItem("cor"));

    if (window.localStorage.getItem('pregunt') != null)
    {
      db = window.openDatabase("Database", "1.0", "Database", 200000);
      db.transaction(bd_carreras_select, error);
      $.mobile.changePage("#resultados", "slide", false, true);
    }
    else
    {
      $.mobile.changePage("#login", "slide", false, true);
    }
  }

  document.addEventListener("deviceready",onDeviceReady,false);

	function onDeviceReady(){
    if(navigator.network.connection.type == Connection.NONE){
      window.plugins.toast.showLongBottom("Por favor verifica tu conexión a Internet");
    }

    document.addEventListener("backbutton", function(e)
    {
     	if($.mobile.activePage.is('#inicio'))
      {
         	e.preventDefault();
         	navigator.app.exitApp();
     	}
	    else
      {
        if ($.mobile.activePage.is('#registro'))
        {
          $.mobile.changePage("#inicio",{transition: 'slide', reverse: true});
          e.preventDefault();
        }else{
          //VER AQUI ATRASSSSSSSSSSSSSS
          //EN ARTISTICO CREATIVO
          if ($.mobile.activePage.is('#diseno_grafico') || $.mobile.activePage.is('#diseno_industrial') || $.mobile.activePage.is('#comunicacion') || $.mobile.activePage.is('#musica'))
          {
            $.mobile.changePage("#artistico",{transition: 'slide', reverse: true});
            e.preventDefault();
          }
          else if ($.mobile.activePage.is('#contaduria'))
          {
            $.mobile.changePage("#convencional",{transition: 'slide', reverse: true});
            e.preventDefault();
          }
          else if ($.mobile.activePage.is('#relaciones_internacionales') || $.mobile.activePage.is('#negocios') || $.mobile.activePage.is('#administracion') || $.mobile.activePage.is('#economia'))
          {
            $.mobile.changePage("#emprendimiento",{transition: 'slide', reverse: true});
            e.preventDefault();
          }
          else if($.mobile.activePage.is('#arquitectura') || $.mobile.activePage.is('#civil') || $.mobile.activePage.is('#sistemas') || $.mobile.activePage.is('#electrica') || $.mobile.activePage.is('#electronica') || $.mobile.activePage.is('#industrial') || $.mobile.activePage.is('#mecanica'))
          {
            $.mobile.changePage("#manual",{transition: 'slide', reverse: true});
            e.preventDefault();
          }
          else if($.mobile.activePage.is('#matematicas') || $.mobile.activePage.is('#medicina') ||  $.mobile.activePage.is('#odontologia') ||  $.mobile.activePage.is('#geologia'))
          {
            $.mobile.changePage("#investigativa",{transition: 'slide', reverse: true});
            e.preventDefault();
          }
          else if ($.mobile.activePage.is('#enfermeria') || $.mobile.activePage.is('#ciencia_pyg') || $.mobile.activePage.is('#derecho') || $.mobile.activePage.is('#pedagogia') ||
                   $.mobile.activePage.is('#economia2') || $.mobile.activePage.is('#filosofia') || $.mobile.activePage.is('#psicologia') || $.mobile.activePage.is('#licenciaturafilosofia') || $.mobile.activePage.is('#licenciaturamate'))
          {
            $.mobile.changePage("#social",{transition: 'slide', reverse: true});
            e.preventDefault();
          }
          else if($.mobile.activePage.is('#perfil'))
          {
            $.mobile.changePage("#resultados",{transition: 'slide', reverse: true});
            e.preventDefault();
          }
          else if ($.mobile.activePage.is('#politicas'))
          {
            $.mobile.changePage("#registro",{transition: 'slideup', reverse: true});
            e.preventDefault();
          }
          else if ($.mobile.activePage.is('#investigativa') || $.mobile.activePage.is('#convencional') || $.mobile.activePage.is('#emprendimiento') ||
                   $.mobile.activePage.is('#artistico') || $.mobile.activePage.is('#social') || $.mobile.activePage.is('#manual'))
          {
            $.mobile.changePage("#resultados",{transition: 'slide', reverse: true});
            e.preventDefault();
          }
        }
	    }
	  }, false);

    StatusBar.show();
    StatusBar.overlaysWebView(false);
    StatusBar.styleLightContent();
    StatusBar.backgroundColorByHexString("#a1272d");
	}

  //OK
  function bd_carreras_select(tx)
  {
    tx.executeSql('SELECT * from resul_carreras', [], exito_select, error);
  }

  //OK
  function exito_select(tx, results)
  {
    //carrerasArray[1] = [];carrerasArray[2] = [];carrerasArray[3] = [];
    carrerasArray[1] = [];carrerasArray[2] = [];carrerasArray[3] = [];carrerasArray[4] = [];carrerasArray[5] = [];carrerasArray[6] = [];
    var len = results.rows.length;
    //alert("TABLA: " + len + " FILAS.");
    for (var i=0; i<len; i++){
      //alert(results.rows.item(i).inte+" - "+results.rows.item(i).pun);
      carrerasArray[i+1][0] = parseInt(results.rows.item(i).inte);
      carrerasArray[i+1][1] = parseInt(results.rows.item(i).pun);
    }

    r1 = verificarResultado(carrerasArray[1][0],1);
    p1 = carrerasArray[1][1];
    r2 = verificarResultado(carrerasArray[2][0],2);
    p2 = carrerasArray[2][1];
    r3 = verificarResultado(carrerasArray[3][0],3);
    p3 = carrerasArray[3][1];
    r4 = verificarResultado(carrerasArray[4][0],4);
    p4 = carrerasArray[4][1];
    r5 = verificarResultado(carrerasArray[5][0],5);
    p5 = carrerasArray[5][1];
    r6 = verificarResultado(carrerasArray[6][0],6);
    p6 = carrerasArray[6][1];

    var s1 = (p1/3).toFixed(2);
    var s2 = (p2/3).toFixed(2);
    var s3 = (p3/3).toFixed(2);
    var s4 = (p4/3).toFixed(2);
    var s5 = (p5/3).toFixed(2);
    var s6 = (p6/3).toFixed(2);

    $("#n1").text(r1);
    $("#p1").text(s1+"%");
    $("#barra1").val(s1);
    //$("#p1").width((100-s1)+'%');

    $("#n2").text(r2);
    $("#p2").text(s2+"%");
    $("#barra2").val(s2);

    $("#n3").text(r3);
    $("#p3").text(s3+"%");
    $("#barra3").val(s3);

    $("#n4").text(r4);
    $("#p4").text(s4+"%");
    $("#barra4").val(s4);

    $("#n5").text(r5);
    $("#p5").text(s5+"%");
    $("#barra5").val(s5);

    $("#n6").text(r6);
    $("#p6").text(s6+"%");
    $("#barra6").val(s6);
  }

  //OK
  function error(err)
  {
    //alert("DB Error: "+err.message + "\nCode: "+err.code);
  }

  $(document).on("pageshow",function()
  {
    if($.mobile.activePage.is('#registro'))
    {
      if (estado==='conectado')
      {
        //alert('Conectado con autenticacion');
        //$("#select option[value='male']").attr("selected","selected");
        $("#txtnombre").val(name);
        $("#txtsnombre").val(sname);
        $("#txtapellido").val(apell);
        $("#txtcorreo").val(email);
        $("#txtconfcorreo").val(email);

        //facebookConnectPlugin.api("me/", ["user_birthday"],
        //facebookConnectPlugin.login(["email"],
        facebookConnectPlugin.api("me/?fields=id,email,first_name,middle_name,last_name", ["public_profile"],
          function (response)
          {
            //alert(JSON.stringify(response))
            var dato = JSON.stringify(response);
            var json = JSON.parse(dato);
            name = json.first_name;
            sname = json.middle_name;
            apell = json.last_name;
            email = json.email;

            $("#txtnombre").val(name);
            $("#txtsnombre").val(sname);
            $("#txtapellido").val(apell);
            $("#txtcorreo").val(email);
            $("#txtconfcorreo").val(email);
            //alert("Email: "+json.email+"\n Nombre: "+json.first_name+"\n Apellido: "+json.last_name);
          },
          function (response) 
          { 
            alert(JSON.stringify(response));
          }
        );
      }
      else
      {
        //alert('Conectado sin autenticacion');
      }
    }



    if($.mobile.activePage.is('#preg01')){
      $('.progressBarIndicador').css('width', '5.6%');
    }
    if($.mobile.activePage.is('#preg02')){
       $('.progressBarIndicador').css('width', '11.1%');
    }
    if($.mobile.activePage.is('#preg03')){
       $('.progressBarIndicador').css('width', '16.5%');
    }
    if($.mobile.activePage.is('#preg04')){
       $('.progressBarIndicador').css('width', '22.2%');
    }
    if($.mobile.activePage.is('#preg05')){
       $('.progressBarIndicador').css('width', '27.8%');
    }
    if($.mobile.activePage.is('#preg06')){
       $('.progressBarIndicador').css('width', '33.3%');
    }
    if($.mobile.activePage.is('#preg07')){
       $('.progressBarIndicador').css('width', '38.9%');
    }
    if($.mobile.activePage.is('#preg08')){
       $('.progressBarIndicador').css('width', '44.4%');
    }
    if($.mobile.activePage.is('#preg09')){
       $('.progressBarIndicador').css('width', '50%');
    }
    if($.mobile.activePage.is('#preg10')){
       $('.progressBarIndicador').css('width', '55.6%');
    }
    if($.mobile.activePage.is('#preg11')){
       $('.progressBarIndicador').css('width', '61.1%');
    }
    if($.mobile.activePage.is('#preg12')){
       $('.progressBarIndicador').css('width', '66.7%');
    }
    if($.mobile.activePage.is('#preg13')){
       $('.progressBarIndicador').css('width', '72.2%');
    }
    if($.mobile.activePage.is('#preg14')){
       $('.progressBarIndicador').css('width', '77.8%');
    }
    if($.mobile.activePage.is('#preg15')){
       $('.progressBarIndicador').css('width', '83.3%');
    }
    if($.mobile.activePage.is('#preg16')){
       $('.progressBarIndicador').css('width', '88.9%');
    }
    if($.mobile.activePage.is('#preg17')){
       $('.progressBarIndicador').css('width', '94.4%');
    }
    if($.mobile.activePage.is('#preg18')){
       $('.progressBarIndicador').css('width', '100%');
    }

    if($.mobile.activePage.is('#informacion'))
    {
      var ced = window.localStorage.getItem('sesion');
      $.ajax({
        type: "POST",
        url: "http://comino.uninorte.edu.co/prospectos/resultados_usuario.php",
        data:{cedula:ced},
        success: function(mensaje) {
          var obj = JSON.parse(mensaje);
          //alert("Todo: "+mensaje +"___Datos: "+ obj.datos[0].correo+" - "+obj.datos[0].nombre+" - "+obj.datos[0].cedula+" - "+obj.datos[0].direccion);
          //obj.datos[0].correo       Obtiene el objeto
          //obj.datos.length          Obtiene el tamaño
          contador_respuesta = obj.datos.length-1;
          if(obj.exito == "1"){

            resultadosArray[0]=[];
            resultadosArray[1]=[];
            resultadosArray[2]=[];
            resultadosArray[3]=[];
            resultadosArray[4]=[];
            resultadosArray[5]=[];

            for (var i = 0; i < obj.datos.length-1; i++){
              //alert(obj.datos[i].cedula+" - "+obj.datos[i].preg01+" - "+obj.datos[i].preg02+" - "+obj.datos[i].preg03+" - "+obj.datos[i].preg04+" - "+obj.datos[i].preg05);

              resultadosArray[i][0] = obj.datos[i].interes1;
              resultadosArray[i][1] = obj.datos[i].porcentaje1;
              resultadosArray[i][2] = obj.datos[i].interes2;
              resultadosArray[i][3] = obj.datos[i].porcentaje2;
              resultadosArray[i][4] = obj.datos[i].interes3;
              resultadosArray[i][5] = obj.datos[i].porcentaje3;
              resultadosArray[i][6] = obj.datos[i].interes4;
              resultadosArray[i][7] = obj.datos[i].porcentaje4;
              resultadosArray[i][8] = obj.datos[i].interes5;
              resultadosArray[i][9] = obj.datos[i].porcentaje5;
              resultadosArray[i][10] = obj.datos[i].interes6;
              resultadosArray[i][11] = obj.datos[i].porcentaje6;
              resultadosArray[i][12] = obj.datos[i].fecha;



              //alert(resultadosArray[i][0]+" - "+resultadosArray[i][1]+" - "+resultadosArray[i][2]+" - "+resultadosArray[i][3]+" - "+resultadosArray[i][4]+" - "+resultadosArray[i][5]);
            }
          }
          else
          {
            if (obj.exito == "2")
            {
              //$.mobile.loading( "hide" );
              //navigator.notification.alert('Aun no tienes resultados registrado!',null,'Mensaje','Ok');
            }
            else
            {
              //$.mobile.loading( "hide" );
              //navigator.notification.alert('Hubo un error en la solicitud, favor intente de nuevo!',null,'Mensaje','Ok');
            }
          }
        },
        error : function (mensaje){
           navigator.notification.alert(
            'Hubo un error en la solicitud, favor intente de nuevo!',  // message
            null,         // callback
            'Mensaje',            // title
            'Ok'                  // buttonName
          );
        }
      });
    }

    if($.mobile.activePage.is('#resultados'))
    {

    }

    if($.mobile.activePage.is('#login'))
    {

      if(parseInt(window.localStorage.getItem("estado_pregunta")) == 0 || window.localStorage.getItem("estado_pregunta") == null){
        $("#rest").text("CONTINUAR");
        //$('#continuartest').addClass('ui-disabled');
        //

        $('#continuartest').hide();
      }
      else
      {
        $("#rest1").text("Pregunta: "+(parseInt(window.localStorage.getItem("estado_pregunta"))+1));
        //$('#continuartest').removeClass('ui-disabled');
        $('#continuartest').show();
      }

      /* var ced = window.localStorage.getItem('sesion');
      $.ajax({
          type: "POST",
          url: "http://pruebauninorte.hol.es/resultados_usuario.php",
          data:{cedula:ced},
          success: function(mensaje) {
              var obj = JSON.parse(mensaje);
              //alert("Todo: "+mensaje +"___Datos: "+ obj.datos[0].correo+" - "+obj.datos[0].nombre+" - "+obj.datos[0].cedula+" - "+obj.datos[0].direccion);
              //obj.datos[0].correo       Obtiene el objeto
              //obj.datos.length          Obtiene el tamaño
              contador_respuesta = obj.datos.length-1;
              if(obj.exito == "1"){

                resultadosArray[0]=[];
                resultadosArray[1]=[];
                resultadosArray[2]=[];
                resultadosArray[3]=[];
                resultadosArray[4]=[];

                for (var i = 0; i < obj.datos.length-1; i++){
                  //alert(obj.datos[i].cedula+" - "+obj.datos[i].preg01+" - "+obj.datos[i].preg02+" - "+obj.datos[i].preg03+" - "+obj.datos[i].preg04+" - "+obj.datos[i].preg05);
                  resultadosArray[i][0] = obj.datos[i].preg01;
                  resultadosArray[i][1] = obj.datos[i].preg02;
                  resultadosArray[i][2] = obj.datos[i].preg03;
                  resultadosArray[i][3] = obj.datos[i].preg04;
                  resultadosArray[i][4] = obj.datos[i].preg05;
                }
              }else{
                if (obj.exito == "2"){
                  //$.mobile.loading( "hide" );
                  navigator.notification.alert('Aun no tienes resultados registrado!',null,'Mensaje','Ok');
                }else{
                  //$.mobile.loading( "hide" );
                  navigator.notification.alert('Hubo un error en la solicitud, favor intente de nuevo!',null,'Mensaje','Ok');
                }
              }
          }
      })*/
    }

    if($.mobile.activePage.is('#perfil')){
      //alert(contador_respuesta);
      switch (contador_respuesta){
        case 1:
            $('#r1').show();
            $("#f1").text('Fecha: '+resultadosArray[0][12]);
          break;
        case 2:
            $('#r1').show();
            $('#r2').show();
            $("#f1").text('Fecha: '+resultadosArray[0][12]);
            $("#f2").text('Fecha: '+resultadosArray[1][12]);
          break;
        case 3:
            $('#r1').show();
            $('#r2').show();
            $('#r3').show();
            $("#f1").text('Fecha: '+resultadosArray[0][12]);
            $("#f2").text('Fecha: '+resultadosArray[1][12]);
            $("#f3").text('Fecha: '+resultadosArray[2][12]);
          break;
        case 4:
            $('#r1').show();
            $('#r2').show();
            $('#r3').show();
            $('#r4').show();
            $("#f1").text('Fecha: '+resultadosArray[0][12]);
            $("#f2").text('Fecha: '+resultadosArray[1][12]);
            $("#f3").text('Fecha: '+resultadosArray[2][12]);
            $("#f4").text('Fecha: '+resultadosArray[3][12]);
          break;
        case 5:
            $('#r1').show();
            $('#r2').show();
            $('#r3').show();
            $('#r4').show();
            $('#r5').show();
            $("#f1").text('Fecha: '+resultadosArray[0][12]);
            $("#f2").text('Fecha: '+resultadosArray[1][12]);
            $("#f3").text('Fecha: '+resultadosArray[2][12]);
            $("#f4").text('Fecha: '+resultadosArray[3][12]);
            $("#f5").text('Fecha: '+resultadosArray[4][12]);
          break;
      }
    }
  });

  function mensagePrivacidad()
  {
    var pais='',dep='',ciu='';
    if(document.getElementById("cbox_registro").checked)
    {
      
      if($('#txtpais').val() == 'Otro')
      {
        pais = $('#txtpais2').val();
        ciu = $('#txtciudad').val();
      }
      else
      {
        pais = $('#txtpais').val();
        dep = $('#txtdepartamento').val();
        ciu = $('#txtciudad').val();
      }
      //alert(pais);

      $("body").append('<div class="modalWindow"/>');
      $.mobile.loading( "show", {text: "Enviando datos...",textVisible: true,theme: "a",html: ""});
      $.ajax({
        type: "POST",
        url: "http://comino.uninorte.edu.co/prospectos/insertar_usuario.php",
        data:{nombre:$('#txtnombre').val(),
              snombre:$('#txtsnombre').val(),
              apellido:$('#txtapellido').val(),
              sapellido:$('#txtsapellido').val(),
              cedula:$('#txtcedula').val(),
              edad:$('#txtedad').val(),
              telpadre:$('#txttelpadre').val(),
              telcelular:$('#txtcelular').val(),
              colegio:$('#txtcolegio').val(),
              pais:pais,
              departamento:dep,
              ciudad:ciu,
              correo:$('#txtcorreo').val(),
              pass:$('#txtpass').val()},
        success: function(mensaje)
        {
          //alert(mensaje);
          var obj = JSON.parse(mensaje);

          if(obj.exito == "1")
          {
            //alert("AAAA "+ $('#txtcedula').val());
            window.localStorage.setItem('sesion',$('#txtcedula').val());
            window.localStorage.setItem('nom',$('#txtnombre').val());
            if($('#txtsnombre').val() != '')
            {
              window.localStorage.setItem('snom',$('#txtsnombre').val());
              $("#snom").val(window.localStorage.getItem("snom"));
            }

            window.localStorage.setItem('ape',$('#txtapellido').val());
            if($('#txtsapellido').val() != '')
            {
              window.localStorage.setItem('sape',$('#txtsapellido').val());
              $("#sapel").val(window.localStorage.getItem("sape"));
            }
            window.localStorage.setItem('telcel',$('#txtcelular').val());
            window.localStorage.setItem('cor',$('#txtcorreo').val());

            $("#nom").val(window.localStorage.getItem("nom"));            
            $("#apel").val(window.localStorage.getItem("ape"));            
            $("#ced").val(window.localStorage.getItem("sesion"));
            $("#cor").val(window.localStorage.getItem("cor"));

            //var userid = window.localStorage.getItem('sesion');
            //alert("BBBB "+userid);
            $.mobile.loading( "hide" );
            $(".modalWindow").remove();
            $('#continuartest').addClass('ui-disabled');
            $.mobile.changePage("#login", "slide", false, true);

            $('#txtnombre').val('');
            $('#txtsnombre').val('');
            $('#txtapellido').val('');
            $('#txtsapellido').val('');
            $('#txtcedula').val('');
            $('#txtedad').val('');
            $('#txttelpadre').val('');
            $('#txtcelular').val('');
            $('#txtcolegio').val('');
            $('#txtpais').val('0').change();
            $('#txtpais2').val('0').change();
            $('#txtdepartamento').val('0').change();
            $('#txtciudad').val('');
            $('#txtcorreo').val('');
            $('#txtconfcorreo').val('');
            $('#txtpass').val('');
            $('#txtconfpass').val('');
            
          }
          else
          {
            if (obj.exito == "2")
            {
                $.mobile.loading( "hide" );
                $(".modalWindow").remove();
                navigator.notification.alert(
                'Su cedula ya ha sido registrada!',  // message
                null,         // callback
                'Mensaje',            // title
                'Ok'                  // buttonName
              );
              $('#txtcedula').val('');
            }
            else
            {
              $.mobile.loading( "hide" );
              $(".modalWindow").remove();
              navigator.notification.alert(
                'Hubo un error en la solicitud, favor intente de nuevo!',  // message
                null,         // callback
                'Mensaje',            // title
                'Ok'                  // buttonName
              );
            }
          }
        },
        error : function (mensaje){
          $.mobile.loading( "hide" );
          $(".modalWindow").remove();
          navigator.notification.alert(
            'Hubo un error en la solicitud, favor intente de nuevo!',  // message
            null,         // callback
            'Mensaje',            // title
            'Ok'                  // buttonName
          );
        }
      });
    }
    else
    {
      navigator.notification.alert(
        'Acepte las Politicas de Privacidad!',  // message
        null,         // callback
        'Mensaje',            // title
        'Ok'                  // buttonName
      );
    }
  }

  //OK
  function mensajeInicio()
  {
    if (navigator.network.connection.type != Connection.NONE)
    {
      //$('#continuartest').addClass('ui-disabled');
      $("body").append('<div class="modalWindow"/>');
      $.mobile.loading( "show", {text: "Iniciando Sesión...",textVisible: true,theme: "a",html: ""});
      $.ajax({
        type: "POST",
        url: "http://comino.uninorte.edu.co/prospectos/login.php",
        data:{correo:$('#txtcorreoinicio').val()},
        success: function(mensaje) {
          //alert(mensaje);
          var obj = JSON.parse(mensaje);
          //alert("Todo: "+mensaje +"___Datos: "+ obj.datos[0].correo+" - "+obj.datos[0].nombre+" - "+obj.datos[0].cedula+" - "+obj.datos[0].direccion);
          //obj.datos[0].correo       Obtiene el objeto
          //obj.datos.length          Obtiene el tamaño
          if(obj.exito == "1")
          {
            var nom = obj.datos[0].nombre;
            var snom = obj.datos[0].segundo_nombre;
            var ape = obj.datos[0].apellido;
            var sape = obj.datos[0].segundo_apellido;
            var ced =  obj.datos[0].cedula;
            var telcel =  obj.datos[0].telcelular;
            var correo = obj.datos[0].correo;
            var pass = obj.datos[0].contrasena;
            if (correo == $('#txtcorreoinicio').val() && pass == $('#txtpassinicio').val())
            {
              //alert(ced);
              window.localStorage.setItem('sesion',ced);
              window.localStorage.setItem('nom',nom);
              
              window.localStorage.setItem('ape',ape);
              
              window.localStorage.setItem('telcel',telcel);
              window.localStorage.setItem('cor',correo);

              if(snom === null)
              {
              }
              else
              {
                window.localStorage.setItem('snom',snom);
                $("#snom").val(window.localStorage.getItem("snom"));
              }

              if(sape === null)
              {
              }
              else
              {
                window.localStorage.setItem('sape',sape);
                $("#sapel").val(window.localStorage.getItem("sape"));
              }


              $("#nom").val(window.localStorage.getItem("nom"));              
              $("#apel").val(window.localStorage.getItem("ape"));              
              $("#ced").val(window.localStorage.getItem("sesion"));
              $("#cor").val(window.localStorage.getItem("cor"));


              var ced = window.localStorage.getItem('sesion');
              $.ajax({
                type: "POST",
                url: "http://comino.uninorte.edu.co/prospectos/resultados_usuario.php",
                data:{cedula:ced},
                success: function(mensaje) 
                {
                  var obj = JSON.parse(mensaje);
                  contador_respuesta = obj.datos.length-1;
                  if(obj.exito == "1")
                  {

                    resultadosArray[0]=[];
                    resultadosArray[1]=[];
                    resultadosArray[2]=[];
                    resultadosArray[3]=[];
                    resultadosArray[4]=[];
                    resultadosArray[5]=[];

                    for (var i = 0; i < obj.datos.length-1; i++)
                    {
                      if (i == 0)
                      {
                        $("#n1").text(obj.datos[i].interes1);
                        $("#barra1").val(obj.datos[i].porcentaje1);
                        $("#p1").text(obj.datos[i].porcentaje1+"%");
                        verificarResultados2(obj.datos[i].interes1,1);

                        $("#n2").text(obj.datos[i].interes2);
                        $("#barra2").val(obj.datos[i].porcentaje2);
                        $("#p2").text(obj.datos[i].porcentaje2+"%");
                        verificarResultados2(obj.datos[i].interes2,2);

                        $("#n3").text(obj.datos[i].interes3);
                        $("#barra3").val(obj.datos[i].porcentaje3);
                        $("#p3").text(obj.datos[i].porcentaje3+"%");
                        verificarResultados2(obj.datos[i].interes3,3);

                        $("#n4").text(obj.datos[i].interes4);
                        $("#barra4").val(obj.datos[i].porcentaje4);
                        $("#p4").text(obj.datos[i].porcentaje4+"%");
                        verificarResultados2(obj.datos[i].interes4,4);

                        $("#n5").text(obj.datos[i].interes5);
                        $("#barra5").val(obj.datos[i].porcentaje5);
                        $("#p5").text(obj.datos[i].porcentaje5+"%");
                        verificarResultados2(obj.datos[i].interes5,5);

                        $("#n6").text(obj.datos[i].interes6);
                        $("#barra6").val(obj.datos[i].porcentaje6);
                        $("#p6").text(obj.datos[i].porcentaje6+"%");
                        verificarResultados2(obj.datos[i].interes6,6);
                      }


                      resultadosArray[i][0] = obj.datos[i].interes1;
                      resultadosArray[i][1] = obj.datos[i].porcentaje1;
                      resultadosArray[i][2] = obj.datos[i].interes2;
                      resultadosArray[i][3] = obj.datos[i].porcentaje2;
                      resultadosArray[i][4] = obj.datos[i].interes3;
                      resultadosArray[i][5] = obj.datos[i].porcentaje3;
                      resultadosArray[i][6] = obj.datos[i].interes4;
                      resultadosArray[i][7] = obj.datos[i].porcentaje4;
                      resultadosArray[i][8] = obj.datos[i].interes5;
                      resultadosArray[i][9] = obj.datos[i].porcentaje5;
                      resultadosArray[i][10] = obj.datos[i].interes6;
                      resultadosArray[i][11] = obj.datos[i].porcentaje6;
                      resultadosArray[i][12] = obj.datos[i].fecha;
                    }
                  }
                },
                error : function (mensaje){
                   navigator.notification.alert(
                    'Hubo un error en la solicitud, favor intente de nuevo! 3',  // message
                    null,         // callback
                    'Mensaje',            // title
                    'Ok'                  // buttonName
                  );
                }
              });

              window.localStorage.setItem('pregunt','ok');
              $.mobile.loading( "hide" );
              $(".modalWindow").remove();
              $.mobile.changePage("#resultados", "slide", false, true);           
            }
            else
            {
                $.mobile.loading( "hide" );
                $(".modalWindow").remove();
                navigator.notification.alert('Correo o contraseña incorrectos!',null,'Mensaje','Ok');
            }
                //alert("DATOS: "+correo+" - PASS: "+pass);
          }
          else
          {
              $.mobile.loading( "hide" );
              $(".modalWindow").remove();
              navigator.notification.alert('Hubo un error en la solicitud, favor intente de nuevo!',null,'Mensaje','Ok');
          }
        },
        error : function (mensaje){
          $.mobile.loading( "hide" );
          $(".modalWindow").remove();
          navigator.notification.alert(
            'Hubo un error en la solicitud, favor intente de nuevo!',  // message
            null,         // callback
            'Mensaje',            // title
            'Ok'                  // buttonName
          );
        }
      });
    }
    else
    {
        window.plugins.toast.showLongBottom("Por favor verifica tu conexión a Internet");
    }
  }

  //OK
  $('#validarForminicio').click(function(){
    if ($('#registroForminicio').valid()){
      //alert('form is valid - not submitted');
      //$.mobile.changePage("#home", "slide", false, true);
      //$.mobile.loading( "hide" );
      //$.mobile.changePage("#login", "slide", false, true);
      mensajeInicio();
    }
    else
    {
      //alert('form is not valid');
    }
  });

  //OK
  $('#registroForminicio').validate({
    rules: {
       txtcorreoinicio: {
            required: true
        },
        txtpassinicio:{
            required: true
        }
    },
    messages:{
        txtcorreoinicio: {
            required: "Por favor digite Correo Electrónico."
        },
        txtpassinicio:{
            required: "Por favor digite su contraseña."
        }
    },

    success: function(label,element) {
        label.parent().removeClass('error');
        label.remove();
    },
    errorPlacement: function(error,element){
        error.appendTo(element.parent().after());
    },
    submitHandler: function(form){
        //$.mobile.changePage("#home", "slide", false, true);
        return true;
        //form.submi();
    }
  });

  //OK
  $('#validarForm').click(function(){
    if ($('#registroForm').valid())
    {
      if (navigator.network.connection.type != Connection.NONE){
          mensagePrivacidad();
      }
      else
      {
        window.plugins.toast.showLongBottom("Por favor verifica tu conexión a Internet");
        /*navigator.notification.alert(
            'Por favor verifica tu conexión a Internet',  // message
            null,         // callback
            'Mensaje',            // title
            'Ok'                  // buttonName
        );*/
      }
    }
    /*else
    {
      var pais,dep,ciu;
      if($('#txtpais').val() == 'Otro')
      {
        pais = $('#txtpais2').val();
        ciu = $('#txtciudad').val();
      }
      else
      {
        pais = $('#txtpais').val();
        dep = $('#txtdepartamento').val();
        ciu = $('#txtciudad').val();
      }
      alert(pais+" - "+dep+" - "+ciu);     
    }*/
  });

  //OK
  $('#registroForm').validate({
    rules: {
       txtnombre: {
          required: true
        },
        txtapellido: {
          required: true
        },
        txtcedula:{
          required: true
        },


        txtedad:{
          required: true
        },
        txttelpadre:{
          required: true
        },

        txtcelular:{
          required: true
        },
        txtcolegio:{
          required: true
        },
        txtdepartamento:{
          selectcheck: true
        },
        txtpais:{
          selectcheck2: true
        },
        txtpais2:{
          required: true
        },
        txtciudad:{
          required: true
        },
        txtcorreo:{
          required: true
        },
        txtconfcorreo:{
          equalTo: "#txtcorreo"
        },
        txtpass:{
          required: true,
          minlength: 6
        },
        txtconfpass:{
          equalTo: "#txtpass"
        }
    },
    messages:{
        txtnombre: {
          required: "Por favor digite su primer nombre."
        },
        txtapellido: {
          required: "Por favor digite su primer apellido"
        },
        txtcedula:{
          required: "Por favor digite su cedula."
        },
        txtedad:{
          required: "Por favor digite su edad"
        },
        txttelpadre:{
          required: "Por favor digite un telefono de su padre de familia"
        },
        txtcelular:{
          required: "Por favor digite su telefono celular."
        },
        txtcolegio:{
          required: "Por favor digite el nombre de su colegio."
        },
        txtpais2:{
          required: "Por favor seleccione su pais."
        },
        txtciudad:{
          required: "Por favor digite su ciudad."
        },
        txtcorreo:{
          required: "Por favor digite su correo."
        },
        txtconfcorreo:{
          equalTo: "Por favor digite el mismo correo."
        },
        txtpass:{
          required: "Por favor digite su contraseña."
        },
        txtconfpass:{
          equalTo: "Por favor digite la misma contraseña."
        }
    },

    success: function(label,element) {
        label.parent().removeClass('error');
        label.remove();
    },
    errorPlacement: function(error,element)
    {
      error.appendTo(element.parent().after());
    },
    submitHandler: function(form){
      //$.mobile.changePage("#home", "slide", false, true);
      return true;
      //form.submi();
    }
  });

  jQuery.validator.addMethod('selectcheck', function (value) {
    return (value != '0');
  }, "Por favor seleccione su departamento.");

  jQuery.validator.addMethod('selectcheck2', function (value) {
    return (value != '0');
  }, "Por favor seleccione su pais.");


  $('.atras_instrucciones').click(function(e){
    //alert("aasaaa
    $.mobile.changePage("#informacion_test",{transition: 'slide', reverse: true});
  });

  $('#atras_registro').click(function(e){
    //alert("aasaaa
    $.mobile.changePage("#inicio",{transition: 'slide', reverse: true});
  });

  $('#atras_politica').click(function(e){
    //alert("aasaaa");
    $.mobile.changePage("#registro",{transition: 'slideup', reverse: true});
  });

  /*$('.atras_manual').click(function(e){
    //alert("aasaaa");
    $.mobile.changePage("#manual",{transition: 'slide', reverse: true});
  });

  $('.atras_investigativa').click(function(e){
    //alert("aasaaa");
    $.mobile.changePage("#investigativa",{transition: 'slide', reverse: true});
  });

  $('.atras_social').click(function(e){
    //alert("aasaaa");
    $.mobile.changePage("#social",{transition: 'slide', reverse: true});
  });

  $('.atras_artistico').click(function(e){
    //alert("aasaaa");
    $.mobile.changePage("#artistico",{transition: 'slide', reverse: true});
  });

  $('.atras_emprendimiento').click(function(e){
    //alert("aasaaa");
    $.mobile.changePage("#emprendimiento",{transition: 'slide', reverse: true});
  });

  $('.atras_convencional').click(function(e){
    //alert("aasaaa");
    $.mobile.changePage("#convencional",{transition: 'slide', reverse: true});
  });*/



  $('.atras_resultados').click(function(e){
    $.mobile.changePage("#resultados",{transition: 'slide', reverse: true});
    e.preventDefault();
  });

  $('.atras_home').click(function(e){
    $.mobile.changePage("#home",{transition: 'slide', reverse: true});
    e.preventDefault();
  });
  $('.btn_home').click(function(e){
    $.mobile.changePage("#home",{transition: 'none', reverse: false});
    e.preventDefault();
  });

  //OK
  $('.btn_perfil').click(function(e){
    $('#r1').hide();
    $('#r2').hide();
    $('#r3').hide();
    $('#r4').hide();
    $('#r5').hide();
    $.mobile.changePage("#perfil", {transition: 'none'});
    e.preventDefault();
    //$.mobile.changePage("#perfil",{transition: 'none', reverse: false});
  });

  //OK
  $('#btn_salir').click(function(e){
    var mensage = 'Desea cerrar sesion?';
    navigator.notification.confirm(
      mensage,
      exitFromApp,
      'Mensaje',
      ['No','Si']
    );

    function exitFromApp(buttonIndex){
        if (buttonIndex==2){
          contador_respuesta=0;
          $("#nom").val("");
          $("#snom").val("");
          $("#apel").val("");
          $("#sapel").val("");
          $("#ced").val("");
          $("#cor").val("");
          window.localStorage.clear();
          $.mobile.changePage("#inicio", "slide", false, true);
          e.preventDefault();
        }
    }
  });

  //OK
  $('.btn_info1').click(function(e){
    navigator.notification.alert(
      'A continuación se presenta un listado de actividades relacionadas con varios campos profesionales. Selecciona: \n\n - SI,  en el caso de que  la actividad sugerida sea de tu agrado \n - NO, si te resulta indiferente o te desagrada',  // message
      null,         // callback
      'Instrucciones',            // title
      'Ok'                  // buttonName
    );
  });

  //OK
  $('.btn_info2').click(function(e){
    navigator.notification.alert(
      'Califica de 1 a 5 tus habilidades en las seis áreas que se te presentan,  de acuerdo al nivel en el que estimes te encuentras en cada una. Por cada grupo de habilidades, se ofrece una definición y varios ejemplos de las actividades en las que se ponen en práctica dichas destrezas. Contesta considerando tu nivel general de desempeño (no importa si sobresales en unas más que en otras) en cada área. Sigue esta escala: \n\n1. Muy bajo nivel de desarrollo \n2. Bajo nivel de desarrollo \n3. Medio nivel de desarrollo \n4. Alto nivel de desarrollo \n5. Muy alto nivel de desarrollo',  // message
      null,         // callback
      'Instrucciones',            // title
      'Ok'                  // buttonName
    );
  });

  //OK
  $('.btn_info3').click(function(e){
    navigator.notification.alert(
      'A continuación se te presenta un listado de ocupaciones relacionados con varias carreras, de tipo técnico y  universitario.   Responde pensando en si la ocupación es o no de tu agrado, independientemente de que hayas considerado cursarla o no, así como del nivel de formación requerido.',  // message
      null,         // callback
      'Instrucciones',            // title
      'Ok'                  // buttonName
    );
  });

  //OK
  $('#btn_edit').click(function(e){
    $(".perfil_estilo02 input").prop("disabled",false);
    $('#btn_edit').hide();
    $('#btn_ok').show();
    Pnom = $("#nom").val();
    Psnom = $("#snom").val();
    Pape = $("#apel").val();
    Psape = $("#sapel").val();
    Pced = $("#ced").val();
    Pcor = $("#cor").val();
  });

  //OK
  $('#btn_ok').click(function(e)
  {
    var mensage = 'Desea guardar los cambios?';
    navigator.notification.confirm(
      mensage,
      exitFromApp,
      'Mensaje',
      ['No','Si']
    );

    function exitFromApp(buttonIndex)
    {
      if(buttonIndex==2){
        if (navigator.network.connection.type != Connection.NONE){
          $("body").append('<div class="modalWindow"/>');
          $.mobile.loading( "show", {text: "Actualizando datos...",textVisible: true,theme: "a",html: ""});
          $.ajax({
              type: "POST",
              url: "http://comino.uninorte.edu.co/prospectos/actualizar.php",
              data:{cedula:Pced,
                    nombre:$("#nom").val(),
                    snombre:$("#snom").val(),
                    apellido:$("#apel").val(),
                    sapellido:$("#sapel").val(),
                    correo:$("#cor").val(),
                    cedulan:$("#ced").val()},
              success: function(mensaje) {
                //alert(mensaje);
                var obj = JSON.parse(mensaje);
                //alert("Todo: "+mensaje +"___Datos: "+ obj.datos[0].correo+" - "+obj.datos[0].nombre+" - "+obj.datos[0].cedula+" - "+obj.datos[0].direccion);
                //obj.datos[0].correo       Obtiene el objeto
                //obj.datos.length          Obtiene el tamaño
                if(obj.exito == "1"){
                  window.localStorage.setItem('nom',$("#nom").val());
                  window.localStorage.setItem('snom',$("#snom").val());
                  window.localStorage.setItem('ape',$("#apel").val());
                  window.localStorage.setItem('sape',$("#sapel").val());
                  window.localStorage.setItem('sesion',$("#ced").val());
                  window.localStorage.setItem('cor',$("#cor").val());


                  $("#nom").val(window.localStorage.getItem("nom"));
                  $("#snom").val(window.localStorage.getItem("snom"));
                  $("#apel").val(window.localStorage.getItem("ape"));
                  $("#sapel").val(window.localStorage.getItem("sape"));
                  $("#ced").val(window.localStorage.getItem("sesion"));
                  $("#cor").val(window.localStorage.getItem("cor"));

                  $(".perfil_estilo02 input").prop("disabled",true);
                  e.preventDefault();
                  $('#btn_ok').hide();
                  $('#btn_edit').show();

                  $.mobile.loading( "hide" );
                  $(".modalWindow").remove();
                }else{
                  $.mobile.loading( "hide" );
                  $(".modalWindow").remove();
                  navigator.notification.alert('Hubo un error en la solicitud, favor intente de nuevo!',null,'Mensaje','Ok');
                }
              },
              error : function (mensaje){
                 $.mobile.loading( "hide" );
                 $(".modalWindow").remove();
                 navigator.notification.alert(
                  'Hubo un error en la solicitud, favor intente de nuevo!',  // message
                  null,         // callback
                  'Mensaje',            // title
                  'Ok'                  // buttonName
                );
              }
          });
        }
        else
        {
          window.plugins.toast.showLongBottom("Por favor verifica tu conexión a Internet");
        }
      }
      else
      {
        if(buttonIndex==1){
          $("#nom").val(Pnom);
          $("#snom").val(Psnom);
          $("#apel").val(Pape);
          $("#aapel").val(Psape);
          $("#ced").val(Pced);
          $("#cor").val(Pcor);
          $(".perfil_estilo02 input").prop("disabled",true);
          $('#btn_ok').hide();
          $('#btn_edit').show();
        }
      }
    }
  });

  //OK
  $('#txtedad').on('input', function() {
    var valor = this.value;
    if (valor<=14){
      $('#div_telpadre').show();
    }
    else
    {
      $('#div_telpadre').hide();
    }
  });

  //OK
  $( "#txtpais" ).change(function() {
    var valor = this.value;
    if (valor == 'Otro')
    {
      $('#div_pais').show();
      $('#div_departamento').hide();
    }
    else
    {
      $('#div_pais').hide();
      $('#div_departamento').show();
    }
  });
})