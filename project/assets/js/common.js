// switching videos with main video
$(document).ready(function(){
    $("div#first-half  a").click(function(e) {
        e.preventDefault();
        
        $("#main").attr("src", $(this).attr("href"));
    })
});




//   Map
function initMap() {
    var uluru = {lat: 24.9424897, lng: 67.1470131};
    var faizloc={lat: 24.829413, lng: 67.0726507};
    var string1="<div><h3 style='color: #4782ae'>Defence Phase7</h3></div>"+"<div><a href='https://youtube.com/embed/vTZUq5YOAHM?rel=0&autoplay=1&modestbranding=1&fs=0'><img src='../Images/defence.png' width='200px' height='100px' /></a><div>"
    var string2="<div><h3  style='color: #4782ae'>Haroon</h3></div>"+"<div><a href='https://youtube.com/embed/CL4MErnrTq0?rel=0&autoplay=1&modestbranding=1&fs=0'><img src='../Images/haroon.png' width='200px' height='100px' /></a><div>"
  
 
    var infowindow = new google.maps.InfoWindow({
      content: string1
    });
    var infowindow2 = new google.maps.InfoWindow({
      content: string2
    });
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: uluru,
    
    });
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: faizloc
    });
    var marker1 = new google.maps.Marker({
      position: faizloc,
      map: map,
  

    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    

    });
    marker1.addListener('click', function() {
      infowindow.open(map, marker1);
      
    });
    marker1.addListener('mouseout', function() {
       setTimeout(function(){infowindow.close(map, marker1);},3000) 
        
      });
    marker.addListener('click', function() {
      infowindow2.open(map, marker);
    });

    marker.addListener('mouseout', function() {
        setTimeout(function(){infowindow2.close(map, marker);},3000) 
         
       });
  }

//   CAMERA VIEWS
// views camera-1
var response;
function callApi() {
    var xHttpReq = new XMLHttpRequest();
    //xHttpReq.setRequestHeader("Content-type", "application/json");
    xHttpReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            document.getElementById("views").innerHTML=response.items[0].statistics.viewCount + "<br />";
           

        }
    }
    xHttpReq.open("GET", "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=vTZUq5YOAHM&key=AIzaSyAKfMw-Op8Fp013Jn3dyJS7747iVpErVPc", true);
    xHttpReq.send();
}

// views camera-2
var response;
function callApi2() {
    var xHttpReq = new XMLHttpRequest();
    //xHttpReq.setRequestHeader("Content-type", "application/json");
    xHttpReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            document.getElementById("views2").innerHTML=response.items[0].statistics.viewCount + "<br />";
           

        }
    }
    xHttpReq.open("GET", "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=CL4MErnrTq0&key=AIzaSyAKfMw-Op8Fp013Jn3dyJS7747iVpErVPc", true);
    xHttpReq.send();
}

// menu collapse 
$(document).click(function(e) {
	if (!$(e.target).is('.navbar-collapse collapse in')) {
    	$('.collapse').collapse('hide');	    
    }
});