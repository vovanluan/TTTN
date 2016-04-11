function initMap() {
    var myLatLng = {lat: 10.78, lng: 106.65};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myLatLng
    });   
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success
            , function (errMsg) {
            console.log(errMsg);
        }, {
            enableHighAccuracy: false,
            timeout: 6 * 1000,
            maximumAge: 1000 * 60 * 10
        });
    } else {
        alert("Do not support Geolocation");
    }
}

function success(pos) {
    $("#latitude").val(Number((pos.coords.latitude).toFixed(3)));
    $("#longitude").val(Number((pos.coords.longitude).toFixed(3)));
    var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: "Di chuyển để xác định đúng vị trí"
    });
    map.setCenter(latlng);
    console.log(map.getCenter());
    map.setZoom(15);
    google.maps.event.addListener(marker, "dragend", function (event) {
        $("#latitude").val(Number((event.latLng.lat()).toFixed(3)));
        $("#longitude").val(Number((event.latLng.lng()).toFixed(3)));
        map.setCenter(event.latLng);
    });
}

function subjectChange () {
    var sub = document.getElementById('subject');
    var whichsubject = sub.options[sub.selectedIndex].value;
    var electricity = document.getElementById('electricity');
    var water = document.getElementById('water');
    var noise = document.getElementById('noise');
    switch(whichsubject){
        case 'dien':
            electricity.style.display='inline';
            water.style.display='none';
            noise.style.display='none';
            break;
        case 'nuoc':
            electricity.style.display='none';
            water.style.display='inline';
            noise.style.display='none';
            break;
        case 'tiengon':
            electricity.style.display='none';
            water.style.display='none';
            noise.style.display='inline';
            break;
    }
}
function districtChange () {
    var dis = document.getElementById('district');
    var whichdis = dis.options[dis.selectedIndex].value;
    var quan1 = document.getElementById('quan1');
    var quan2 = document.getElementById('quan2');
    var quan10 = document.getElementById('quan10');
    var quanbinhthanh = document.getElementById('quanbinhthanh');
    var quanthuduc = document.getElementById('quanthuduc');

    switch(whichdis){
        case 'quan1':
            quan1.style.display='inline';
            quan2.style.display='none';
            quan10.style.display='none';
            quanbinhthanh.style.display='none';
            quanthuduc.style.display='none';
            break;
        case 'quan2':
            quan1.style.display='none';
            quan2.style.display='inline';
            quan10.style.display='none';
            quanbinhthanh.style.display='none';
            quanthuduc.style.display='none';
            break;

        case 'quan10':
            quan1.style.display='none';
            quan2.style.display='none';
            quan10.style.display='inline';
            quanbinhthanh.style.display='none';
            quanthuduc.style.display='none';
            break;

        case 'quanbinhthanh':
            quan1.style.display='none';
            quan2.style.display='none';
            quan10.style.display='none';
            quanbinhthanh.style.display='inline';
            quanthuduc.style.display='none';
            break;

        case 'quanthuduc':
            quan1.style.display='none';
            quan2.style.display='none';
            quan10.style.display='none';
            quanbinhthanh.style.display='none';
            quanthuduc.style.display='inline';
            break;

    }
}

