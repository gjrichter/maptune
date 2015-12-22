/**********************************************************************
OpenPuglia_Luoghi_della_Cultura

$Comment: maptune config file
$Source : OpenPuglia_Luoghi_della_Cultura.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2015/12/17 $
$Author: guenter richter $
$Id:OpenPuglia_Luoghi_della_Cultura.js 1 2015-12-17 10:30:35Z Guenter Richter $

$Log:OpenPuglia_Luoghi_della_Cultura.js,v $
**********************************************************************/

/** 
 * @fileoverview This file is a MapTune config file for Open Puglia 
 * @version 0.9
 */

	// define default marker style for layers
	var MapParam = {
		"all" :
			{ 
			"smallInfoClipDescription" : "500",
			"smallInfoKeepImage" : "true"
			},
		"default":
			{
			"thumbnailRoot"   : "resources/images/tn/",
			"markerImageRoot" : "resources/icons/map-icons-collection/numeric/orange",
			"markerImageType" : "png"
			}
		,
		"noItemText" : "<span style=\"color:#888\">lista vuota <br>"+
					   "aggiungi un layer via <a href=\"javascript:openMegaBox(null,'feed-dialog',MapParam.layerdialog.href,'add layer','auto',500,400)\"><span style=\"font-weight:bold;border:solid #ddd 1px;padding:2px;\">&nbsp;+ add&nbsp;</span></a><br><br>"+
					   "info <a href=\"javascript:openMegaBox(null,'feed-dialog','./about.html','about','auto',500,400)\"><span style=\"font-weight:bold;border:solid #ddd 1px;padding:2px;\">&nbsp;i&nbsp;</span></a></span>"
		,
		"layerdialog" :{"href":"Puglia_feeds.html"}
		,
		"layerbar" :{"href":"Puglia_feeds.html"}
		,
		"layertab" :{"href":"Puglia_feeds.html"}
		,
		"layers": []
		,
		"filter": {
		 "Archivio":"Archivio"
		,"Architettura fortificata":"Architettura fortificata"
		,"Area archeologica":"Area archeologica"
		,"Biblioteca":"Biblioteca"
		,"Chiesa o edificio di Culto":"Chiesa o edificio di Culto"
		,"Monumento":"Monumento"
		,"Monumento funerario":"Monumento funerario"
		,"Parco archeologico":"Parco archeologico"
		,"Villa o palazzo di interesse storico o artistico":"Villa o palazzo di interesse storico o artistico"
		,"Altro":"Altro"
		}

	};

	__init = function(){

		maptune.addFeedLayer('./data/collection.js',{
			type:'data',
			format:'json',
			name:'Collection',
			flag:'collapsed'});

		// './data/Luoghi_Puglia_Nominatim_Vers0.3.csv'
		// 'https://docs.google.com/spreadsheets/d/12Vx_dXVpQ4ErSPVWNt54bFCSPJK-dsAyIVvnpbh-Bv4/pub?single=true&gid=2&output=csv'

		maptune.addFeedLayer('./data/Luoghi_Puglia_Nominatim_Vers0.3.csv',{
			type:'csv',
			format:'csv',
			name:'Open Puglia - Luoghi di Cultura',
			title:'Open Puglia - Luoghi di Cultura',
			proxy:'true',
			parser: 
				{
				title: 'nome',
				lat:   'latitudine',
				lon:   'longitudine',
				image: 'foto',
				label: 'true'
				},
			layer: 
				{ 'name': 'Open Puglia - Luoghi di Cultura',
					'markerType' : 'categorical',
					'category'   : 'tipologia prevalente', 
					'categoryList': { 
						  'Chiesa o edificio di Culto':
								  { 'markerImage' : 'resources/icons/map-icons-collection/chapel.png',
									'smallImage' :  'resources/icons/default/default-small_violet.png'
								  },
						  'Parco archeologico':
								  { 'markerImage' : 'resources/icons/map-icons-collection/museum-archeological.png',
									'smallImage' :  'resources/icons/default/museum-archeological.png'
								  },
						  'Monumento funerario':
								  { 'markerImage' : 'resources/icons/map-icons-collection/modernmonument.png',
									'smallImage' :  'resources/icons/default/default-small_celeste.png'
								  },
						  'Biblioteca':
								  { 'markerImage' : 'resources/icons/map-icons-collection/book.png',
									'smallImage' :  'resources/icons/default/default-small_violet.png'
								  },
						  'Archivio':
								  { 'markerImage' : 'resources/icons/map-icons-collection/book.png',
									'smallImage' : 'resources/icons/default/default-small_violet.png'
								  },
						  'Architettura fortificata':
								  { 'markerImage' : 'resources/icons/map-icons-collection/citywalls.png',
									'smallImage' : 'resources/icons/default/default-small_green.png'
								  },
						  'Area archeologica':
								  { 'markerImage' : 'resources/icons/map-icons-collection/museum-archeological.png',
									'smallImage' : 'resources/icons/default/default-small_orange.png'
								  },
						  'Museo, galleria non a scopo di lucro e\\/o raccolta':
								  { 'markerImage' : 'resources/icons/map-icons-collection/artgallery.png',
									'smallImage' : 'resources/icons/default/default-small_turque.png'
								  },
						  'Villa o palazzo di interesse storico o artistico':
								  { 'markerImage' : 'resources/icons/map-icons-collection/villa.png',
									'smallImage' : 'resources/icons/default/default-small_green.png'
								  },
						  'Monumento':
								  { 'markerImage' : 'resources/icons/map-icons-collection/temple-2.png',
									'smallImage' : 'resources/icons/default/default-small_turque.png'
								  },
						  'Altro':
								  { 'markerImage' : 'resources/icons/map-icons-collection/departmentstore.png',
									'smallImage' : 'resources/icons/default/default-small_red.png'
								  }
						  },
				  'markerImageType' : 'png',
				  'markerCluster' : 'false',
				  'description': '<div id="infodiv" style="margin-top:-20px;margin-bottom:-10px;padding-bottom:10px;color:#444;">Layer collegato (offline) a <a href="https://docs.google.com/spreadsheets/d/12Vx_dXVpQ4ErSPVWNt54bFCSPJK-dsAyIVvnpbh-Bv4/edit?usp=sharing" target="_blank"><b>https://docs.google.com/spreadsheets/d/12Vx_dXVpQ4ErSPVWNt54bFCSPJK-dsAyIVvnpbh-Bv4/edit?usp=sharing</b></a><br>posizioni da latitudine/longitudine</div>',
				},
			flag:'open',
			maxLargeIcons: 3});
	};

	maptune.onMapReady = function(){
		maptune.setView([41.12967564007184,16.869817972183228],16);
		setTimeout("__init()",1000);
	};


	/*
	 * overwrite standard info layout
	 * ------------------------------
	 * maptune.jsapi.onOpenInfoWindow is called everytime a info bubble is to be opened,
	 * or the info is diplayed in the sidebar
	 *
	 * @param szInfo the actual info content, must be returned if not return of new content
	 * @param info the info structiìure of the item
	 * @param szContext "map" or "sidebar", identifies the context of the 'onOpenInfoWindow' request
	 */
	maptune.jsapi.onOpenInfoWindow = function(szInfo,info,szContext) {

		/* default onOpenInfoWindow */
		if ( 1 ){
			var szZoomTo  = "<div style='float:right;margin-top:-0.3em;'>";
				szZoomTo += maptune.jsapi.getZoomLink(info.geometry.coordinates[1]+","+info.geometry.coordinates[0]);
				szZoomTo += "</div>";
			szInfo += szZoomTo;
		}	

		return szInfo;
	};
	/*
	 * overwrite standard/predefined icon
	 * ------------------------------
	 * maptune.jsapi.onGetIcon is called everytime an icon is placed on the map
	 *
	 * @param icon the actual icon object
	 * @param marker the actual marker object
	 * @param i the marker index
	 * @param flag icon type flag, actually only "normal" or "small" 
	 */
	maptune.jsapi.onGetIcon = function(icon,marker,i,flag) {

		// enter user code here to change item icon
		// --->
		if ( marker.properties.servizi_disabili.match(/JOB/i) ){
			icon.image = (flag && flag=="small")?"resources/icons/default/default-small_green.png":"resources/icons/default/default_middle_green.png";
			return icon;
		}

		return null;
	};

	// --------------------------------------
	// EOF
	// --------------------------------------

