$(document).ready(function() {
    $("#myModal").modal('show');
    $('.loader').hide();
    $('#FbDetail').hide();

    function getFacebookInfo(e){
        $("#myModal").modal('hide');

        var myFacebookToken = $("#txtFbToken").val();

        $.ajax('https://graph.facebook.com/me?fields=name,gender,birthday,relationship_status,hometown,education,feed&access_token='+myFacebookToken,{

                success : function(response){
                    console.log(response);
                    $("#myName").text(response.name);
                    $("#myGender").text(response.gender);
                    $("#myBirthday").text(response.birthday)
                    $("#myRelStatus").text(response.relationship_status)
                    $("#myHometown").text(response.hometown.name);
                    jQuery.each(response.education,function(i, val) {
                        $("#educationList").append('<h3><li>'+val.school.name)+'</li></h3>'
                    });
                    jQuery.each(response.feed.data,function(i, val) {
                        if(typeof(val.message) != "undefined"){
                            $("#feedsList").append('<h3><li>'+val.message)+'</li></h3>'
                        }
                    });
                },// sucess function
                
                error : function(request,errorType,errorMessage){
                    console.log(request);
                    console.log(errorType);
                    alert(errorMessage);
                },// error function

                timeout:3000,// 3 seconds

                beforeSend : function(){
                    $('.loader').show();
                    $('#FbDetail').hide();
                },// beforeSend function

                complete : function(){
                    $('.loader').hide();
                    $('#FbDetail').show();
                }// complete function

            }//end argument list 
        );// end ajax call 

        e.preventDefault();
    }// end getFacebookInfo() function

    $("#btnShowFbDetail").on('click',getFacebookInfo)
});