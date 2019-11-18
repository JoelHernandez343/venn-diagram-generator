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

  var row = document.createElement('div');
  row.className = 'row';

  for (var i = 0; i < n; ++i){
    var letter = String.fromCharCode(65 + i);

    div = document.createElement('div');
    div.className = 'input-field col s12';
    
    var input = document.createElement('input');
    input.setAttribute('id', `sett${letter}`);
    input.setAttribute('type', 'text');

    var label = document.createElement('label');
    label.setAttribute('for', `sett${letter}`);
    label.innerHTML = `Conjunto ${letter}`;

    div.appendChild(input);
    div.appendChild(label);
    row.appendChild(div);
  }

  var e = document.getElementById('elements');
  while (e.firstChild)
    e.removeChild(e.firstChild);
  
  e.appendChild(row);
  
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

    console.log(e);

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
        document.getElementById(tmp).classList.add('p');

      else
        document.getElementById(tmp).classList.remove('p');

    }

    var val = document.getElementById("useEl").checked;
    if (val && n <= 3) {
      let s = creatingElements(n);
      var data = '';
      if (n === 2){
        data += `<p>A - B: ${s[0]}</p>`;
        data += `<p>B - A: ${s[1]}</p>`;
        data += `<p>A^B: ${s[2]}</p>`;
      } else {
        data += `<p>A - B - C: ${s[0]}</p>`;
        data += `<p>B - A - C: ${s[1]}</p>`;
        data += `<p>C - A - B: ${s[2]}</p>`;
        data += `<p>A^B: ${s[3]}</p>`;
        data += `<p>B^C: ${s[4]}</p>`;
        data += `<p>A^C: ${s[5]}</p>`;
        data += `<p>A^B^C: ${s[6]}</p>`;
      }
      $('#elements-result').html(data);
    }
  }
}