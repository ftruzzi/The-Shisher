var alt = false, currentbg = 0, altPressed = false, effects = false, loop = true;
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor), isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1; isSafari = navigator.vendor.indexOf("Apple")==0 && /\sSafari\//.test(navigator.userAgent), isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;

var bgmusic = [
	{file: "bennyhill"},
	{file: "cancan"},
	{file: "flag"}
];

var combos = [
	{key: 32, file: "SHISH", desc: "SHISH!"}, //spacebar
	{key: 81, file: "DEDEDEDE", desc: "DE DE DE DE", alt_file: "english", alt_desc: "ENGLISH MOTHERFUCKER"}, //Q
	{key: 87, file: "DEDEDEDE2", desc: "DE DE DE DE DE DE", alt_file: "succhi", alt_desc: "TU SUCCHI CAZZI?"}, //W
	{key: 69, file: "ehm", desc: "EHMHMHMH", alt_file: "soffi", alt_desc: "CI SOFFI DENTRO?"}, //E
	{key: 82, file: "bicoz", desc: "BICOZ"}, //R
	{key: 88, file: "GENIUS", desc: "GENIUS!"}, //X
	{key: 65, file: "eighty", desc: "EIGHTY UUUUH", alt_file: "fox"}, //A
	{key: 83, file: "mistraccio", desc: "FEEHEHEH MISTRACCIOH", alt_file: "nein"}, //S
	{key: 68, file: "lanch", desc: "LANCHHEEH"}, //D
	{key: 79, file:"speaking", desc: "TO SPEAKING ABBOUZHE"}, //O
	{key: 90, file: "mader", desc: "MAI MADER", alt_file: "mona"}, //Z
	{key: 67, file: "CRAI", desc: "CRAI"}, //C
	{key: 85, file: "destroyed", desc: "DESTROYD"}, //U
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
	if(isAndroid) window.alert("Please rotate your device to landscape (horizontal) mode.");
	updateZoom();
	//create audio elements in HTML file
	for(i=0;i<combos.length-1;i++){
		var audio = document.createElement("audio");
		audio.setAttribute('id', combos[i].file);
		audio.setAttribute('src', "audio/"+combos[i].file+".mp3");
		document.body.appendChild(audio);
	}
	for(i=0;i<combos.length-1;i++){
		if(combos[i].alt_file!=undefined){
			var audio = document.createElement("audio");
			audio.setAttribute('id', combos[i].alt_file);
			audio.setAttribute('src', "audio/"+combos[i].alt_file+".mp3");
			document.body.appendChild(audio);
		}
	}
	for(i=0;i<bgmusic.length;i++){
		var audio = document.createElement("audio");
		audio.setAttribute('id', bgmusic[i].file);
		audio.setAttribute('src', "audio/"+bgmusic[i].file+".mp3");
		document.body.appendChild(audio);
	}
	if(isChrome) process(71);
	if(!isChrome && !isSafari){
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

$(document).keyup(function(e){
	
	if(e.which==18 && alt && altPressed){
		e.preventDefault();
		altKeys();
		$("#recplay").addClass("hidden");
		altPressed = false;
	}
});

$(".key").click(function(){
	var cont = true;
	letter = $(this).find(".letter").html();

	switch(letter){
		case "SHISH!":
			keycode = 32;
			break;

		case "ALT":
			if(altPressed){
				altKeys();
				altPressed=false;
				cont = false;
			}
			keycode = 18;
			break;

		default:
			keycode = letter.charCodeAt();
			break;
	}
	if(cont) process(keycode);
});

function altKeys(){
	$(".alt").toggleClass("special_toggle");
	$(".message").toggleClass("hidden");
	$(".message2").toggleClass("hidden");

	if(!alt){
		$(".key:not(:has(.alt_message))").find(".letter").addClass("out");
		$(".letter").not(".out").not(".option").addClass("red");

		$("#loop").removeClass("option").addClass("out");
		$("#effects").removeClass("option").addClass("out");

		$("#prev").html("F").removeClass("special").removeClass("red");
		
		$("#playbutt").html("G").removeClass("special").removeClass("red").parent().removeClass("special_toggle");

		$("#next").html("H").removeClass("special").removeClass("red");

		$(".alt").find(".letter").addClass("red");

		alt = true;
	} else {
		$(".key:not(:has(.alt_message))").find(".letter").removeClass("out");
		$(".letter").not(".out").not(".option").not("#effects").removeClass("red");

		$("#prev").html("&#8678;").addClass("special").addClass("red");

		if(document.getElementById(bgmusic[currentbg].file).currentTime!=0){
			$("#playbutt").html("&#9632;").addClass("special").addClass("red").parent().addClass("special_toggle");
		} else $("#playbutt").html("&#9654;").addClass("special").addClass("red");

		$("#next").html("&#8680;").addClass("special").addClass("red");

		if(effects) $("#effects").addClass("option");
		else $("#effects").addClass("out");

		if(loop) $("#loop").addClass("option");
		else $("#loop").addClass("out");

		$(".alt").find(".letter").removeClass("red");

		alt = false;
	}
}

function changeMusic(key){
	if(key==70 && !altPressed){
		if(currentbg==0) currentbg=bgmusic.length-1;
		else currentbg--;
	}
	if(key==72 && !altPressed){
		if(currentbg==bgmusic.length-1) currentbg=0;
		else currentbg++;
	}
	combos[combos.length-1].file=bgmusic[currentbg].file;
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

function play(id){
	document.getElementById(id).currentTime=0;
	$("#"+id).trigger("play");
}

function playToggle(){
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

function process(key){
	if(!altPressed){
		switch(key){
			case 8678:
			case 70: //prev-recplay
				stop(bgmusic[currentbg].file);
				if($("#playbutt").parent().hasClass("special_toggle")){
					$("#playbutt").parent().removeClass("special_toggle");
					playbutt.html("&#9654;");
				}
				changeMusic(70);
				playToggle();

				key = $("#prev").parent();
					key.toggleClass("special_toggle");
					setTimeout(function(){
						key.removeClass("special_toggle");
					}, 100);
			
				break;

			case 8680:
			case 72: //next
				stop(bgmusic[currentbg].file);
				if($("#playbutt").parent().hasClass("special_toggle")){
					$("#playbutt").parent().removeClass("special_toggle");
					playbutt.html("&#9654;");
				}
				changeMusic(72);
				playToggle();

				key=$("#next").parent();
				key.toggleClass("special_toggle");
				setTimeout(function(){
					key.removeClass("special_toggle");
				}, 100);
				
				break;

			case 9654: //play
			case 9632: //stop
			case 71: //play-stop
				playToggle();
				break;

			case 84: //T (loop)
				glow(key);
				loop = toggleOption(loop, "#loop");
				break;

			case 89: //Y (effects)
				glow(key);
				effects = toggleOption(effects, "#effects");
				break;

			case 18: //ALT
				altKeys();
				altPressed = true;
				break;

			default:
				for(i=0;i<combos.length;i++){
					if(key == combos[i].key){
						glow(key);
						play(combos[i].file);
						scritte(combos[i].desc);
						break;
					}
				}
		}
	} else {
		switch(key){
			case 8678:
			case 70: //prev-recplay
			case 8680:
			case 72: //next
			case 9654: //play
			case 9632: //stop
			case 71: //play-stop
			case 84:
			case 89:
				break;

			default:
				for(i=0;i<combos.length;i++){
					if(key == combos[i].key && combos[i].alt_file!=undefined){
						glow(key);
						play(combos[i].alt_file);
						scritte(combos[i].alt_desc);
					}
				}
		}
	}
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

function stop(id){
	audio = document.getElementById(id);
	audio.pause();
	audio.currentTime=0;
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

function updateZoom(){
	//ugly css hacks here, will improve the keyboard code
	$(".keyboard").css({
	'zoom': window.screen.width/1920
	});
	$(".header").css({
	'zoom': window.screen.width/1920
	});
}
