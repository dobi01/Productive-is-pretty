function Column(id, name) {
  
  var self = this;
  this.id = id;
  this.name = name || 'No name given';
  this.element = createColumn();

  function createColumn() {
    var column = $('<div class="column"></div>'),
        columnTitle = $('<h2 class="column-title">' + self.name + '</h2>'),
        columnCardList = $('<ul class="card-list"></ul>'),
        columnDelete = $('<button type="button" class="btn-delete">x</button>'),
        columnAddCard = $('<button type="button" class="column-add-card">Dodaj kartę</button>');

    columnDelete.click(function() {
      self.deleteColumn();
    });

    columnTitle.click(function() {
      self.updateColumnTitle();
    });

    columnAddCard.click(function() {
      var cardName = prompt("Enter the name of the card");

      $.ajax({
        url: baseUrl + '/card',
        method: 'POST',
        data: {
          name: cardName,
          bootcamp_kanban_column_id: self.id
        },
        success: function(response) {
          var card = new Card(response.id, self.id, cardName);
          self.createCard(card);
        }
      });
    });

    column.append(columnTitle)
          .append(columnDelete)
          .append(columnAddCard)
          .append(columnCardList);

    return column;
  }
}

Column.prototype = {
  createCard: function(card) {
    this.element.children('ul').append(card.element);
  },

  updateColumnTitle: function() {
    var self = this,
        newColumnTitle = prompt("Enter new column title");

    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'PUT',
      data: {
        name: newColumnTitle
      },
      success: function() {
        self.element.children('h2').text(newColumnTitle);
      }
    });
  },

  deleteColumn: function() {
    var self = this;
	  
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'DELETE',
      success: function() {
        self.element.remove();
      }
    });
  }
};
