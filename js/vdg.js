$(() => {
  $('.sidenav').sidenav();
  $('.modal').modal();
  
  var list = document.querySelectorAll('select');
  var selects = M.FormSelect.init(list, {});
});

let buildElements = () => {
  var sel = document.getElementById('n-sets');
  var option = sel.options[sel.selectedIndex].value;
  var n = option === 'auto' ? 3 : Number.parseInt(option);

  var data = '';

  for (var i = 0; i < n; ++i){
    var letter = String.fromCharCode(65 + i);
    data += '<div class="input-field col s12">';
    data += `<input id="#set${letter}" type="text">`;
    data += `<label for="#set${letter}">Conjunto ${letter}</label>`;
    data += '</div>';
  }

  $('#elements > .row').html(data);
}

let toggleElements = () => {
  var val = document.getElementById("useEl").checked;
  var elements = document.getElementById("elements");
  if (val){
    elements.classList.add('up');
    
    buildElements();
  }
  else
    elements.classList.remove('up');
}

let eval = () => {
  console.log('Evaluación');
}