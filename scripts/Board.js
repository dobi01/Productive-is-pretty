function initSortable() {
  $('.card-list').sortable({
    revert: true,
    connectWith: '.card-list',
    placeholder: 'card-placeholder'
  }).disableSelection();
}

var board = {
  createColumn: function(column) {
    this.element.append(column.element);
    initSortable();
  },
  element: $('#board .column-container')
};

$('.create-column')
  .click(function() {
    var columnName = '';
    $.ajax({
      url: baseUrl + '/column',
      method: 'POST',
      data: {
        name: columnName
      },
      success: function(response) {
        var column = new Column(response.id, columnName);
        board.createColumn(column);
      }
  });
});
