MooDropMenu
===========

This is a simple yet powerful drop menu class. You can create an unlimited nested menu,
build by the HTML tags ul and li. You can define your functions to open and close the menus
with the onOpen and onClose Events. This gives you great power in customizing your drop
down menu. You can customize the menu even more by CSS.

![Screenshot](http://github.com/arian/MooDropMenu/raw/master/screenshot.png)

How to use
----------

Just include MooDropMenu.js or MooDropMenu-min.js and the MooDropMenu.css to your HTML:

	#HTML
	<script type="text/javascript" src="/js/MooDropMenu-min.js"></script>
	<link  href="/css/MooDropMenu.css" rel="stylesheet" type="text/css" media="screen" />

And the menu structure

	#HTML
	<ul id="nav">
		<li><a href="#">Home</a></li>
		<li>
			<a href="#">Blog</a>
			<ul>
				<li><a href="#">Archive</a></li>
				<li>
					<a href="#">Categories</a>
					<ul>
						<li><a href="#">Javascript</a></li>
						<li><a href="#">Mootools</a></li>
						<li><a href="#">PHP</a></li>
					</ul>
				</li>
				<li><a href="#">Last comment</a></li>
			</ul>
		</li>
		<li><a href="#">Contact</a></li>
	</ul>


And then initialize the menu

	#JS
	window.addEvent('domready',function(){


		// The simple way
		$('nav').MooDropMenu();



		// The more advanced way
		$('nav').MooDropMenu({
			onOpen: function(el){
				el.fade('in')
			},
			onClose: function(el){
				el.fade('out');
			},
			onInitialize: function(el){
				el.fade('hide').set('tween',{duration:1000});
			}
		});


		// Using the MooDropMenuClass
		var dropMenu = new MooDropMenu($('nav'),{
			onOpen: function(el){
				el.fade('in')
			},
			onClose: function(el){
				el.fade('out');
			},
			onInitialize: function(el){
				el.fade('hide').set('tween',{duration:1000});
			}
		});

	}

Documentation
-------------

## Class: MooDropMenu ##

### Syntax ###

	#JS
	var dropMenu = new MooDropMenu(element, [options]);

#### Arguments ####
1. element - (element,string) An Element or the string id of an Element to apply the drop menu to.
2. options - (object,optional) An object with options for the drop menu. See below

#### Options ####
- mouseoutDelay - (number: defaults to 200) The time (delay) before the onClose event get fired
- mouseoverDelay - (number: defaults to 0) The time (delay) before the onOpen event get fired
- listSelector - (string: defaults to `ul`) The list tagname
- itemSelector - (string: defaults to `li`) The items tagname
- openEvent - (string: defaults to 'mouseenter') The event name when the menu should open
- closeEvent - (string: defaults to 'mouseleave') The event name when the menu should close

#### Events ####
- open - (function) The function which opens a part of the menu
- close - (function) The function which close a menu
- initialize - (function) The function which to execute when the menu part (ul) get initialized

## Native: Element.MooDropMenu ##


### Syntax ###

	#JS
	$('myElement').MooDropMenu([options]);

### Arguments ###
1. options - (object,optional) An object with options for the drop menu. See the MooDropMenu options

### Returns ###
- (object) This Element.


License
-------
MIT-style license.
