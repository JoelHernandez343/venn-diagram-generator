$(() => {
  $('.sidenav').sidenav();
  $('.modal').modal();
  
  var list = document.querySelectorAll('select');
  var selects = M.FormSelect.init(list, {});
});

let userSets = () => {
  var sel = document.getElementById('n-sets');
  var option = sel.options[sel.selectedIndex].value;
  return option === 'auto' ? 3 : Number.parseInt(option);
}

let buildElements = () => {
  var n = userSets();
  var data = '';

  for (var i = 0; i < n; ++i){
    var letter = String.fromCharCode(65 + i);
    data += '<div class="input-field col s12">';
    data += `<input id="#sett${letter}" type="text">`;
    data += `<label for="#sett${letter}">Conjunto ${letter}</label>`;
    data += '</div>';
  }

  $('#elements > .row').html(data);
}

let toggleElements = () => {
  var val = document.getElementById("useEl").checked;
  var elements = document.getElementById("elements");
  if (val){
    elements.classList.add('upp');
    buildElements();
  }
  else
    elements.classList.remove('upp');
}

let eval = () => {
  var x = document.getElementById("expression").value;
  var n = userSets();
  if (x){
    document.getElementById('logo').classList.add('hide');

    var p = toPost(x);
    var e = evaluate(p, n);

    for (var i = 2; i < 6; ++i){
      var tmp = `sets${i}`;
      if (i === n)
        document.getElementById(tmp).classList.remove('hide');
      else
        document.getElementById(tmp).classList.add('hide');
    }

    for (var i = 0; i < e.length; ++i){
      var tmp = `f${n}_${i + 1}`;

      if (e[i])
        document.getElementById(tmp).classList.remove('hide');
      else
        document.getElementById(tmp).classList.add('hide');
    }

    var val = document.getElementById("useEl").checked;
    if (val) {
      let s = creatingElements(n);
    }
  }
}