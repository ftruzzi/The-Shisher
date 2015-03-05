var effects = false, loop = true, currentbg = 0, FF = !(window.mozInnerScreenX == null), Safari = navigator.vendor.indexOf("Apple")==0 && /\sSafari\//.test(navigator.userAgent); // true or false


function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0) 
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
    return 11;

  else
    return 0; //It is not IE
}


var bgmusic = [
	{file: "bennyhill"},
	{file: "cancan"},
	{file: "flag"}
]

var combos = [
	{key: 32, file: "SHISH", desc: "SHISH!"}, //spacebar
	{key: 81, file: "DEDEDEDE", desc: "DE DE DE DE"}, //Q
	{key: 87, file: "DEDEDEDE2", desc: "DE DE DE DE DE DE"}, //W
	{key: 69, file: "ehm", desc: "EHMHMHMH"}, //E
	{key: 88, file: "GENIUS", desc: "GENIUS!"}, //X
	{key: 65, file: "eighty", desc: "EIGHTY UUUUH"}, //A
	{key: 83, file: "mistraccio", desc: "FEEHEHEH MISTRACCIOH"}, //S
	{key: 68, file: "lanch", desc: "LANCHHEEH"}, //D
	{key: 79, file:"speaking", desc: "TO SPEAKING ABBOUZHE"}, //O
	{key: 90, file: "mader", desc: "MAI MADER"}, //Z
	{key: 67, file: "CRAI", desc: "CRAI"}, //C
	{key: 73, file: "time", desc: "TIME TO TO TO"}, //I
	{key: 66, file: "commerciala", desc: "DEIDEA WITAUT MARKET COMMERCIAL-H"}, //B
	{key: 76, file: "berlin", desc: "BERLIN WALLZ"}, //L
	{key: 74, file: "resalta", desc: "RESALTA NOT GUD"}, //J
	{key: 75, file: "tiviwhennah", desc: "IN IN INDETIVI WHENNAH"}, //K
	{key: 80, file: "COPYRAIFHT", desc: "COPYRAITFH"}, //P
	{key: 77, file: "brevetto", desc:"COMESIDICE BREVETTO"}, //M
	{key: 78, file: "walker", desc:"IWWOZ E WOLKER"}, //N
	{key: 86, file: "thankyou"},
	{key: 71, file: bgmusic[currentbg].file, desc:String.fromCharCode(9835)}
];


$(document).ready(function(){
	updateZoom();
	//create audio elements in HTML file
	for(i=0;i<combos.length-1;i++){
		var audio = document.createElement("audio");
		audio.setAttribute('id', combos[i].file);
		audio.setAttribute('src', "audio/"+combos[i].file+".mp3");
		document.body.appendChild(audio);
	}
	for(i=0;i<bgmusic.length;i++){
		var audio = document.createElement("audio");
		audio.setAttribute('id', bgmusic[i].file);
		audio.setAttribute('src', "audio/"+bgmusic[i].file+".mp3");
		document.body.appendChild(audio);
	}
	if(!FF && !GetIEVersion() && !Safari) process(71);
	if(FF || GetIEVersion()){
		$(".letter").css({
			'font-family': 'Verdana'
		})		
	}
});

$(window).resize(function(){
	updateZoom();
})

$(document).keydown(function(e){
	$("div").removeClass("clicked");
	e.preventDefault();
	process(e.which);	
});

$(".key").click(function(){
	letter = $(this).find(".letter").html();
	if(letter=="SHISH!") keycode = 32;
	else keycode = letter.charCodeAt();

	if(keycode==8678) keycode=70;
	if(keycode==8680) keycode=72;

	process(keycode);

	if(keycode == 9654 || keycode == 9632){
		specialToggle();
	}
});

function updateZoom(){
	$(".keyboard").css({
	'zoom': window.screen.width/1920
	});
	$(".header").css({
	'zoom': window.screen.width/1920
	});
}


