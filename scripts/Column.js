function Column(id, name) {
  
  var self = this;
  this.id = id;
  this.name = name || getRandomTitle(colTitles);
  this.element = createColumn();

  if (this.name) {
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'PUT',
      data: {
        name: this.name
      },
      success: function() {
        var columnTitle = self.element.find('.column-title'),
            columnTitleWidth = self.name.length + "ch";
        columnTitle.val(self.name);
        columnTitle.width(columnTitleWidth);
        columnTitle.focus();  
      }
    });
  }

  function createColumn() {
    var column = $('<div class="column"></div>'),
        columnTitleAndBtn = $('<div class="column-title-and-btn"></div>'),
        columnTitle = $('<input type="text" class="column-title" maxlength="12" spellcheck="false" />'),
        columnCardList = $('<ul class="card-list"></ul>'),
        columnDelete = $('<button type="button" class="btn-delete btn-delete-col">×</button>'),
        columnAddCard = $('<button type="button" class="column-add-card">New task</button>');

    columnDelete.click(function() {
      self.deleteColumn();
    });

    columnTitle.blur(function() {
      self.updateColumnTitle();
      self.onTitleUpdate();
    });

    columnTitle.keydown(function(e) {
      self.onTitleUpdate();
      if (event.which == 13 || event.keyCode == 13) {
        self.updateColumnTitle();
        columnTitle.blur();
      }
    });

    columnAddCard.click(function() {
      var cardName = '';

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

    columnCardList.attr('id', self.id);

    columnTitleAndBtn.append(columnTitle)
                     .append(columnAddCard);
    column.append(columnTitleAndBtn)
          .append(columnDelete)
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
        newColumnTitle = self.element.find('.column-title').val();
        if (!newColumnTitle) newColumnTitle = '???';
        
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'PUT',
      data: {
        name: newColumnTitle
      },
      success: function() {
        self.element.find('.column-title').val(newColumnTitle);
      }
    });
  },

  onTitleUpdate: function() {
    var columnTitle = this.element.find('.column-title'),
        columnTitleWidth = columnTitle.val().length + "ch";
    columnTitle.width(columnTitleWidth);
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
