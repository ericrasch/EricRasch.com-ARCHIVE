/*
 * SlideNote
 * A jQuery Plugin for flexible, customizable sliding notifications.
 *
 * Copyright 2010 - 2011 Tom McFarlin, http://tommcfarlin.com
 * Released under the MIT License
 * More information: http://slidenote.info
*/

(function($) {

	$.slideNoteCount = 0;
	
	$.fn.slideNote = function(options) {
		
		$.slideNoteCount += this.length;
		
		var opts = $.extend({}, $.fn.slideNote.defaults, $.fn.slideNote.private, options);
		return this.each(function() {
			
			var $note = _init(this, opts);
		
			var oDoc = $.browser.msie === true ? window : document;
			$(oDoc).scroll(function() {
				if($(this).scrollTop() === 0) {
					opts._bIsClosed = false;
				}
				if($(this).scrollTop() > opts.where) {
					if(!$note.is(':visible') && !opts._bIsClosed) {
						$note.trigger('slideIn');
					}
				} else if ($(this).scrollTop() < opts.where && $note.queue('fx')[0] !== 'inprogress') {
					if($note.is(':visible')) {
						$note.trigger('slideOut');
					}
				}
			});
			
		});
		
	};
	
	function _init(obj, opts) {
	
		$(obj).toggle()
			.css(opts.corner, -1 * $(obj).outerWidth())
			.css({
				'position': 'fixed',
				'bottom': 0
			})
			.bind('slideIn', function(evt) {
				_slideIn(evt, obj, opts);
			})	
			.bind('slideOut', function(evt) {
				_slideOut(evt, obj, opts);
			});
		
		_retrieveData(obj, opts);
		_addCloseImage(obj, opts);
		
		return $(obj);
		
	}
	
	function _slideIn(evt, obj, opts) {		
		if(opts.displayCount === -1 || opts._iCurrentDisplayCount < opts.displayCount) {
			var direction = opts.corner === 'right' ? { 'right' : 0 } : { 'left' : 0 } ;
			$(obj).show().animate(direction, 1000, 'swing', function() {
			
				if(opts.displayCount !== -1) {
					opts._iCurrentDisplayCount++;
				}
				
			if(opts.onSlideIn !== null) {
				opts.onSlideIn();
			}
				
			});
		}
	}
	
	function _slideOut(evt, obj, opts) {
		
		var direction = opts.corner === 'right' ? { 'right' : -1 * $(obj).outerWidth() } : { 'left' : -1 * $(obj).outerWidth() };
		$(obj).animate(direction, 1000, 'swing', function() {
			
			if($.slideNoteCount === 1) {
				$(obj).stop(true).hide();
			} else {
				$(obj).hide();
			}
			
			if(opts.closeImage !== null && evt.target.id === $(obj).attr('id') + '_close') {
				opts._bIsClosed = true;
			}
			
			if(opts.onSlideOut !== null) {
				opts.onSlideOut();
			}
			
		});
		
	}
	
	function _retrieveData(obj, opts) {
		if(opts.url !== null) {
			if(opts.container.length !== 0 && opts.container.indexOf('#') === -1) {
				opts.container = '#' + opts.container;
			}
			
			var sUrl = opts.container.length === 0 ? opts.url : opts.url + ' ' + opts.container;
			$(obj).load(sUrl, function() {
				if(opts.closeImage !== null) {
					_addCloseImage(obj, opts);
				}
			});
		}
	}
	
	function _addCloseImage(obj, opts) {
		if(opts.closeImage !== null) {
			var oImg = document.createElement('img');
			$(oImg).attr('src', opts.closeImage)
						 .attr('alt', 'close')
						 .attr('id', $(obj).attr('id') + '_close')
						 .hover(function() {
								$(this).css('cursor', 'pointer');
						 }).click(function(evt) {
								evt.stopPropagation();
								$(this).trigger('slideOut');
						 });
			$(obj).prepend(oImg);
		}
	}

	$.fn.slideNote.defaults = {
		where: 640,
		corner: 'right',
		url: null,
		container: '',
		closeImage: null,
		displayCount: -1,
		onSlideIn: null,
		onSlideOut: null
	};
	
	$.fn.slideNote.private = {
		_bIsClosed: false,
		_iCurrentDisplayCount: 0
	}
	
})(jQuery);