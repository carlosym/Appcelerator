// this sets the background color of the master UIView (when there are no windows/tab groups on it)
// create table view data object
var data = [];
var contadorDeFeed = 0;
var start;
var primeraAnimacion=true;

var win1 = Ti.UI.createWindow({
	backgroundColor : 'white'
});

var tableview = Titanium.UI.createTableView({
	left : 310,
	height : 80,
	width : 310,
	//data:[data[0]],
})

win1.add(tableview);

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", "http://v2.0.news.tmg.s3.amazonaws.com/feeds/news.xml");
xhr.onload = function() {
	try {
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("item");
		var x = 0;
		var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
		for (var c = 0; c < items.length; c++) {
			var item = items.item(c);
			var thumbnails = item.getElementsByTagName("media:thumbnail");
			if (thumbnails && thumbnails.length > 0) {
				var media = thumbnails.item(0).getAttribute("url");
				var title = item.getElementsByTagName("title").item(0).text;

				var row = Ti.UI.createTableViewRow({
					height : 80
				});
				var label = Ti.UI.createLabel({
					text : title,
					left : 72,
					top : 5,
					bottom : 5,
					right : 5
				});
				row.add(label);

				var img;
				if (Titanium.Platform.name == 'android') {
					// iphone moved to a single image property - android needs to do the same
					img = Ti.UI.createImageView({
						image : media,
						left : 5,
						height : 60,
						width : 60
					});

				} else {
					img = Ti.UI.createImageView({
						image : media,
						left : 5,
						height : 60,
						width : 60
					});

				}

				row.add(img);

				data[x++] = row;
				row.url = item.getElementsByTagName("link").item(0).text;
			}
		}

		tableview.addEventListener('click', function(e) {
			var w = Ti.UI.createWindow({
				title : doctitle
			});
			var wb = Ti.UI.createWebView({
				url : e.row.url
			});
			w.add(wb);
			var b = Titanium.UI.createButton({
				title : 'Close',
				style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN
			});
			w.setLeftNavButton(b);
			b.addEventListener('click', function() {
				w.close();
			});
			w.open({
				modal : true
			});
		});

	} catch(E) {
		alert(E);
	}
};
xhr.send();

function cambiarFeed() {
	tableview.animate({
			left : 0,
			duration:1000,
			curve : Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	var feedActual = data[contadorDeFeed];
	tableview.data=[feedActual];
	contadorDeFeed++;
	if (contadorDeFeed == data.length) {
		contadorDeFeed = 0;
	}
}

function eliminarFeedVentana(){
	tableview.animate({
			left : -310,
			duration:1000,
			curve : Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
}

function niceTimeFromMilliseconds(ms) {
	var total_seconds = ms / 1000;
	var minutes = Math.floor(total_seconds / 60);
	var seconds = total_seconds - (minutes * 60) - 0.499;
	//499miliseconds subtracted before rounding up in the interest of accuracy

	if (minutes < 10 && seconds < 9) {
		return "0" + minutes + ":" + "0" + Math.round(seconds);
	}
	if (minutes < 10 && seconds > 9) {
		return "0" + minutes + ":" + Math.round(seconds);
	}
	if (seconds < 9) {
		return minutes + ":" + "0" + Math.round(seconds);
	}
	return minutes + ":" + Math.round(seconds);
}

start = new Date().getTime();
//cambiarFeed();

var timerlabel = Ti.UI.createLabel({
	text : "00:00",
	top : 10,
	left : 10,
	width : 150,
	height : 80
});

var timer = setInterval(function() {
	var newTime = new Date().getTime();
	timerlabel.text = niceTimeFromMilliseconds(newTime - start);
	if (timerlabel.text == "00:10") {
		tableview.left=310;
		start = new Date().getTime();
		cambiarFeed();
		primeraAnimacion=false;
	}
	
	if(primeraAnimacion==false){
		if(timerlabel.text == "00:09"){
		eliminarFeedVentana();
		//tableview.left=310;
		}
	}
	
}, 1000);

//win1.add(timerlabel);

win1.open();
