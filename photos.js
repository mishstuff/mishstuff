var exports = module.exports = {};

exports.getPhotos = function(){
	console.log("get photos");

	FB.api(
        '/v2.3/me/?fields=photos{images,tags}&metadata=1',
        'GET',
        {},
        function(response) {
          handleResponse(response.photos, [], 0);          
        }
    );
}

var handleResponse = function(photosNode, finalPhotoList, count){

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