function process(key){
	if(key==70 || key==72){ //prev & next
		stop(bgmusic[currentbg].file);
		if($("#playbutt").parent().hasClass("special_toggle")==true){
			$("#playbutt").parent().removeClass("special_toggle");
			playbutt.html("&#9654;");
		}
		changeMusic(key);
		if(key==70){ //prev
			key = $("#prev").parent();
			key.toggleClass("special_toggle");
			setTimeout(function(){
				key.removeClass("special_toggle");
			}, 100);
		}
		if(key==72){ //next
			key=$("#next").parent();
			key.toggleClass("special_toggle");
			setTimeout(function(){
				key.removeClass("special_toggle");
			}, 100);
		} 
	} else if (key==71) { //play/stop
		specialToggle();	
	} else if (key==84){ //T (loop)
		glow(84);
		loop = toggleOption(loop, "#loop");
	}else if (key==89){ //Y (effects)
		glow(89);
		effects = toggleOption(effects, "#effects");
	}else{
		for(i=0;i<combos.length;i++){
			if(key == combos[i].key){
				play(combos[i].file);
				glow(key);
				scritte(combos[i].desc);
				break;
			}
		}
	}
}

function changeMusic(key){
	if(key==70){
		if(currentbg==0) currentbg=bgmusic.length-1;
		else currentbg--;
	}
	if(key==72){
		if(currentbg==bgmusic.length-1) currentbg=0;
		else currentbg++;
	}
	combos[combos.length-1].file=bgmusic[currentbg].file;
}

function specialToggle(){
	playbutt=$("#playbutt");
	playbutt.parent().toggleClass("special_toggle");
	if(playbutt.html().charCodeAt()==9654){
		playbutt.html("&#9632;"); //9632 = stop
		var curr = document.getElementById(bgmusic[currentbg].file);
		curr.volume=0.5;
		play(bgmusic[currentbg].file);
		curr.addEventListener('ended', function(){
			if(loop){
				play(bgmusic[currentbg].file)
			} else {
				stop(bgmusic[currentbg].file);
	    		playbutt.html("&#9654;");
	    		playbutt.parent().removeClass("special_toggle");
			}
		});
	}
	else{
		(playbutt.html("&#9654;"));
		stop(bgmusic[currentbg].file);
	}
}

function toggleOption(value, id){
	if(value){
		$(id).removeClass("option").addClass("out");
		return false
	}
	else {
		$(id).addClass("option");
		return true;
	}
}

function play(id){
	document.getElementById(id).currentTime=0;
	$("#"+id).trigger("play");
}

function stop(id){
	audio = document.getElementById(id);
	audio.pause();
	audio.currentTime=0;
}

function glow(keypr){
	if(keypr == 32) key = $("#spacebar");
	else{
		keychar = String.fromCharCode(keypr);
		key = $('.letter').filter(function(){
			return $(this).text() === keychar;
		}).parent()
	};
	key.toggleClass("clicked");
	setTimeout(function(){
		key.removeClass("clicked");
	}, 100);
}

function scritte(desc){
	if(effects){
		words = desc.split(" ");
		for(i=0;i<words.length;i++){
			var scritta = document.createElement("p");
			numero=(Math.random()*100 + 150).toFixed();
			scritta.setAttribute('class', 'scritta'+numero);
			var t = document.createTextNode(words[i]);
			scritta.appendChild(t);
			document.body.appendChild(scritta);

			size = ((Math.random()*100+50)).toFixed();
			posx = (Math.random() * ($(window).width()).toFixed());
			posy = (Math.random() * ($(window).height()).toFixed());


	    	$(".scritta"+numero).css({
	    		'position': 'absolute',
	            'font-size': size+'px'
	        });


			width = $(".scritta"+numero).outerWidth();
			height = $(".scritta"+numero).outerHeight();

			while(posx+width>=$(window).width() || posy+height>=$(window).height()){
				posx -= 10;
				posy -= 10;
			}

			$(".scritta"+numero).css({
				'position': 'absolute',
	            'left':posx+'px',
	            'top':posy+'px',
	            'font-size': size+'px',
	            'color': '#D83712',
	            'margin': '0',
	            'padding': '0',
	        });

	    	$(".scritta"+numero).fadeIn(Math.floor(Math.random()*1000)).delay(2000).fadeOut(500, function(){
				
				$(this).remove()
					
			});
		}
	}
}
