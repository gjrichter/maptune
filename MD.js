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
		"layerdialog" :{"href":"Deputati_feeds.html"}
		,
		"layerbar" :{"href":"Deputati_topbar.html"}
		,
		"layertab" :{"href":"MD_layer_sidebar.html"}
		,
		"layers": []
	};

	__init = function(){
		maptune.addFeedLayer('./data/collection.js',{
			type:'data',
			format:'json',
			name:'Collection',
			flag:'collapsed'});

		maptune.addFeedLayer('./data/MUSEIDIGITALI.csv',{
			type:'csv',
			format:'csv',
			name:'Musei Digitali',
			title:'Musei Digitali',
			proxy: 'true',
			parser: 
				{
				info: 'Luogo|Sito_Web|Email|Twitter|Link_immagine ',
				title: 'Museo',
				lat:   'lat',
				lon:   'lng',
				image: 'Link_immagine ',
				label: 'false'
				},
			layer: 
				{ "name": "Musei Digitali",
				  "markerType" : "custom",
				  "markerImage" : "resources/icons/map-icons-collection/museum-historical.png",
				  "smallImage" : "resources/icons/default/default-small_berry.png",
				  "markerImageType" : "png",
				  "description": '<div id="infodiv" style="margin-top:-10px;color:#aaa;">Elenco #MUSEIDIGITALI collegato a <a href="http://www.piersoft.it/?p=269" target="_blank">questo POST</a> da <a href="http://www.twitter.com/piersoft" target="_blank">@Piersoft</a> | <a href="https://docs.google.com/spreadsheets/d/1bJghmIgxv9ayCV7K4iEAcHkUf6oEQ5eOBx9vOPZMJ8s/edit?usp=sharing" target="_blank">Elenco</a> | <a href="https://docs.google.com/spreadsheet/pub?key=0AoZ9HGSxyqvydDNiX2RlNkhfU01TbXBZRXdxcDVLRVE&output=html" target="_blank">DashBoard</a> | Pin CC BY-SA <a href="http://mapicons.nicolasmollet.com/">Mapicons</a></div>'
				},

			flag:'zoomto'});
	}

	setTimeout("__init()",1000);
