+function ($) {
  'use strict';

  // SIMPLE_SIDEBAR PUBLIC CLASS DEFINITION
  // ================================

  var SimpleSidebar = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, SimpleSidebar.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="simple-sidebar"][href="#' + element.id + '"],' +
      '[data-toggle="simple-sidebar"][data-target="#' + element.id + '"]')

    if (this.options.toggle) this.toggle()
  }

  SimpleSidebar.VERSION  = '1.0.0'

  SimpleSidebar.DEFAULTS = {
    toggle: true
  }

  SimpleSidebar.prototype.toggle = function () {
    this.$element.toggleClass('toggled')
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // SIMPLE_SIDEBAR PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.simple-sidebar')
      var options = $.extend({}, SimpleSidebar.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.simple-sidebar', (data = new SimpleSidebar(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.simpleSidebar

  $.fn.simpleSidebar             = Plugin
  $.fn.simpleSidebar.Constructor = SimpleSidebar


  // SIMPLE_SIDEBAR NO CONFLICT
  // ====================

  $.fn.simpleSidebar.noConflict = function () {
    $.fn.simpleSidebar = old
    return this
  }


  // SIMPLE_SIDEBAR DATA-API
  // =================

  $(document).on('click.bs.simple-sidebar.data-api', '[data-toggle="simple-sidebar"]', function (e) {
    var $this   = $(this)
    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.simple-sidebar')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
