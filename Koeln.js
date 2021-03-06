	_TRACE("BasilicataEventi.js ------->");
	// define default marker style for layers
	var MapParam = {
		"all" :
			{ 
			"smallInfoClipDescription" : "500",
			"smallInfoKeepImage" : "true"
			},
		"default":
			{
			"thumbnailRoot" : "resources/images/tn/",
			"markerImageRoot" : "resources/icons/map-icons-collection/numeric/orange",
			"markerImageType" : "png"
			}
		,
		"noItemText" : "<span style=\"color:#888\">lista vuota <br>"+
					   "aggiungi un layer via <a href='javascript:$(\"#add-pill\").click()'><span style=\"font-weight:bold;border:solid #ddd 1px;padding:2px;\">&nbsp;+ add&nbsp;</span></a><br><br>"
		,
		"layerdialog" :{"href":"All_layer_sidebar.html"}
		,
		"layerbar" :{"href":"BasilicataEventi_topbar.html"}
		,
		"layertab" :{"href":"All_layer_sidebar.html"}
		,
		"layer" :{"href":"BasilicataEventi_layer.html"}
		,
		"layers": []

	};

	__init = function(){

		maptune.addFeedLayer('./data/collection.js',{
			type:'data',
			format:'json',
			name:'Collection',
			flag:'collapsed'
			});

		maptune.addFeedLayer('http://www.stadt-koeln.de/externe-dienste/open-data/events-od.php',{
			type:'Koeln_Events',
			format:'json',
			name:'Koeln Events',
			flag:'zoomto'
			});
		maptune.addFeedLayer('http://www.stadt-koeln.de/externe-dienste/open-data/parking.php',{
			type:'Koeln_Parken',
			format:'json',
			name:'Koeln Parken',
			flag:'zoomto'
			});
	}

	setTimeout("__init()",1000);


	/*
	 * overwrite standard info layout
	 * ------------------------------
	 * maptune.jsapi.onOpenInfoWindow is called everytime a info bubble is to be opened,
	 * or the info is diplayed in the sidebar
	 *
	 * @param szInfo the actual info content, must be returned if not return of new content
	 * @param info the info structižure of the item
	 * @param szContext "map" or "sidebar", identifies the context of the 'onOpenInfoWindow' request
	 */
	maptune.jsapi.onOpenInfoWindow = function(szInfo,info,szContext) {

		if ( szContext == "map" ){
			if ( 1 ){
				var szZoomTo  = "<span class='InfoWindowFooter' style='float:right;vertical-align:middle;margin-right:-1em'>";
					szZoomTo += maptune.jsapi.getZoomLink(info.geometry.coordinates[1]+","+info.geometry.coordinates[0]);
					szZoomTo += "</span>";
				szInfo += szZoomTo;
			}	
			return szInfo;
		}

		if ( info.parent.source == "Eventi Condivisi" ){
			szInfo = "";
			szInfo += "<div class='InfoWindowBody' style='overflow:hidden'><table><tr><td>";

			// make nice date and time 
			// -----------------------
			var initDate = "";
			var initTime = "";
			var endDate = "";
			var endTime = "";
			if ( info.properties['Data inizio'] && info.properties['Data inizio'].length ){
				var dateA = info.properties['Data inizio'].split(' ')[0].split('\/');
				var timeA = info.properties['Data inizio'].split(' ')[1].split('\.');
				var d = new Date(dateA[2],dateA[1]-1,dateA[0],timeA[0],timeA[1]);
				var initDate = dateA[0]+'/'+dateA[1]+'/'+dateA[2];
				var initTime = d.toLocaleTimeString().substr(0,5);
			}
			if ( info.properties['Data fine'] && info.properties['Data fine'].length ){
				var dateA = info.properties['Data fine'].split(' ')[0].split('\/');
				var timeA = info.properties['Data fine'].split(' ')[1].split('\.');
				var d = new Date(dateA[2],dateA[1]-1,dateA[0],timeA[0],timeA[1]);
				var endDate = dateA[0]+'/'+dateA[1]+'/'+dateA[2];
				var endTime = d.toLocaleTimeString().substr(0,5);
			}
			if ( initDate == endDate){
				szInfo += "<div><span style='font-weight:bold'>" + initDate + "</span> " + initTime + " - " + endTime + "</div>";
			}else{
				szInfo += "<div><span style='font-weight:bold'>" + initDate + " - " + endDate + "</span>&nbsp; " + initTime + " - " + endTime + "</div>";
			}
			// -----------------------

			if ( info.properties['Luogo'] && info.properties['Luogo'].length ){
				szInfo += "<div style='margin-top:0.2em;font-weight:normal'>" + info.properties['Luogo'] + "</div>";
			}
			szInfo += "<div style='float:left,margin-right:0.5em;'>";
				if ( info.properties.Link_immagine && info.properties.Link_immagine.length ){
					szInfo += "<img src='"+info.properties.Link_immagine+"' height='200px'>";
				}
			szInfo += "</div>";

			szInfo += "<div style='float:left;'>";
			if ( info.properties.Organizzatore && info.properties.Organizzatore.length ){
				szInfo += "<div style='margin-top:0.5em;'>organizzato da: <br><span style='font-weight:normal'>" + info.properties.Organizzatore + "</span></div>";
			}
			if ( info.properties['Link'] && info.properties['Link'].length ){
				var szLink = info.properties['Link'];
				szLink = (szLink.length <= 30)?szLink:(szLink.substr(0,29) + " ...");
				szInfo += "<a href='"+ info.properties['Link'] +"' target='_blank'>" + szLink + "</a><br>";
			}
			szInfo += "</div>";

			szInfo += "<div style='clear:both'></div>";

			if ( info.properties['Note'] && info.properties['Note'].length ){
				szInfo += "<div style='margin-top:1em;font-weight:normal'>" + info.properties['Note'] + "</div>";
			}

			if ( info.properties['Pagamento'] && info.properties['Pagamento'].length ){
				szInfo += "<div style='margin-top:0.5em;font-weight:normal'>a pagamento: " + info.properties['Pagamento'] + "</div>";
			}

			szInfo += "</div>";

			szInfo += "</td></tr></table></div>";

		}

		/* default onOpenInfoWindow */
		if ( 1 ){
			var szZoomTo  = "<div style='float:right;margin-top:-0.3em;'>";
				szZoomTo += maptune.jsapi.getZoomLink(info.geometry.coordinates[1]+","+info.geometry.coordinates[0]);
				szZoomTo += "</div>";
			szInfo += szZoomTo;
		}	

		return szInfo;
	};

	// --------------------------------------
	// EOF
	// --------------------------------------

	_TRACE("BasilicataEventi.js ----- EOF");
