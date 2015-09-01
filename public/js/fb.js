window.fbAsyncInit = function() {
    FB.init({
      appId      : '1671328239769688',
      xfbml      : true,
      version    : 'v2.4'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));



  function Login1(){
      FB.login(function(response) {
         if (response.authResponse) {
              getUserInfo();
          } else {
           console.log('User cancelled login or did not fully authorize.');
          }
       },{scope: 'email,user_photos,user_videos'});

  }

  function Login(){
      FB.api(
        '/v2.3/me/?fields=photos{images,tags}&metadata=1',
        'GET',
        {},
        function(response) {
          handleResponse(response.photos, [], 0);          
        }
    );
  }

function handleResponse(photosNode, finalPhotoList, count){
  console.log('count: '+ count + ', photo nodes: ' + finalPhotoList.length);

  count++;

  finalPhotoList = finalPhotoList.concat(photosNode);
  
  var next = photosNode.paging.next;

    if(!next){

      console.log('final:');
      console.log(finalPhotoList);

      filterFriendByUserId(finalPhotoList);

    }else{

      $.get(next, function(data) {
        console.log('data from ajax ');
        console.log(data);
        handleResponse(data, finalPhotoList, count);
      }, 'json');

    }
}


function getUserInfo() {
      FB.api('/me', function(response) {

    var str="<b>Name</b> : "+response.name+"<br>";
        str +="<b>Link: </b>"+response.link+"<br>";
        str +="<b>Username:</b> "+response.username+"<br>";
        str +="<b>id: </b>"+response.id+"<br>";
        str +="<b>Email:</b> "+response.email+"<br>";
        str +="<input type='button' value='Get Photo' onclick='getPhoto();'/>";
        str +="<input type='button' value='Logout' onclick='Logout();'/>";
        document.getElementById("status").innerHTML=str;

  });
  }
  function getPhoto()
  {
    FB.api('/me/picture?type=normal', function(response) {

        var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
        document.getElementById("status").innerHTML+=str;

  });

  }
  function Logout()
  {
      FB.logout(function(){document.location.reload();});
  }

// Load the SDK asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "http://connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));