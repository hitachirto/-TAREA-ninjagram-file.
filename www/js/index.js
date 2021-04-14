/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
//document.addEventListener('deviceready', onDeviceReady, false);

/*let app= {
    init: function(){
        document.getElementById('btn').addEventListener('click',app.takephoto);

    },
    takephoto:function(){
        let opts={
            quality:80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType:Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType:Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            saveToPhotoAlbum:true,
            targetWidth:300,
            targetHeight:400 

        };
        navigator.camera.getPicture(app.ftw,app.wtf,opts);

    },
    ftw: function(imgURI){
        document.getElementById('msg').textContent=imgURI;
        document.getElementById('photo').src=imgURI;

    },
    wtf: function(){
        document.getElementById('msg').textContent= msg;

    }
};
function onSucces(ruta_de_la_foto){
    document.getElementById("fotos").innerHTML+="<div class='foto'><img src='"+ruta_de_la_foto+"'></div>"
}

document.addEventListener('deviceready',app.init);*/

var app = {
    initialize: function(){
        document.addEventListener('deviceready',this.onDeviceReady.bind(this),false);
    },
    onDeviceReady: function(){
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id){
        document.getElementById("tomar_foto").onclick=tomar_foto;
        console.log('received Event:'+ id)
    }
}

function tomar_foto(){
    navigator.camera.getPicture(onSuccess,onFail,{

        quality:80,
        destinationType: Camera.DestinationType.DATA_URI,
        sourceType:Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType:Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.BACK,
        saveToPhotoAlbum:true,
        targetWidth:300,
        targetHeight:400 
    }
    );
    function onSuccess(imageURI){
        img=imageURI
        navigator.notification.prompt("escribe el titulo de la foto", acabar_foto,"titulo",["ok","sin titulo"],"");
       

    }
    function acabar_foto(contenido){
        let botonpulsado=contenido.buttonIndex;
        let textoescrito=contenido.input1
        if(botonpulsado==2){
            textoescrito="(sin titulo)"
        }
        document.getElementById("fotos").innerHTML+="<div class='foto'><img src='"+img+"'><div class='titulo'>"+textoescrito+"</div></div>"
    }

    function onFail(message){
        alert('fallo porque:'+ message);
    }
        

}
app.initialize();
