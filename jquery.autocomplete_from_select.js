(function( $ ) {
  $.fn.autocomplete_from_select = function(options) {
    options = options || [];
    options['width'] = options['width'] || "95%";
    options['additional-match-attributes'] = options['additional-match-attributes'] || [] // an array of additional data attributes to search. 'attribute-name' should be passed for 'data-attribute-name' attribute on the option tag
    
    function findMatches(selectElement, term) {
      var matches = [];
      $(selectElement).find('option').each(function(index, option){
        var searchTerm = term.toUpperCase();
        var optionText = $(option).text().toString().toUpperCase();
        var additional_match_values = [];
        
        for(var i=0; i < options['additional-match-attributes'].length; i++) {
          var additional_match_attribute = options['additional-match-attributes'][i];
          var additional_match_value = '';
          if($(option).data(additional_match_attribute)) additional_match_value = $(option).data(additional_match_attribute).toString().toUpperCase();
          if(additional_match_value.indexOf(searchTerm) >= 0){
            additional_match_values.push(additional_match_value);
            break;
          }
        }
        
        if(additional_match_values.length > 0 || optionText.indexOf(searchTerm) >= 0){
          matches.push({ label: $(option).text(), value: $(option).text(), select_value: $(option).val()});
        }
      });
      return matches;
    }
    
    
    return this.each(function(index, element) {
      element = $(element);
      
      if(element.hasClass('autocomplete_from_select')) 
        return 'next';
      
      element.addClass('autocomplete_from_select');
      
      var selectedOption = element.find('option:selected');

      element.hide();
      
      var textField = $("<input type='text' data-select-id='" + element.attr('id') + "' data-value-id='value_field_for_" + element.attr('id') + "' style='width:" + options['width'] + "'/>");
      textField.insertAfter(element);
      textField.val(selectedOption.text());
      
      var hiddenField = $("<input type='hidden' id='value_field_for_" + element.attr('id') + "' />");
      hiddenField.insertAfter(element);
      hiddenField.val(selectedOption.val());
      hiddenField.attr('name', element.attr('name'));
      
      element.attr('name','');
      
      textField.autocomplete({
        minLength: 0,
        source: function(request, response){
          var matches = [];
          try {
            var selectElement = document.getElementById(textField.data('select-id'));
            matches = findMatches(selectElement, request.term);
          }
          catch(e) {}
          finally {
            response(matches);
          }
        },
        close: function(event, ui){
          var autoselector = $(event.target);
          var selectElement = document.getElementById(autoselector.data('select-id'));
          var valueElement = document.getElementById(autoselector.data('value-id'));
          var term = event.target.value;
          
          var matches = findMatches(selectElement, term);
          
          var bestMatchIndex = 0; // we're going to use 0 if we don't find an exact match
          for(var i=0; i < matches.length; i++){
            if(matches[i]['label'].toUpperCase() == term.toUpperCase()){
              bestMatchIndex = i;
              break;
            }
          }
          
          if(matches.length > 0){
            $(valueElement).val(matches[bestMatchIndex]['select_value']);
            $(autoselector).val(matches[bestMatchIndex]['label']);
          }
        },
        change: function(event, ui){
          var autoselector = $(event.target);
          var selectElement = document.getElementById(autoselector.data('select-id'));
          var valueElement = document.getElementById(autoselector.data('value-id'));
          
          if(!ui.item){
            $(valueElement).val('');
            $(autoselector).val('');
          }
        }
      }).focus(function(){
          if (this.value == "")
            $(this).autocomplete("search","");
        });
    });

  };
})( jQuery );
