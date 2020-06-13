var renderTemplate = function(template, objects, container) {
  var html =  $.templates(template).render(objects);
  $(container).html(html);
};

var renderEventTemplate = function(dataJson, template, container) {
  $.get(dataJson, function(events) {
    $.get(template, function(eventTemplate) {
      renderTemplate(eventTemplate, events, container);
    });
  });
};

var renderEventsJson = function(eventsJson, template, container) {
  var events = Object.values(eventsJson);
  $.get(template, function(eventTemplate) {
    renderTemplate(eventTemplate, events, container);
  });
};

var renderEvents = function(year) {
  $.get('/events/gdmr'+year+'.json', function(eventsJson) {
    var gdmrEvents = mapEventsDataToMapFormat(eventsJson);
    addEventsToMap(gdmrEvents);
    renderEventsJson(eventsJson, "event.tmpl", "#events");
  });
}
