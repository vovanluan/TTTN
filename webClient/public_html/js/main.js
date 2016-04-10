function initMap() {
    var myLatLng = {lat: 10.78, lng: 106.65};
    map = new google.maps.Map(document.getElementById('googleMap'), {
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
    var lonlat = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    var marker = new google.maps.Marker({
        position: lonlat,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: "Di chuyển để xác định đúng vị trí"
    });
    map.setCenter(lonlat);
    console.log(map.getCenter());
    map.setZoom(15);
    google.maps.event.addListener(marker, "dragend", function (event) {
        $("#latitude").val(Number((event.latLng.lat()).toFixed(3)));
        $("#longitude").val(Number((event.latLng.lng()).toFixed(3)));;
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
function alertFileName (event) {
    var fileName = document.getElementById('fileupload').value;
    fileName = fileName.replace(/.*[\/\\]/, '');
    document.getElementById('fileName').innerText = fileName;

    var reader = new FileReader();
    reader.onload = function(){
    var output = document.getElementById('image-holder');
    output.src = reader.result;
};
reader.readAsDataURL(event.target.files[0]);


}
function step1Click () {
    var subInfo = $('#subject option:selected').val();
    console.log(subInfo);
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

    console.log(dateInfo);
    $('#subInfo').val(subInfo);
    console.log(dateInfo);
    $('#outputDatetime').val(dateInfo);
    $('#desInfo').val(desInfo);

    $('.nav-tabs > .active').next('li').find('a').trigger('click');
}
function step2Click () {
    var disInfo = $('#district option:selected').text();
    var wardInfo;
    var addInfo = $('#address').val();
    switch(disInfo){
        case 'Quận 1':
            wardInfo=$('#quan1 option:selected').text();
            break;
        case 'Quận 2':
            wardInfo=$('#quan2 option:selected').text();
            break;
        case 'Quận 10':
            wardInfo=$('#quan10 option:selected').text();
            break;
        case 'Quận Bình Thạnh':
            wardInfo=$('#quanbinhthanh option:selected').text();
            break;
        case 'Quận Thủ Đức':
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
$('.btnPrev').click(function(){
    $('.nav-tabs > .active').prev('li').find('a').trigger('click');
});
$(document).ready(function() {
    var dtpicker = $("#dtBox").DateTimePicker({
        dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
    });            
    initMap();   
    $(".btn-success").click(function(){                
        var content = new Object();
        content.address = $("#addInfo").val();   
        content.description = $("#desInfo").val();
        var happen = $("#outputDatetime").val();
        var date = new Date(happen);
        content.happenDatetime = formatLocalDate(date);
        content.requestedDatetime = formatLocalDate(new Date());
        content.statusId = 0;
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
        
    });
    
});

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
            $('#emailInput').val('');
            $('#passwordInput').val('');
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
    var content = new Object();
    content.userId = $('#idInputSignup').val();
    content.userName = $('#displayNameInput').val();
    content.userEmail = $('#emailInputSignup').val();
    content.userPhone = $('#phoneInputSignup').val();
    content.passWord = $('#passwordInputSignup').val();
    console.log(JSON.stringify(content));
    $.ajax({
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

function checkErrorSignup() {
    var error = "";
    var userId = $('#idInputSignup').val();
    var userEmail = $('#emailInputSignup').val();
    var password = $('#passwordInputSignup').val();
    var confirmPassword = $('confirmPasswordInputSignup').val();

    // check password field and confirm password field are match.
    if (password != confirmPassword) {
        error = "Mật khẩu không khớp!";
        return error;
    }

    // check email is existed.
    $.ajax({
            method: "GET",
            url: "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.users/getUserByEmail?email=" + userEmail,
            contentType: "application/json;charset=UTF-8"
    })
    .done(function(data){
        if (data!=null) {
            error = "Email đã đăng ký. Nếu bạn đã có tài khoản, vui lòng đăng nhập!";
            return error;
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
            error = "CMND đã đăng ký.Nếu bạn đã có tài khoản, vui lòng đăng nhập!";
            return error;
        }
    })
    .fail(function(errMsg) {
        console.log("error: " + errMsg);
    });

    return error;
}