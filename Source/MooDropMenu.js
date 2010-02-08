/*
---
description: This provides a simple Drop Down menu with infinit levels

license: MIT-style

authors:
- Arian Stolwijk

requires:
  core/1.2.4: [Class.Extras,Element.Style,Element.Event]

provides: [MooDropMenu,Element.MooDropMenu]

...
*/

var MooDropMenu = new Class({
		
	Implements: [Options,Events],
	
	options: {
		onOpen: function(el){
			// open the menu
			el.set('opacity',1);
		},
		onClose: function(el){
			// close the menu
			el.set('opacity',0);
		},
		onInitialize: function(el){
			// set menu to hide
			el.set('opacity',0);
		},
		mouseoutDelay: 200,
		mouseoverDelay: 0
	},
	
	initialize: function(menu, options, level){
		this.setOptions(options);
		
		if ($type(level) == 'number') {
			this.menu = document.id(menu); //attach menu to object
			this.fireEvent('initialize',menu);
			
			// hook up menu's parent with event to trigger menu
			this.menu.pel.addEvents({
				
				'mouseover': function(){
					// Set the DropDownOpen status to true			
					this.menu.pel.mel.store('DropDownOpen',true);
					
					// Clear the timer of the delay
					$clear(this.timer);
					// Fire the event to open the menu
					this.timer = (function(){
						this.fireEvent('open',this.menu.pel.mel);
					}).delay(this.options.mouseoverDelay,this);		
					
				}.bind(this),
				
				'mouseout': function(){
					// Set the DropDownOpen status to false
					this.menu.pel.mel.store('DropDownOpen',false);
					
					// Clear the timer of the delay
					$clear(this.timer);
					// Build a delay before the onClose event get fired
					this.timer = (function(){
						if(!this.menu.pel.mel.retrieve('DropDownOpen')){
							this.fireEvent('close',this.menu.pel.mel);
						}
					}).delay(this.options.mouseoutDelay,this);		
					
				}.bind(this)				
			});
		}
		else {
			level = 0;
			this.menu = document.id(menu);
		}
		
		// grab all of the menus children - LI's in this case		
		// loop through children
		this.menu.getChildren('li').each(function(item, index){
			var list = item.getFirst('ul'); // Should be an A tag
			// if there is a sub menu UL
			if ($type(list) == 'element') {
				item.mel = list; // pel = parent element
				list.pel = item; // mel = menu element
				new MooDropMenu(list, options, level + 1); // hook up the subMenu
			}
		});			
	},
	
	toElement: function(){
		return this.menu
	}
	
});

/* So you can do like this $('nav').MooDropMenu(); or even $('nav').MooDropMenu().setStyle('border',1); */
Element.implement({
	MooDropMenu: function (options){
		this.store('MooDropMenu',new MooDropMenu(this,options));
		return this;
	}
});