function step1Click () {
    var subInfo = $('#subject option:selected').val();
    var detailInfo;
    var dateInfo = $('#inputDatetime').val();
    var desInfo = $('#des').val();
    var electricityStep4 = document.getElementById('electricityStep4');
    var waterStep4 = document.getElementById('waterStep4');
    var noiseStep4 = document.getElementById('noiseStep4');

    switch(subInfo){
        case 'dien':
            detailInfo=$('#electricity option:selected').val();
            electricityStep4.style.display = 'inline';
            electricityStep4.value = detailInfo;
            waterStep4.style.display = 'none';
            noiseStep4.style.display = 'none';
            break;
        case 'nuoc':
            detailInfo=$('#water option:selected').val();
            electricityStep4.style.display = 'none';
            waterStep4.style.display = 'inline';
            waterStep4.value = detailInfo;
            noiseStep4.style.display = 'none';
            break;
        case 'tiengon':
            detailInfo=$('#noise option:selected').val();
            electricityStep4.style.display = 'none';
            waterStep4.style.display = 'none';
            noiseStep4.style.display = 'inline';
            noiseStep4.value = detailInfo;
            break;
    }

    $('#subInfo').val(subInfo);
    $('#outputDatetime').val(dateInfo);
    $('#desInfo').val(desInfo);

    $('.nav-tabs > .active').next('li').find('a').trigger('click');     
}
function step2Click () {
    var disInfo = $('#district option:selected').text();
    var wardInfo;
    var addInfo = $('#address').val();
    switch(disInfo){
        case '1':
            wardInfo=$('#quan1 option:selected').text();
            break;
        case '2':
            wardInfo=$('#quan2 option:selected').text();
            break;
        case '10':
            wardInfo=$('#quan10 option:selected').text();
            break;
        case 'Bình Thạnh':
            wardInfo=$('#quanbinhthanh option:selected').text();
            break;
        case 'Thủ Đức':
            wardInfo=$('#quanthuduc option:selected').text();
            break;
    }
    $('#addInfo').val(addInfo);
    $('#wardInfo').val(wardInfo);
    $('#disInfo').val(disInfo);

    $('.nav-tabs > .active').next('li').find('a').trigger('click');
}
function step3Click () {
    var checkDisplay = $('#infoDisplay').prop('checked');
    var myForm = $('#step3Form');
    if(!myForm[0].checkValidity()){
        myForm.find(':submit').click();
    }
    else $('.nav-tabs > .active').next('li').find('a').trigger('click');
    
    var nameInfo = $('#name').val();
    var phoneInfo = $('#phone').val();
    var emailInfo = $('#email').val();
    var idenInfo = $('#identify').val();

    $('#nameInfo').val(nameInfo);
    $('#phoneInfo').val(phoneInfo);
    $('#emailInfo').val(emailInfo);
    $('#idenInfo').val(idenInfo);
    $('#step3Btn').removeAttr('disabled');  
}
function step1Edit () {
    $('.infoStep1').removeAttr('readonly');
    $('#subInfo').prop('disabled',false);
    $('#chooseImgFinal').prop('disabled', false);
    $('#outputDatetime').prop('disabled',false);
    $('#subInfo').focus();
    var allTags = document.getElementById('detailInfo').getElementsByTagName('*');

    for(var i=0; i<allTags.length;i++){
        if(allTags[i].style.display=='inline'){
            allTags[i].disabled = false;
            break;
        }
    }
}
function step2Edit () {
    $('.infoStep2').removeAttr('readonly');
    $('#addInfo').focus();
}
function step3Edit () {
    $('.infoStep3').removeAttr('readonly');
    $('#nameInfo').focus();
}

function getSelectedText(elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
}

// Convert local time to ISO 8601 format yyyy-mm-ddThh:mm:ss+7:00
function formatLocalDate(time) {
    tzo = -time.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function(num) {
        var norm = Math.abs(Math.floor(num));
        return (norm < 10 ? '0' : '') + norm;
    };
    return time.getFullYear() 
        + '-' + pad(time.getMonth()+1)
        + '-' + pad(time.getDate())
        + 'T' + pad(time.getHours())
        + ':' + pad(time.getMinutes()) 
        + ':' + pad(time.getSeconds()) 
        + dif + pad(tzo / 60) 
        + ':' + pad(tzo % 60);

}

function prev () {
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
}
$(document).ready(function() {
    var c = 0;
    $('a[href="#step2"]').on('shown.bs.tab', function(e) {
        c++;
        if (c == 1)
            initMap();
    }); 
    var imgBase64 = "";
    // Handle choose image to upload

    $('.fileUpload').change(function chooseImage(event) {
        var fileName = $('#fileUpload')[0].value;
        console.log(fileName);
        fileName = fileName.replace(/.*[\/\\]/, '');
        $('#fileNameFinal')[0].innerText = $('#fileName')[0].innerText = fileName;
        var reader = new FileReader();
        reader.onload = function(){
            $('#image-holder-Final')[0].src = $('#image-holder')[0].src = reader.result;
            //Convert image to base64
            imgBase64 = reader.result.replace(/data:image\/(png|jpg|jpeg);base64,/, "");     
        };
        reader.readAsDataURL(event.target.files[0]);        
    });

    // Handle show date time
    var dtpicker = $("#dtBox").DateTimePicker({
        dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
    });      

    // Handle when press submit button ("Gửi")    
    $(".btn-success").click(function(){  
        var clientId = "254c1d5f74f2518";
        var urlToImage = "";
        // Handle upload image
        if(imgBase64 != "") {
            $.ajax({ 
            url: 'https://api.imgur.com/3/image',
            headers: {
                'Authorization': 'Client-ID ' + clientId
            },
            type: 'POST',
            datatype: "json",
            data: {
                'image': imgBase64,
                'type' : 'base64'
            },
            })
            .then(function(response) {
                urlToImage = response.data.link;

                sendRequest(urlToImage);
            })
            .fail(function(error){
                console.log("Error when upload image: " + error);
            });
            return;            
        }
        sendRequest(urlToImage);        
    });
    
});

