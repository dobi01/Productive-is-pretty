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
        self.element.children('span').text(this.name);
      }
    });
  }

  function createCard() {
    var card = $('<li class="card"></li>'),
        cardDeleteBtn = $('<button type="button" class="btn-delete">×</button>'),
        cardDescription = $('<span class="card-description">' + self.name + '</span>');

    cardDescription.click(function() {
      self.updateCardName();
    });

    cardDeleteBtn.click(function(){
      self.removeCard();
    });

    card.append(cardDescription)
        .append(cardDeleteBtn);
    
    return card;
  }
}

Card.prototype = {
  updateCardName: function() {
    var self = this,
        newCardName = prompt("Enter new card title");

    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'PUT',
      data: {
        name: newCardName,
        bootcamp_kanban_column_id: self.columnId
      },
      success: function() {
        self.element.children('span').text(newCardName);
      }
    });
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
