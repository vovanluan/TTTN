$(document).ready(function() {
    /*
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/restful-java/user/all",        
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
        }       
    })
    .done(function(data) {        
        $(".panel-title").html("Users List");        
        var table = $('#users-list').DataTable({
            data: data,
            columns: [
                {
                    title: 'Id',
                    data: 'id'
                },
                {
                    title: 'Name',
                    data: 'name'
                },
                {
                    title: 'Email',
                    data: 'email'
                },
                {
                    title: 'Actions',
                    render: function () {
                        return '<button class="btn btn-primary btn-sm"><i class="fa fa-list-ul"></i> Detail</button>';
                    }
                }
            ]
        });
        
        $('#users-list tbody').on('click', 'button', function () {                        
            var selected = table.row($(this).parents('tr')).data();
            
            $('#details-modal-label').html('<b> ' + selected.username + '</b>\'s information');
            $('#details-id').attr('value', selected.id);
            $('#details-username').attr('value', selected.username);
            $('#details-password').attr('value', selected.password);
            $('#details-email').attr('value', selected.email);
            $('#details-name').attr('value', selected.name);                                
            $('#details-status').attr('value', selected.status);

            $('#details-modal').modal('show');            
        });
                        
    })
    .fail(function() {
        console.log("error");
    });*/
    function getSelectedText(elementId) {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
}
    
    $(".btn-success").click(function(){                
        
    
    var content = new Object();
    content.address = $("#addInfo").val();   
    content.description = $("#desInfo").val();
    var date = new Date();
    content.expectedDatetime =  content.updatedDatetime = content.requestedDatetime = date.toISOString();   
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
    
    content.latitude = 111.11;
    content.longitude = 122.14;
    content.serviceRequestId = 1;
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