function sendRequest(urlToImage) {
    // Get address :
    var address = $("#addInfo").val() + ", Phường " + $("#wardInfo").val() + ", Quận " + $("#disInfo").val();
    console.log(address);

    // Generate content before sending request
    var content = new Object();
    content.address = address;   
    content.description = $("#desInfo").val();
    var happen = $("#outputDatetime").val();
    var date = new Date(happen);
    content.happenDatetime = formatLocalDate(date);
    content.requestedDatetime = formatLocalDate(new Date());
    content.statusId = 0;
    content.mediaUrl = urlToImage;
    var allTags = document.getElementById('detailInfo').getElementsByTagName('*');
    for(var i=0; i<allTags.length;i++){
        if(allTags[i].style.display == 'inline'){
            content.serviceName = getSelectedText(allTags[i].id);
            break;
        }
    }
    switch($('#subInfo option:selected').val()){
        case "dien":
            content.serviceCode = 0;
            break;
        case "nuoc":
            content.serviceCode = 1;
            break;
        case "tiengon":
            content.serviceCode = 2;
            break;
    
    }
    
    content.serviceRequestId = 1;
    content.latitude = $('#latitude').val();
    content.longitude = $('#longitude').val();

    console.log(JSON.stringify(content));   
    // create request
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.requests",
        data: JSON.stringify(content),
        contentType: "application/json;charset=UTF-8"
    })  
    .done(function(data) {
            console.log("success");
        })
        .fail(function(msg) {
            console.log("error : " + msg);
    });        
}
function signin () {
    var email = $('#emailInput').val();
    var pass = $('#passwordInput').val();

    $.ajax({
            method: "GET",
            url: "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.users/checkLogin?email=" + email + "&password=" + pass,
            contentType: "application/json;charset=UTF-8"
    })
    .done(function(data){
        if(jQuery.isEmptyObject(data)){
            $('#errorLabel').text("Email hoặc mật khẩu không đúng!");
            $('#emailInput').focus();
        }   
        else{
            $('#name').val(data.userName);
            $('#email').val(data.userEmail);
            $('#phone').val(data.userPhone);
            $('#identify').val(data.userId);
            $('#signinModal').modal('toggle');
        } 

    })
    .fail(function(errMsg) {
        console.log("error: " + errMsg);
    });

}

function signup () {
    // Check error before sign up
    var error = {msg : ''};
    var p = checkErrorSignup(error);
    p.then( function() {
            if (error.msg != '') {
                console.log(error.msg);
                $('#errorLabelSignup').text(error.msg);
                return;
            }
            var content = new Object();
            content.userId = $('#idInputSignup').val();
            content.userName = $('#displayNameInput').val();
            content.userEmail = $('#emailInputSignup').val();
            content.userPhone = $('#phoneInputSignup').val();
            content.passWord = $('#passwordInputSignup').val();
            console.log(JSON.stringify(content));
            return $.ajax({
                    method: "POST",
                    url: "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.users",
                    data:JSON.stringify(content),
                    contentType: "application/json;charset=UTF-8"
            })
            .done(function(data){
            })
            .fail(function(errMsg) {
                console.log("error: " + errMsg);
            });
        }   
    );



}

