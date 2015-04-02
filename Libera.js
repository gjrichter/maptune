	// define default marker style for layers
	var MapParam = {
		"default":
			{
			"thumbnailRoot" : "resources/images/tn/",
			"markerImageRoot" : "resources/icons/map-icons-collection/numeric/orange",
			"markerImageType" : "png"
			}
		,
		"noItemText" : "<span style=\"color:#888\">lista vuota <br>"+
					   "aggiungi un layer via <a href=\"javascript:openMegaBox(null,'feed-dialog',MapParam.layerdialog.href,'add layer','auto',500,400)\"><span style=\"font-weight:bold;border:solid #ddd 1px;padding:2px;\">&nbsp;+ add&nbsp;</span></a><br><br>"+
					   "info <a href=\"javascript:openMegaBox(null,'feed-dialog','./about.html','about','auto',500,400)\"><span style=\"font-weight:bold;border:solid #ddd 1px;padding:2px;\">&nbsp;i&nbsp;</span></a></span>"
		,
		"layerdialog" :{"href":"all_feeds.html"}
		,
		"layerbar" :{"href":"Deputati_topbar.html"}
		,
		"layertab" :{"href":"all_feeds.html"}
		,
		"layers": []
	};

	__init = function(){
		maptune.addFeedLayer('./data/collection.js',{
			type:'data',
			format:'json',
			name:'Collection',
			flag:'collapsed'});

		maptune.addFeedLayer('./data/Libera-Piemonte-Geobeni-Gennaio-2013-draft_1.csv',{
			type:'csv',
			format:'csv',
			name:'Libera-Piemonte',
			title:'Libera-Piemonte',
			proxy: 'true',
			parser: 
				{
				info: 'Id|Storia originale|Oggi originale|Situazione attuale|Ubicazione|Percorso di assegnazione|Data e motivo del sequestro e della confisca|Descrizione del bene|Sottotipologia|Tipologia|Profilo intestatario|Email|Sito web|CAP|Indirizzo|URL Dettagli|URL Immagine ',
				title: 'CAP',
				lat:   'Lat',
				lon:   'Lng',
				image: 'URL Immagine',
				label: 'false'
				},
			layer: 
				{ "name": "Libera-Piemonte",
				  "markerType" : "custom",
				  "markerImage" : "resources/icons/map-icons-collection/libera.png",
				  "smallImage" : "resources/icons/default/default-small_orange.png",
				  "markerImageType" : "png",
				  "description": '<div id="infodiv" style="margin-top:-10px;color:#aaa;">Elenco Beni Confiscati tratto dal GeoBlog di Libera Piemonte; csv preparato da Cesare Gerbinio</a></div>'
				},

			flag:'zoomto'});
	}

	setTimeout("__init()",2000);

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
		console.log(info);
		if ( info.parent.source == "Libera-Piemonte" ){

		if ( szContext == "map" ){
			if ( !info.parent.fShowInfoInList ){
				szInfo = "";
				if ( info.properties["Tipologia"] ){
					szInfo += "<div style='margin-top:0.5em;'><span style='font-weight:normal'>" + info.properties["Tipologia"] + "</span></div>";
				}
				if ( info.properties["Sottotipologia"] ){
					szInfo += "<div style='margin-top:0.5em;'><span style='font-weight:normal'>" + info.properties["Sottotipologia"] + "</span></div>";
				}
				if ( info.properties["Descrizione del bene"] ){
					szInfo += "<div style='margin-top:0.5em;'><b>Descrizione del bene</b>: <br><span style='font-weight:normal'>" + info.properties["Descrizione del bene"] + "</span></div>";
				}
				if ( info.properties["Data e motivo del sequestro e della confisca"] ){
					szInfo += "<div style='margin-top:0.5em;'><b>Data e motivo del sequestro e della confisca</b>: <br><span style='font-weight:normal'>" + info.properties["Data e motivo del sequestro e della confisca"] + "</span></div>";
				}
				if ( info.properties["Profilo intestatario"] ){
					szInfo += "<div style='margin-top:0.5em;'><b>Profilo intestatario</b>: <br><span style='font-weight:normal'>" + info.properties["Profilo intestatario"] + "</span></div>";
				}
				if ( info.properties["URL Immagine"] ){
					szInfo += "<div style='margin-top:0.5em;'><img src='"+info.properties["URL Immagine"]+"'></div>";
				}
				var szZoomTo  = "<span class='InfoWindowFooter' style='float:right;vertical-align:middle;'>";
					szZoomTo += maptune.jsapi.getZoomLink(info.geometry.coordinates[1]+","+info.geometry.coordinates[0]);
					szZoomTo += "</span>";
				szInfo += szZoomTo;
			}else{
				szInfo = "";
				if ( info.properties["Tipologia"] ){
					szInfo += "<div style='margin-top:0.5em;'><span style='font-weight:normal'>" + info.properties["Tipologia"] + "</span></div>";
				}
				if ( info.properties["Descrizione del bene"] ){
					szInfo += "<div style='margin-top:0.5em;'><b>Descrizione del bene</b>: <br><span style='font-weight:normal'>" + info.properties["Descrizione del bene"] + "</span></div>";
				}
				if ( info.properties["Data e motivo del sequestro e della confisca"] ){
					szInfo += "<div style='margin-top:0.5em;'><b>Data e motivo del sequestro e della confisca</b>: <br><span style='font-weight:normal'>" + info.properties["Data e motivo del sequestro e della confisca"] + "</span></div>";
				}
			}
			return szInfo;
		}
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

	_TRACE("Libera.js ----- EOF");
