(function () { 'use strict';

/**
 * @file
 * JS file for Europa theme.
 */(function($){Drupal.europa=Drupal.europa||{};Drupal.europa.breakpoints=Drupal.europa.breakpoints||{}; // TODO:
// Populate the breakpoints with those comming from Breakpoints module.
// @see breakpoints js module for potential solution.
Drupal.europa.breakpoints.medium='screen and (min-width: 480px)';Drupal.europa.breakpoints.small='screen and (min-width: 768px)';Drupal.behaviors.europa_tabs={attach:function(context){$('.nav-tabs--with-content').once('nav-tabs',function(){$this=$(this);if(typeof enquire!=='undefined'){ // Runs on device width change.
enquire.register('screen and (max-width: 479px)',{ // Setup.
setup:function(){$this.siblings('.tab-content').children().addClass('tab-pane');}, // Mobile.
match:function(){$this.siblings('.tab-content').children().removeClass('tab-pane');}, // Desktop.
unmatch:function(){$this.siblings('.tab-content').children().addClass('tab-pane');}});}});}};Drupal.behaviors.commissioner_timeline={attach:function(context){var $timelineSelector=$('.timeline');$($timelineSelector).once('timeline',function(){var timelineItemSelector='.timeline .timeline__item',timelineItemsCount=$(timelineItemSelector).length,timeLineButton='<button class="btn btn-time-line">'+Drupal.t("Show all timeline")+'</button>';if(timelineItemsCount>4){$timelineSelector.append(timeLineButton);$(timelineItemSelector).each(function(i){if(i>4){$(this).addClass('hidden');}});$('.btn-time-line',this).click(function(e){e.preventDefault();$(this).hide();$(timelineItemSelector).removeClass('hidden'); // Refreshing scrollspy to recalculate the offset.
$('body').scrollspy('refresh');});}});}};Drupal.behaviors.equal_blocks={attach:function(context){$('.equal-height').once('equal-height-blocks',function(){$equal_height_block=$(this);if(typeof enquire!=='undefined'){ // Runs on device width change.
enquire.register(Drupal.europa.breakpoints.small,{ // Desktop.
match:function(){Drupal.behaviors.equal_blocks.fixBlockHeights($equal_height_block,false);}, // Mobile.
unmatch:function(){Drupal.behaviors.equal_blocks.fixBlockHeights($equal_height_block,true);}});}});},fixBlockHeights:function($block,stop){$block.each(function(){$wrapper=$(this);var $blocks=[]; // Columns and rows.
if($wrapper.hasClass('listing__wrapper--two-columns')||$wrapper.hasClass('listing__wrapper--row-two')){var selector='.listing__item-link > :first-child'; // Two column listing blocks.
if($wrapper.hasClass('listing__wrapper--two-columns')){$first_column=$wrapper.find('.listing:first-child .listing__item');$last_column=$wrapper.find('.listing:last-child .listing__item');} // Row with two items.
else if($wrapper.hasClass('listing__wrapper--row-two')){$first_column=$wrapper.find('.listing .listing__item:nth-child(odd)');$last_column=$wrapper.find('.listing .listing__item:nth-child(even)');} // First column always contains more items if not equal.
$first_column.each(function(index,item){ // Only applicable if there's an item in the other column at index.
if(!$last_column.eq(index)){return;}var $row=$(item).find(selector).add($last_column.eq(index).find(selector));$blocks.push($row);});} // Simple listing blocks.
else {$blocks.push($wrapper.find('.listing__item-link > :first-child'));}var i,max;for(i=0,max=$blocks.length;i<max;i++){var $block=$blocks[i].equalHeight();}});}};var trackElements=[];var errorEventSent='Piwik, trackEvent was not fired up.'; /**
   * Acts like a wrapper for Piwik push method.
   *
   * For Piwik parameters refer to {@see https://developer.piwik.org/guides/tracking-javascript-guide}
   *
   * @param int {triggerValue}
   *   How many times should the call be triggered by page load
   *   Accepts 0,1 (0 for always and 1 just for one time).
   * @param str {action}
   *   Defines Action in piwik.
   * @param str {category}
   *   Defines category in piwik.
   * @param {value}
   *  Defines category in piwik.
   * @param {data}
   *  Defines category in piwik.
   */PiwikDTT={sendTrack:function(triggerValue,action,category,value,data){if(typeof action==="undefined"||action===null||action===''){action="trackEvent";} // Trigger only once.
if(triggerValue==1){var innerElements=triggerValue+action+category+value+data;if($.inArray(innerElements,trackElements)===-1){trackElements.push(innerElements);if(typeof _paq!='undefined'){_paq.push([action,category,value,data]);}}} // Always trigger.
if(triggerValue==0){if(typeof _paq!='undefined'){_paq.push([action,category,value,data]);}}}};})(jQuery);

(function($){ /**
  * Standard jQuery plugin pattern. @see {@link http://learn.jquery.com/plugins/basic-plugin-creation/}.
  */$.fn.selectify=function(options){this.each(function(){ // Defaults settings.
var settings=$.extend({listWrapper:$(this),listSelector:'element__list',item:'element__option',other:'element__other',unavailable:'element__unavailable',selected:'is-selected'},options); // Private methods.
var attachDropDown=function(){var listClass=settings.listSelector,$list=$('ul.'+listClass); // For every list which the user wants to convert.
$list.each(function(){ // Start building the select and keep the same class as the ul.
var $select=$('<select />').addClass(listClass); // For each element of the particular ul.
$list.find('li.'+settings.item).each(function(){var currentClass=$(this).attr('class');switch(currentClass){ // Skip if it's unavailable.
case String(settings.item+' '+settings.unavailable):break; // Build an option element, selected state.
case String(settings.item+' '+settings.selected):var $option=$('<option />');$option.html($(this).html()).attr('selected',true);$select.append($option);break; // Build a regular option element.
case String(settings.item+' '+settings.other):var $option=$('<option />');$option.attr('value',$(this).find('a').attr('href')).html($(this).html());$select.append($option);break;}}); // Add the select to the DOM. Only if it's not already added.
if(!$list.parent().find('select').length){$list.parent().append($select);settings.listWrapper.find('select').hide(); // Listener to change the URL of the page depending on the target.
$select.on({change:function(){var target=String($(this).val());window.location.href=$("a[href='"+target+"']").first().attr('href');}});}});};var hideDropDown=function(){settings.listWrapper.find('select'+'.'+settings.listSelector).hide();};var hideList=function(){var $list=settings.listWrapper.find('ul.'+settings.listSelector);$list.children('.lang-select-page__other').hide();$list.children('.is-selected').hide();};var showDropDown=function(){settings.listWrapper.find('select'+'.'+settings.listSelector).show();};var showList=function(){var $list=settings.listWrapper.find('ul.'+settings.listSelector);$list.children('.lang-select-page__other').show();$list.children('.is-selected').show();}; // Custom event handlers, scoped to the context of the instance.
settings.listWrapper.on('hide.dropdown',hideDropDown);settings.listWrapper.on('hide.list',hideList);settings.listWrapper.on('show.dropdown',showDropDown);settings.listWrapper.on('show.list',showList); // Could be placed under init() method to be controlled by user.
attachDropDown();});};})(jQuery);

})();
//# sourceMappingURL=core.js.map