function checkErrorSignup(error) {
    var deferred = new $.Deferred();
    setTimeout(function(){
        var userId = $('#idInputSignup').val();
        var userEmail = $('#emailInputSignup').val();
        var password = $('#passwordInputSignup').val();
        var confirmPassword = $('#confirmPasswordInputSignup').val();

        // check password field and confirm password field are match.
        if (password != confirmPassword) {   
            error.msg = "Mật khẩu không khớp!";
            deferred.resolve("from checkErrorSignup");
        }
        // check email is existed.
        $.ajax({
                method: "GET",
                url: "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.users/getUserByEmail?email=" + userEmail,
                contentType: "application/json;charset=UTF-8"
        })
        .done(function(data){
            if (data!=null) {
                error.msg = "Email đã đăng ký. Nếu bạn đã có tài khoản, vui lòng đăng nhập!";
                deferred.resolve("from checkErrorSignup");
            }
        })
        .fail(function(errMsg) {
            console.log("error: " + errMsg);
        });

        //check id is existed
        $.ajax({
                method: "GET",
                url: "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.users/getUserById?id=" + userId,
                contentType: "application/json;charset=UTF-8"
        })
        .done(function(data){
            if (data!=null) {
                error.msg = "CMND đã đăng ký.Nếu bạn đã có tài khoản, vui lòng đăng nhập!";
                deferred.resolve("from checkErrorSignup");
            }
        })
        .fail(function(errMsg) {
            console.log("error: " + errMsg);
        });

    },200);
    return deferred.promise();
}

//Handle Image upload
    // var imgUrl = "";
    // var memberUploadAvatarId;
    // $('#file-input').change(function(e) {
    //     var file = e.target.files[0];
    //     imageType = /image.*/;
    //     if (!file.type.match(imageType)) {
    //         console.log("File didn't match");
    //         return;
    //     }
    //     var reader = new FileReader();
    //     reader.onload = function fileOnLoad(e) {
    //         var $img = $('<img>', {src: e.target.result});
    //         $("#imgNewAvatar").attr("src", $img.attr("src"));
    //         var canvas = document.createElement('canvas');
    //         var context = canvas.getContext('2d');
    //         $img.load(function() {
    //             canvas.width = this.width;
    //             canvas.height = this.height;
    //             context.drawImage(this, 0, 0);
    //             imgUrl = canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "");
    //         })
    //     }
    //     reader.readAsDataURL(file);
    // })
    // var clientId = "ae6e3c4095f9247";
    // function showMeError(err) {
    //     console.log(err);
    // }
    // function updateAvatarForDB(data, isAddMem) {
    //     var imgLink = data.data.link;
    //     if (isAddMem == 1) {
    //         $("#modal-add-user .memberModalAvatar").attr("src", imgLink);
    //         $('#modal-uploading').modal('hide');
    //     }
    //     else {
    //         $.ajax({
    //             url: 'http://localhost:8080/hello-restful/webservice/giapha/changeavatar',
    //             type: 'POST',
    //             contentType: "application/json",
    //             data: JSON.stringify({
    //                 sentData: {
    //                     avatar : data.data.link,
    //                     memberID : memberUploadAvatarId
    //                 }
    //             }),
    //             dataType: 'json',
    //             beforeSend: function(request) {
    //                 var authstring = getCookie("giaphaauth");
    //                 if (authstring != "")
    //                     request.setRequestHeader("Authorization", "Basic " + getCookie("giaphaauth"));
    //                 else
    //                     document.location.href = "index.php";
    //             }
    //         }).done(function (data) {
    //             $("#mem" + memberUploadAvatarId).find(".memberAvatar").attr("src", imgLink);
    //             $("#modal-edit-user .memberModalAvatar").attr("src", imgLink);
    //             $("#mem" + memberUploadAvatarId).data("memberinfo", data);
    //             $('#modal-uploading').modal('hide');
    //         }).fail(function () {
    //             console.log("Failed to upload avatar !")
    //         });
    //     }
    // }
    // $("#btnUploadAvatar").click(function(){
    //     memberUploadAvatarId = $(this).attr("data-memid");
    //     var isAddMem = $(this).attr("data-addmem");
    //     $.ajax({
    //         url: "https://api.imgur.com/3/upload",
    //         type: "POST",
    //         datatype: "json",
    //         data: {image: imgUrl},
    //         success: function(data) {
    //             updateAvatarForDB(data, isAddMem);
    //         },
    //         error: showMeError,
    //         beforeSend: function (xhr) {
    //             $('#modal-uploading').modal('show');
    //             xhr.setRequestHeader("Authorization", "Client-ID " + clientId);
    //         }
    //     });
    // })