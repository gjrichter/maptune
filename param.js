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
		"layerdialog" :{"href":"feeds.html"}
		,
		"layerbar" :{"href":"Marche_topbar.html"}
		,
		"layertab" :{"href":"Marche_sidebar.html"}
		,
		"layers": [
			{ "name": "Ricettivita",
			  "markerType":"categorical",
			  "category"  :"TIPOLOGIA", 
			  "categoryList" : { 
					  "Affittacamere"		: { "markerImage" : "resources/icons/map-icons-collection/lodging_0star.png",
												"smallImage" : "resources/icons/default/default-small_softgreen.png"
											  },
					  "Albergo"				: { "markerImage" : "resources/icons/map-icons-collection/hotel_0star.png",
												"smallImage" : "resources/icons/default/default-small_green.png"
											  },
					  "Bed & Breakfast"		: { "markerImage" : "resources/icons/map-icons-collection/bed_breakfast1-2.png",
												"smallImage" : "resources/icons/default/default-small_darkgreen.png"
											  },
					  "Agriturismo"			: { "markerImage" : "resources/icons/map-icons-collection/hostel_0star.png",
												"smallImage" : "resources/icons/default/default-small_darkgreen.png"
											  },
					  "Casa Vacanza"		: { "markerImage" : "resources/icons/map-icons-collection/daycare_big.png",
												"smallImage" : "resources/icons/default/default-small_darkgreen.png"
											  },
					  "Casa per Ferie"		: { "markerImage" : "resources/icons/map-icons-collection/daycare_big.png",
												"smallImage" : "resources/icons/default/default-small_darkgreen.png"
											  },
					  "Aree Ricettive"		: { "markerImage" : "resources/icons/map-icons-collection/campingtents.png",
												"smallImage" : "resources/icons/default/default-small_darkgreen.png"
											  },
					  "Turismo rurale"		: { "markerImage" : "resources/icons/map-icons-collection/hostel_0star.png",
												"smallImage" : "resources/icons/default/default-small_darkgreen.png"
											  },
					  "ostello per la Gioventò"		: { "markerImage" : "resources/icons/map-icons-collection/daycare_big.png",
												"smallImage" : "resources/icons/default/default-small_darkgreen.png"
											  }
				  },
			  "smallImage" : "resources/icons/default/default-small_red.png",
			  "iconType" : "normal",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "Culturale",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/map-icons-collection/monument.png",
			  "smallImage" : "resources/icons/default/default-small_blue.png",
			  "iconType" : "small",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "Naturale",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/map-icons-collection/monument.png",
			  "smallImage" : "resources/icons/default/default-small_green.png",
			  "iconType" : "small",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "Itinerario Arte e Storia",
			  "markerType" : "numeric",
			  "markerImageRoot" : "resources/icons/map-icons-collection/numeric/orange",
			  "markerImageType" : "png"
			},
			{ "name": "Itinerario Giardini tematici",
			  "markerType" : "numeric",
			  "markerImageRoot" : "resources/icons/map-icons-collection/numeric/orange",
			  "markerImageType" : "png"
			},
			{ "name": "Luoghi di diporto",
			  "initListState" : "expanded|showinfo",
			  "markerType" : "numeric",
			  "markerImageRoot" : "resources/icons/map-icons-collection/numeric/red",
			  "markerImageType" : "png"
			},
			{ "name": "CHIESE RUPESTRI DI Marche",
			  "initListState" : "expanded|showinfo",
			},
			{ "name": "Recent Earthquakes in Italy",
			  "markerType" : "numeric",
			  "markerImageRoot" : "resources/icons/map-icons-collection/numeric/red",
			  "markerImageType" : "png",
			  "initListState" : "noinfo",

			  "markerSizeRule": {
				  "source": "name",
					// regex to get the size value
					// get the float after " Magnitude(xx) "
					// sample source: 2012/05/30, 14:15:56 UTC  -  Magnitude(Ml) 3.00  -  Pianura padana emiliana
				  "regex" : "/Magnitude\\([a-zA-Z]{2}\\) ?(\\b[0-9]+\\.([0-9]+\\b)?|\\.[0-9]+\\b)?/i",
				  "matchIndex" : 1,
				  "normalSizeValue" : 4
			      }
			},
			{ "name": "INGV -> CNT -> Last locations",
			  "markerType" : "numeric",
			  "markerImageRoot" : "resources/icons/map-icons-collection/numeric/red",
			  "markerImageType" : "png",
			  "initListState" : "noinfo",

			  "markerSizeRule": {
				  "source": "name",
					// regex to get the size value
					// get the float after " Magnitude(xx) "
					// sample source: 2012/05/30, 14:15:56 UTC  -  Magnitude(Ml) 3.00  -  Pianura padana emiliana
				  "regex" : "/Magnitude\\([a-zA-Z]{2}\\) ?(\\b[0-9]+\\.?([0-9]+\\b)?|\\.[0-9]+\\b)?/i",
				  "matchIndex" : 1,
				  "normalSizeValue" : 4
			      }
			},
			{ "name": "USGS M 5+ Earthquakes",
			  "markerType" : "numeric",
			  "markerImageRoot" : "resources/icons/map-icons-collection/numeric/orange",
			  "markerImageType" : "png",
			  "initListState" : "noinfo",

			  "markerSizeRule": {
				  "source": "name",
					// regex to get the size value
					// get the float after " Magnitude(xx) "
					// sample source: 2012/05/30, 14:15:56 UTC  -  Magnitude(Ml) 3.00  -  Pianura padana emiliana
				  "regex" : "/M ?(\\b[0-9]+\\.([0-9]+\\b)?|\\.[0-9]+\\b)?/i",
				  "matchIndex" : 1,
				  "normalSizeValue" : 5
			      }
			},
			{ "name": "evento",
			  "markerType" : "numeric",
			  "markerImageRoot" : "resources/icons/map-icons-collection/numeric/orange",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "AccessPoint",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/wifi.png",
			  "smallImage" : "resources/icons/default/kml/default-small.png",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "AgenziaTuristica",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/travel_agency.png",
			  "smallImage" : "resources/icons/google/petrol-circle.png",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "Mercati storici",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/map-icons-collection/farmstand.png",
			  "smallImage" : "resources/icons/default/default-small_berry.png",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "Erogazione Metano",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/map-icons-collection/metano.png",
			  "smallImage" : "resources/icons/default/default-small_turque.png",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "Ostelli della Giov.",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/map-icons-collection/youthhostel.png",
			  "smallImage" : "resources/icons/default/default-small_darkgreen.png",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "Fattorie didattiche",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/map-icons-collection/hostel_0star.png",
			  "smallImage" : "resources/icons/default/default-small_green.png",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "Negozi e Locali Storici",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/map-icons-collection/departmentstore.png",
			  "smallImage" : "resources/icons/default/default-small_berry.png",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "Beni culturali e architettonici",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/map-icons-collection/monument.png",
			  "smallImage" : "resources/icons/default/default-small_blue.png",
			  "iconType" : "small",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			},
			{ "name": "Beni ambientali",
			  "markerType" : "custom",
			  "markerImage" : "resources/icons/map-icons-collection/habitat.png",
			  "smallImage" : "resources/icons/default/default-small_green.png",
			  "iconType" : "small",
			  "markerImageType" : "png",
			  "initListState" : "expanded"
			}
		]
	};
