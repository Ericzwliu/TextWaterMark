var WaterMark = function( id, dependency ) {

	var DefaultID = 'wm_0001';
	var jn = null;
	// WaterMark args
	var Mark = { 
		id			: null,
		width 		: -1,
		height 		: -1,
		text 		: '',
		rotate		: 0
	};

	var Doms = {
		object 		: null,
		dependency 	: null
	};

	( id ? ( id === null ? ( Mark.id = DefaultID ) : ( Mark.id = 'wm_' + id ) ) : Mark.id = DefaultID );

	( dependency ? ( dependency === null ? ( Doms.dependency = document.body ) : ( typeof( dependency ) === "string" ? Doms.dependency = '#'+dependency : Doms.dependency = document.body ) ) : Doms.dependency = document.body );
	( dependency ? ( dependency === null ? ( jn = document.body ) : ( typeof( dependency ) === "string" ? jn = dependency : jn = document.body ) ) : jn = document.body );
	
	Mark.width = $( Doms.dependency ).width();
	Mark.height = $( Doms.dependency ).height();

	Doms.object = document.createElement('div');
	Doms.object.id = Mark.id;
	Doms.object.className = 'WaterMark';
	Doms.object.setAttribute('name' , Mark.id);
	Doms.object.style.width = Mark.width;
	Doms.object.style.height = Mark.height;
	Doms.object.style.margin = '0 0 0 0';
	Doms.object.style.border = 'none';
	Doms.object.style.position = 'absolute';
	Doms.object.style.zIndex = -1; //

	var textDiv = document.createElement('div');
	textDiv.id = Mark.id + '_textDiv';
	// console.log(Doms.object.style.width );
	textDiv.style.width = Mark.width * 0.4;
	textDiv.style.height = Mark.height * 0.3;
	textDiv.style.position = 'absolute';
	textDiv.style.overflow = 'hidden';
	textDiv.style.textAlign = 'center';
	textDiv.style.lineHeight = textDiv.style.height;
	textDiv.style.zIndex = 9999;

	var textArea = document.createTextNode('Patrick.Huang');
	textArea.id = Mark.id + "_textArea";
	textArea.className = "WaterMarkText";
	// textArea.style.fontSize = "48pt";

	textDiv.appendChild(textArea);
	Doms.object.appendChild(textDiv);

	textDiv.style.left = ( ( Mark.width * 0.5 ) - ( $(textDiv).width() * 0.5 ) ) ;
	textDiv.style.top = ( ( Mark.height * 0.5 ) - ( $(textDiv).height() * 0.5 ) );

	if( jn == document.body ) {
		document.body.appendChild(Doms.object);
	} else {
		document.getElementById(jn).appendChild(Doms.object);
	}

	// console.log( 'Doms.dependency : ' , Doms.dependency );
	// console.log( 'getDoms : ' , Doms );
	// console.log( 'getDetail : ' , {
	// 	id : Mark.id,
	// 	width : Doms.object.style.width,
	// 	height : Doms.object.style.height,
	// 	text : Mark.text,
	// 	jn : jn
	// } );

	return {
		
		setSize : function ( w, h ) {

			( w && typeof( w ) === "number" ) && ( Mark.width = w ); //if w equals null , nothing to do
			( h && typeof( h ) === "number" ) && ( Mark.height = h ); //if h equals null , nothing to do
		},

		setText : function ( t ) {
			// console.log('typeof(t) : ' , typeof(t) );
			( t && typeof( t ) === "string" ) && ( Mark.text = t );
			( t && typeof( t ) === "number" ) && ( Mark.text = t.toString() );
			( t === null ) && ( Mark.text = '' );

			document.getElementById(Mark.id + "_textArea").style.text = Mark.text;
		},

		setRotate : function ( deg ) {

			// if( typeof(deg) !== 'number' ) {console.log('deg non-number');return;}

			( Math.abs(deg) > 360 ? ( deg = deg % 360 ) : deg ) ;
			( deg >= 0 ? 
				setTimeout(function(){
					( deg >= 270 ? ( deg = deg - 360 ) : deg );
					( deg >= 90 ? ( deg = deg - 180 ) : deg );
				},0)
				:
				setTimeout(function(){
					( Math.abs(deg) >= 270 ? ( deg = deg + 360 ) : deg );
					( Math.abs(deg) >= 90 ? ( deg = deg + 180 ) : deg );
				},0)
			);			

			Mark.rotate = deg;
			// console.log('Mark.rotate : ', Mark.rotate);

			document.getElementById(Mark.id + '_textDiv').style.webkitTransform = 'rotate('+Mark.rotate+'deg)';
			document.getElementById(Mark.id + '_textDiv').style.mozTransform = 'rotate('+Mark.rotate+'deg)';
			document.getElementById(Mark.id + '_textDiv').style.msTransform = 'rotate('+Mark.rotate+'deg)';
			document.getElementById(Mark.id + '_textDiv').style.oTransform = 'rotate('+Mark.rotate+'deg)';
			document.getElementById(Mark.id + '_textDiv').style.transform = 'rotate('+Mark.rotate+'deg)';

		},

		getID : function () {
			return Mark.id;
		},

		getSize : function () {
			return {
				width 	: Mark.width,
				height 	: Mark.height
			}
		},

		getText : function () {
			return Mark.text;
		},

		getDetail : function () {
			return {
				id : Mark.id,
				width : Mark.width,
				height : Mark.height,
				text : Mark.text,
				jn : jn
			};
		},

		getDoms : function () {
			return Doms;
		},

		show : function () {

		},

		hide : function () {
			
		}
	};

}