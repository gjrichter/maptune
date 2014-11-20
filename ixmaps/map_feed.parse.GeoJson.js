/**********************************************************************
map_feed.GeoJson.js

$Comment: provides JavaScript for import of feeds
$Source : map_feed.GeoJson.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2012/02/06 $
$Author: guenter richter $
$Id: map_feed.GeoJson.js 1 2012-02-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:map_feed.GeoJson,v $
**********************************************************************/

/** 
 * @fileoverview This file is a geojson plugin for ixmaps.jsapi top import arbitrari georeferenced feeds
 *
 * @author Guenter Richter guenter.richter@ixmaps.com
 * @version 0.9
 */

/**
 * define namespace ixmaps
 */

window.ixmaps = window.ixmaps || {};
ixmaps.feed = ixmaps.feed || {};
ixmaps.feed.parse = ixmaps.feed.parse || {};
(function() {

/**
 * parse the feed data and make an ixmaps layer object  
 * @param the data object received from the feed
 * @param opt optional parameter object
 * @type object
 * @return an ixmaps layer object
 */
	ixmaps.feed.parse.GeoJson = function(data,opt){ 


		if ( (opt.format == "json") || (opt.format == "jsonp") ) {

			var	szTitle = opt.title||data.name;
			if ( (szTitle == null) || (szTitle.length == 0) ){
				szTitle = "no name-";
			}

			// create ixmaps layerset
			// ----------------------
			var layerset = new ixmaps.feed.LayerSet(szTitle);

			// create one and only layer
			// -------------------------
			var layer    = layerset.addLayer(szTitle);
			layer.properties.fGallery = false;
			layer.properties.open = "1";

			var parser = opt.opt || {};
			if ( opt.opt && opt.opt.parser ){
				parser = opt.opt.parser;
			}
			var infoA = null;
			if ( parser.info ){
				infoA = parser.info.split("|");
			}

			if ( typeof(data.features) == "object" && typeof(data.features.length) == "undefined" ) {
				var itemA = new Array(data.features);
			}else{
				var itemA = data.features;
			}

			// parse the feeds elements and create layere features
			// ---------------------------------------------------
			for ( i=0; i<itemA.length; i++ ){

				// make the item description table
				// -------------------------------
				var row = itemA[i].properties;
				szTitle = String(i);

				var szData = "<table>";
				for ( b in row ){

					var szVal = String(row[b]);
					var szLab = String(b);

					// check, if info selection defined
					if ( infoA ){
						if ( !eval("parser.info.match(\/"+szLab+"\/)") ){
							continue;
						}
					}
					// look for special attributes like tel, site, mail, ...
					//
					if ( b == "tel" ){
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='rel:"+szVal+"'>"+ szVal +"</a></td></tr>";
					}else
					if ( (b == "e_mail") || (b == "mail") || szVal.match(/@/) ){
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='mailto:"+szVal+"'>"+ szVal +"</a></td></tr>";
					}else
					if ( !szVal.match(/\<img/i) && 
						(parser.image == b || szVal.match(/jpg/) || szVal.match(/jpeg/) || szVal.match(/png/) || szVal.match(/bmp/) || szVal.match(/tiff/)) ){
						szVal = szVal.replace(/https/g,'http');
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><img src='"+szVal+"'></td></tr>";
					}else
					if ( parser.link || parser.sito || (b == "url") || szVal.match(/http/)){
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td><a href='"+szVal+"' target='_blank' >"+ szVal +"</a></td></tr>";
					}else{
						// normal row
						//
						szData += "<tr><td><span style='color:#888'>"+b+": </span></td><td>"+ szVal +"</td></tr>";
					}
				}
				szData += "</table>";

				var	szHtml  = szData;

				var szIcon = "./resources/icons/google/kml/paddle/blu-blank.png";
				var szSmallIcon = "./resources/icons/google/blu-circle.png";

				var name = null;
				if ( opt.opt.parser ){
					for ( b in row ){
						if ( b == opt.opt.parser.title ){
							name  = String(row[b]);
						}
					}
				}

				if ( itemA[i].geometry && itemA[i].geometry.coordinates ){

					if ( itemA[i].geometry.type == "Polygon" ){

						var linestyle = {"color": "#0066CC","width": "0.1" };
						var fillstyle = {"color": "#0066CC","opacity": "0.2"};

						// add one polygon feature
						// -----------------------
						var feature = layer.addFeature(szTitle);

						feature.properties.name			= name||szTitle;
						feature.properties.description	= szHtml;
						feature.properties.legenditem	= szTitle;
						feature.properties.style		= { "lineStyle": linestyle,"fillStyle": fillstyle };

						if ( itemA[i].geometry.coordinates ){
							//var xA = new Array(itemA[i].geometry.coordinates);
							feature.setPolygon(itemA[i].geometry.coordinates);
						}

					}else

					if ( itemA[i].geometry.type == "LineString" ){

						var linestyle = {"color": "#0066CC","width": "1" };

						// add one polygon feature
						// -----------------------
						var feature = layer.addFeature(szTitle);

						feature.properties.name			= name||szTitle;
						feature.properties.description	= szHtml;
						feature.properties.legenditem	= szTitle;
						feature.properties.style		= { "lineStyle": linestyle };

						if ( itemA[i].geometry.coordinates ){
							//var xA = new Array(itemA[i].geometry.coordinates);
							feature.setLine(itemA[i].geometry.coordinates);
						}

					}else{

						// add one point feature
						// ---------------
						var feature = layer.addFeature(szTitle);

						feature.properties			    = row;
						feature.properties.name			= name||szTitle;
						feature.properties.description	= szHtml;
						feature.properties.icon			= szIcon;
						feature.properties.smallicon	= szSmallIcon;
						feature.properties.legenditem	= "GeoJson";

						if ( typeof(itemA[i].geometry.coordinates) == "string" ){
							var coorA = itemA[i].geometry.Coordinates.split(',');
							feature.setPosition(coorA[1],coorA[0]);
						}else{
							if ( parser.lonlat ){
								feature.setPosition(itemA[i].geometry.coordinates[1],itemA[i].geometry.coordinates[0]);
							}else{
								feature.setPosition(itemA[i].geometry.coordinates[0],itemA[i].geometry.coordinates[1]);
							}
						}
					}
				}
				else
				// case b) different syntax; upper case names
				// found in at least one feed
				if ( itemA[i].geometry && itemA[i].geometry.Coordinates ){

					if ( itemA[i].geometry.Type == "Polygon" ){

						var linestyle = {"color": "#0066CC","width": "0.1" };
						var fillstyle = {"color": "#0066CC","opacity": "0.2"};

						// add one polygon feature
						// -----------------------
						var feature = layer.addFeature(szTitle);

						feature.properties.name			= name||szTitle;
						feature.properties.description	= szHtml;
						feature.properties.legenditem	= szTitle;
						feature.properties.style		= { "lineStyle": linestyle,"fillStyle": fillstyle };

						if ( itemA[i].geometry.Coordinates ){
							feature.setPolygon(itemA[i].geometry.Coordinates);
						}

					}else

					if ( itemA[i].geometry.Type == "LineString" ){

						var linestyle = {"color": "#0066CC","width": "1" };

						// add one polygon feature
						// -----------------------
						var feature = layer.addFeature(szTitle);

						feature.properties.name			= name||szTitle;
						feature.properties.description	= szHtml;
						feature.properties.legenditem	= szTitle;
						feature.properties.style		= { "lineStyle": linestyle };

						if ( itemA[i].geometry.Coordinates ){
							feature.setLine(itemA[i].geometry.Coordinates);
						}

					}else{

						// add one point feature
						// ---------------
						var feature = layer.addFeature(szTitle);

						feature.properties			    = row;
						feature.properties.name			= name||szTitle;
						feature.properties.description	= szHtml;
						feature.properties.icon			= szIcon;
						feature.properties.smallicon	= szSmallIcon;
						feature.properties.legenditem	= "GeoJson";

						if ( typeof(itemA[i].geometry.Coordinates) == "string" ){
							var coorA = itemA[i].geometry.Coordinates.split(',');
							feature.setPosition(coorA[1],coorA[0]);
						}else{
							if ( parser.lonlat ){
								feature.setPosition(itemA[i].geometry.Coordinates[0],itemA[i].geometry.Coordinates[1]);
							}else{
								feature.setPosition(itemA[i].geometry.Coordinates[1],itemA[i].geometry.Coordinates[0]);
							}
						}
					}
				}
			}
		}
		return layerset;
	};
/**
 * end of namespace
 */

})();

// -----------------------------
// EOF
// -----------------------------
