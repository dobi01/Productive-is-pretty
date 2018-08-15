var colTitles = ["I'm...", 'My workout', 'My love', 'My passion', 'My family', 'My journey', 'My pleasure'],
    cardTitles = ['breathe', 'walk for 10 min', 'clean bathroom', 'kiss', 'do something new', 
                  'turn off your phone', 'learn something new', 'smile', 'stretch out', 
                  'turn off Internet', 'read a book', 'look into the sky'];

function getRandomTitle(titles) {
  return titles[(Math.floor(Math.random() * titles.length))];
}

function setupCards(col, cards) {
  cards.forEach(function (oldCard) {
    var card = new Card(oldCard.id, oldCard.bootcamp_kanban_column_id, oldCard.name);
    col.createCard(card);
  });
}

function setupColumns(columns) {
  columns.forEach(function (oldColumn) {
    var col = new Column(oldColumn.id, oldColumn.name);
        board.createColumn(col);
    setupCards(col, oldColumn.cards);
  });
}

var baseUrl = 'https://kodilla.com/pl/bootcamp-api',
    myHeaders = {
      'X-Client-Id': '2698',
      'X-Auth-Token': '9e2d1e03cf9a9d26ae032cc96436e0b7'
    };

$.ajaxSetup({
  headers: myHeaders
});

$.ajax({
  url: baseUrl + '/board',
  method: 'GET',
  success: function(response) {
    setupColumns(response.columns);
  }
});
