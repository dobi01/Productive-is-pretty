function Card(id, columnId, name) {
  
  var self = this;
  this.id = id;
  this.columnId = columnId;
  this.name = name || getRandomTitle(cardTitles);
  this.element = createCard();

  if (this.name) {
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'PUT',
      data: {
        name: this.name,
        bootcamp_kanban_column_id: self.columnId
      },
      success: function() {
        var cardDescription = self.element.find('.card-description'),
            cardDescriptionWidth = self.name.length + "ch";
        cardDescription.val(self.name);
        cardDescription.width(cardDescriptionWidth);
        cardDescription.focus();
      }
    });
  }

  function createCard() {
    var card = $('<li class="card"></li>'),
        cardDeleteBtn = $('<button type="button" class="btn-delete">×</button>'),
        cardDescription = $('<input type="text" class="card-description" maxlength="30" spellcheck="false" />');

    cardDescription.click(function() {
      self.updateCardDescription();
    });

    cardDescription.blur(function() {
      self.updateCardDescription();
      self.onTitleUpdate();
    });

    cardDescription.keydown(function(e) {
      self.onTitleUpdate();
      if (event.which == 13 || event.keyCode == 13) {
        self.updateCardDescription();
        cardDescription.blur();
      }
    });

    cardDeleteBtn.click(function(){
      self.removeCard();
    });

    $('.card-list').on( "sortstop", function() {
      self.updateCardDescription();
    });
    
    card.append(cardDescription)
        .append(cardDeleteBtn);
    
    return card;
  }
}

Card.prototype = {
  updateCardDescription: function() {
    var self = this,
        newCardName = self.element.find('.card-description').val(),
        currentColumnId = self.element.parent().attr('id');

        if (!newCardName) newCardName = '???';
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'PUT',
      data: {
        name: newCardName,
        bootcamp_kanban_column_id: currentColumnId
      },
      success: function() {
        self.element.find('.card-description').val(newCardName);
      }
    });
  },

  onTitleUpdate: function() {
    var cardDescription = this.element.find('.card-description'),
        cardDescriptionWidth = cardDescription.val().length + "ch";
    cardDescription.width(cardDescriptionWidth);
  },

  removeCard: function() {
    var self = this;
    
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.element.remove();
      }
    });
  }
};
