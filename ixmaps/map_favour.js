/**********************************************************************
map_favour.js

$Comment: provides JavaScript for favourite layer
$Source :map_favour.js,v $

$InitialAuthor: guenter richter $
$InitialDate: 2013/01/06 $
$Author: guenter richter $
$Id:map_favour.js 1 2013-01-06 10:30:35Z Guenter Richter $

Copyright (c) Guenter Richter
$Log:map_favour.js,v $
**********************************************************************/

/** 
 * @fileoverview This file is a plugin for ixmaps.jsapi to create and manage a favourite layer
 *
 * @author Guenter Richter guenter.richter@ixmaps.com
 * @version 0.9
 */

/**
 * define namespace ixmaps
 */

// auto initialize
//
(function() {
})();

window.ixmaps = window.ixmaps || {};
ixmaps.jsapi = ixmaps.jsapi || {};
ixmaps.feed = ixmaps.feed || {};
ixmaps.feed.parse = ixmaps.feed.parse || {};
(function() {

var debug = false;

/**
 * feed channel object  
 * @class a feed channel object
 * @constructor
 * @throws 
 * @return A new Channel
 */
	ixmaps.feed.Channel = Channel = function(szUrl){
		this.szUrl = szUrl;
	};

/**
 * add a feed to the map  
 * @param the URL of the feed
 * @param opt optional parameter object
 * @type void
 */
	ixmaps.feed.addFeed = function(szSource,opt,callback){

		_TRACE("ixmaps.feed.addFeed: "+JSON.stringify(opt));

		ixmaps.feed.unresolvedPosition = 0;

		if ( !callback ){
			callback = function(){};
		}

		if ( opt.type == 'json' ){
			$.get(szSource,
				function(data){
					ixmaps.message("loading",false);
					callback(ixmaps.feed.processFeed(data,opt));
				}).error(function() { alert("error"); });
		}
		if ( opt.type == 'text' ){
            $.ajax({
                 type: "GET",
                 url: szSource,
                 dataType: "text",
                 success: function(xml) {
					ixmaps.message("loading",false);
					// alert(xml);
					var test = JSON.parse(xml);
					// alert(test.value.items[0].content);
					szTest = "{\"map\":"+String(test.value.items[0].content);
					// alert(szTest);
					eval ("var obj='"+szTest+"');");
					// alert(obj);
					callback(ixmaps.feed.processFeed(xml,opt));
                 },
                 error: function(xml) {
					ixmaps.message("loading",false);
					callback(false);
                 }
            });
		}
		if ( opt.type == 'xml' ){
            $.ajax({
                 type: "GET",
                 url: szSource,
                 dataType: "xml",
                 success: function(xml) {
					ixmaps.message("loading",false);
					callback(ixmaps.feed.processFeed(xml,opt));
                 },
                 error: function(xml) {
					ixmaps.message("loading",false);
 					callback(false);
                }
            });
		}
	};


/**
 * process the feeds data feed to the map  
 * @param the data object received from the feed
 * @param opt optional parameter object
 * @type void
 */
	ixmaps.feed.processFeed = function(data,opt){

		_TRACE("processFeed: " + opt.type + " " + typeof(data) + JSON.stringify(opt));

		if ( opt.type == "json" && typeof(data) == "string" ){
			data = JSON.parse(data);
		}

		if ( data == null ){
			// alert("no data");
			return false;
		}
		try {
			switch(opt.name){
				// deprecated, keep for compatibility, use 'MyMapsKLM_YQL'
				case 'Google_Maps_My_Map_KML_YQL':
					var feedLayer = this.parse.MyMapsKLM_YQL(data,opt);
					break;
				// deprecated, keep for compatibility, use 'MyMapsKLM'
				case 'Google_Maps_My_Map_KML':
					var feedLayer = this.parse.MyMapsKLM(data,opt);
					break;
				// the one and only for the future
				default:
					if ( eval("typeof(this.parse."+opt.name+")") == "function" ){
						var feedLayer = eval("this.parse."+opt.name+"(data,opt)");
					}else{
						$.getScript(scriptBase + 'map_feed.' + opt.name + ".js")
						.done(function(script, textStatus) {
						  ixmaps.feed.processFeed(data,opt);
						  return;
						})
						.fail(function(jqxhr, settings, exception) {
						  ixmaps.errorMessage("'"+opt.name+"' unknown feed format !",2000);
						});
						return;
					}
					break;
			}
		} catch (e){
			ixmaps.errorMessage("'"+opt.name+"' unknown feed format !",2000);
			return false;
		}

		if ( feedLayer == null ){
			// alert(data);
			alert("no valid data");
			return false;
		}
		if ( ixmaps.feed.unresolvedPosition ){
			ixmaps.errorMessage(ixmaps.feed.unresolvedPosition+" unresolved position(s)",2000);
		}

		if ( opt.flag && opt.flag.match(/gallery/) ){
			feedLayer.layers[0].properties.fGallery = true;
		}
		if ( opt.flag && opt.flag.match(/open/) ){
			feedLayer.layers[0].properties.open = true;
			feedLayer.layers[0].properties.visibility = true;
		}
		if ( opt.flag && opt.flag.match(/closed/) ){
			feedLayer.layers[0].properties.open = false;
		}
		if ( opt.flag && opt.flag.match(/noinfo/) ){
			feedLayer.layers[0].fShowInfoInList = false;
		}
		if ( opt.flag && opt.flag.match(/showinfo/) ){
			feedLayer.layers[0].fShowInfoInList = true;
		}
		_TRACE("addNewData from feed: "+feedLayer.name);
		ixmaps.jsapi.addNewData(feedLayer.name?feedLayer.name:"feed-test",feedLayer);
		if ( opt.flag && opt.flag.match(/zoomto/) ){
			ixmaps.jsapi.zoomToLayer(feedLayer.name);
		}
//		setTimeout("ixmaps.jsapi.zoomToLayer();",1000);
//		ixmaps.jsapi.redraw();
//		ixmaps.jsapi.zoomToLayer();

		return true;

	};

	ixmaps.feed.LayerSet = function(szName){
		this.type	= "Map";
		this.name	= szName?szName:"Feed";
		this.comment = "generated by map_feed";
		this.bbox = new Array(180,90,-180,-90);
		this.layers = new Array();
	};
	ixmaps.feed.LayerSet.prototype.addLayer = function(szName){
		var ret = new ixmaps.feed.Layer(szName);
		ret.parent = this;
		this.layers.push(ret);
		return ret;
	};

	ixmaps.feed.Layer = function(szName){
		this.type = "FeatureCollection";
		this.properties = { "name": szName ,
							 "description": "",
							 "Snippet": "",
							 "visibility": "1",
							 "open": "0",
							 "legendstyle": "CHECKSUBLAYER",
							 "icon": "./resources/icons/google/kml/paddle/red-diamond.png",
							 "end": "" };
		this.features = new Array();
	};
	ixmaps.feed.Layer.prototype.addFeature = function(szName){
		var ret = new ixmaps.feed.Feature(szName);
		ret.parent = this;
		this.features.push(ret);
		return ret;
	};

	ixmaps.feed.Feature = function(szName){
		this.type		=	"Feature";
		this.properties = { "name": szName,
							"description": "" ,
							"icon": "./resources/icons/google/kml/paddle/red-diamond.png",
							"smallicon": "./resources/icons/google/red-circle.png",
							"iconscale": "1.000000",
							"legenditem": "Test",
							"end": "" };
	};

	ixmaps.feed.Feature.prototype.setPosition = function(lat,lng){
		this.geometry   = { "type": "Point",
							"coordinates": new Array(lat,lng) };
		obj = this.parent.parent;
		if ( obj ){
			obj.bbox[0] = Math.min(obj.bbox[0],lat);
			obj.bbox[1] = Math.min(obj.bbox[1],lng);
			obj.bbox[2] = Math.max(obj.bbox[2],lat);
			obj.bbox[3] = Math.max(obj.bbox[3],lng);
		}
	};

	ixmaps.feed.Feature.prototype.setLine = function(latlngA){
		this.multigeometry   = [{ "type": "LineString",
								  "coordinates": latlngA }];
	};


/**
 * end of namespace
 */

})();

// -----------------------------
// EOF
// -----------------------------
