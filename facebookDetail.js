$(document).ready(function() {

    var $window = $(window);

    //Functions to show & hide controls
    function checkWidth() {
        var windowWidthSize = $window.width();
        var windowHeightSize = $window.height();
        $("#divHome").width(windowWidthSize);
        $("#divHome").height(windowHeightSize);
        $("#imgHome").width(windowWidthSize);
        $("#imgHome").height(windowHeightSize);

        if (windowWidthSize < 420) {
            $(".navbar-toggle").addClass('hidden-xs');
            $("#menu-toggle").removeClass('hidden-xs');
            $("#sidebar-wrapper").removeClass('hidden-xs');
            if($("#wrapper").hasClass('active')){
                $("#websiteName").removeClass('hidden-xs');
            }
            else{
                $("#websiteName").addClass('hidden-xs');
            }
            $("#subMenu").addClass('hidden-xs');
            $("#menubar").css('width', '50px');
        }
        else{
            $(".navbar-toggle").removeClass('hidden-xs');
            $("#menu-toggle").addClass('hidden-xs');
            $("#sidebar-wrapper").addClass('hidden-xs');
            $("#websiteName").removeClass('hidden-xs');
            $("#subMenu").removeClass('hidden-xs');
            $("#menubar").css('width', '');
        }
    }
        
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
        $("#websiteName").toggleClass('hidden-xs');
    });

    $("#websiteName").click(function() {
        $("#wrapper").toggleClass("active");
        $("#websiteName").toggleClass('hidden-xs');
    });
    
    checkWidth();
    $(window).resize(checkWidth);

    //Functions to show & hide div
    $(".lnk1").click(function() {  
        $("#divProfileDetail").css('display', 'block');
        $("#divPost").css('display', 'none');
        $("#divHome").css('display', 'none');
        $("#wrapper").toggleClass("active");
        $("#websiteName").toggleClass('hidden-xs');
    });

    $(".lnk2").click(function() {
        $("#divProfileDetail").css('display', 'none');
        $("#divPost").css('display', 'block');
        $("#divHome").css('display', 'none');
        $("#wrapper").toggleClass("active");
        $("#websiteName").toggleClass('hidden-xs');
    });

    $("#websiteName").click(function() {
        $("#divProfileDetail").css('display', 'none');
        $("#divPost").css('display', 'none');
        $("#divHome").css('display', 'block');
    });



    $("#myModal").modal('show');
    $('#divFacebookAccDetails').hide();
    
    //Function to get facebook acc details
    function getFacebookInfo(e){
        $("#myModal").modal('hide');

        var myFacebookToken = $("#txtFbToken").val();

        $.ajax('https://graph.facebook.com/me?fields=name,gender,birthday,relationship_status,hometown,education,feed&access_token='+myFacebookToken,{

                success : function(response){
                    console.log(response);
                    $("#myName").text(response.name);
                    $("#myGender").text(response.gender);
                    $("#myBirthday").text(response.birthday);
                    $("#myRelStatus").text(response.relationship_status);
                    $("#myHometown").text(response.hometown.name);
                    jQuery.each(response.education,function(i, val) {
                        $("#educationList").append('<li>'+val.school.name+'</li>');
                    });
                    jQuery.each(response.feed.data,function(i, val) {
                        if(typeof(val.message) != "undefined"){
                            $("#feedsList").append('<li>'+val.message+'</li>');
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
                    $('#divFacebookAccDetails').hide();
                },// beforeSend function

                complete : function(){
                    $('#divFacebookAccDetails').show();
                }// complete function

            }//end argument list 
        );// end ajax call 

        e.preventDefault();
    }// end getFacebookInfo() function

    $("#btnShowFbDetail").on('click',getFacebookInfo);
});