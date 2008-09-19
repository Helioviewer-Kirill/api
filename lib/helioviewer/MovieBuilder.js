/**
 * @fileoverview Contains the class definition for a class for generating and displaying movies.
 */
/**
 * @author Keith Hughitt keith.hughitt@gmail.com
 * @class MovieBuilder
 * 
 */
 /*global document, window */
var MovieBuilder = Class.create(UIElement, {
	defaultOptions: {
		url: "http://localhost/hv/api/getImageSeries.php",
		minZoomLevel: 13, //can relax for single layer movies...
		numFrames: 80,
		frameRate: 8
	},
	
	
    /**
     * MovieBuilder Constructor
     * @constructor
     * 
     */
    initialize: function (options) {
		Object.extend(this, this.defaultOptions);
		Object.extend(this, options);
        
        var self = this;
        
        //Quick Movie Event Handler
		Event.observe(this.id, 'click', function() {
			var hv = self.controller;
			
			
			//Ajax Request
			var xhr = new Ajax.Request(self.url, {
				parameters: {
					action: "quickMovie",
                	layers: "EITEIT171,LAS0C20WL",
                	startDate: hv.date.getTime() * 1000,
                	zoomLevel: Math.max(hv.viewports[0].zoomLevel, self.minZoomLevel),
                	numFrames: self.numFrames,
                	frameRate: self.frameRate
				},
				method: 'get',
				onComplete: function (transport) {
					Shadowbox.open({
				        player:  'iframe',
				        title:   'Helioviewer Movie Player',
			        	height:   650,
			        	width:    550,
			        	content: self.url + '?action=play&url=' + transport.responseJSON
					});								
				}
			});
		});
        

    },
    
    /**
     * @method query
     * queries and caches information about available data
     */
    query: function (type) {
        var url = 'get' + type + '.php';
        var self = this;
        var xhr = new Ajax.Request(url, {
            parameters: {
                type: 'json'
            },
            method: 'get',
            onComplete: function (transport) {
                self.data.set(type, transport.responseJSON);
            }
        });
    }
});