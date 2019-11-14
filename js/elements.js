let repeticionesSet = array => {
  return [...new Set(array)];
}

let unionSet = (array1, array2) => {
  let a = new Set(array1);
  let b = new Set(array2);
  let s = new Set([...a, ...b]);

  return [...s];
}

let diffSet = (array1, array2) => {
  let a = new Set(array1);
  let b = new Set(array2);
  let s = new Set([...a].filter(e => !b.has(e)));

  return [...s];
}

let interSet = (sets, n) => {
  let aux = [];
  let sub = 0;

  switch (n) {
    case 2:
      sub = 1;
      break;
    case 3:
      sub = 3;
      break;
    case 4:
      sub = 6;
      break;
    case 5:
      sub = 12;
      break
  }

  for (var i = 0; i < sub; ++i)
    aux.push(new Array());

  for (var i = 0; i < n; i++) {
    for (var j = i + 1; j < n; j++) {
      for (var k = 0; k < 5; k++) {
        for (var h = 0; h < 5; h++) {

          if (sets[i][k] !== sets[j][h])
            continue;

          if (j == i + 1) 
            aux[i].push(sets[i][k]);
          
          if (j == n - 1 && i == 0 && n > 2) 
            aux[j].push(sets[i][k]);
          
          if (j == i + 2 && n > 3) 
            aux[i + n].push(sets[i][k]);
          
          if ((j == i + 3) && (n == 5)) 
            aux[i + 2 * n].push(sets[i][k]);
            
        }
      }
    }
  }
  return aux;
}

let buildPieces = (sets, n) => {
  let aux = interSet(sets, n);
  let r = [];
  let aux1 = [];
  let aux2 = [];

  switch (n) {
    case 2:
      r.push(diffSet(sets[0], aux[0]));
      r.push(diffSet(sets[1], aux[0]));
      r.push(aux[0]);
      break;
    case 3:
      r.push(diffSet(diffSet(sets[0],sets[1]),sets[2]));
      r.push(diffSet(diffSet(sets[1],sets[0]),sets[2]));
      r.push(diffSet(diffSet(sets[2],sets[1]),sets[0]));
      r.push(diffSet(aux[0],sets[2]));
      r.push(diffSet(aux[1],sets[0]));
      r.push(diffSet(aux[2],sets[1]));
      break;
    case 4:
      r.push(diffSet(diffSet(diffSet(sets[0],sets[1]),sets[2]),sets[3]));//1
      r.push(diffSet(diffSet(diffSet(sets[1],sets[0]),sets[2]),sets[3]));//2
      r.push(diffSet(diffSet(diffSet(sets[3],sets[1]),sets[2]),sets[0]));//3
      r.push(diffSet(diffSet(diffSet(sets[2],sets[1]),sets[0]),sets[3]));//4
      r.push((diffSet(diffSet(aux[0],sets[2]),sets[3])));//5
      r.push((diffSet(diffSet(aux[1],sets[0]),sets[3])));//6
      r.push((diffSet(diffSet(aux[2],sets[0]),sets[1])));//7
      r.push((diffSet(diffSet(aux[3],sets[1]),sets[2])));//8
      r.push(diffSet(aux[5],sets[2]));//9
      r.push(diffSet(aux[4],sets[3]));//10
      r.push(diffSet(aux[5],sets[0]));//11
      r.push(diffSet(aux[4],sets[1]));//12
      break;
    case 5:
      r.push(diffSet(diffSet(diffSet(diffSet(sets[0],sets[1]),sets[2]),sets[3]),sets[4]));//1
      r.push(diffSet(diffSet(diffSet(diffSet(sets[1],sets[0]),sets[2]),sets[3]),sets[4]));//2
      r.push(diffSet(diffSet(diffSet(diffSet(sets[2],sets[1]),sets[0]),sets[3]),sets[4]));//3
      r.push(diffSet(diffSet(diffSet(diffSet(sets[3],sets[1]),sets[2]),sets[0]),sets[4]));//4
      r.push(diffSet(diffSet(diffSet(diffSet(sets[4],sets[1]),sets[2]),sets[3]),sets[0]));//5
      r.push((diffSet(diffSet(aux[0],sets[2]),sets[4])));//6
      r.push((diffSet(diffSet(aux[1],sets[0]),sets[3])));//7
      r.push((diffSet(diffSet(aux[2],sets[4]),sets[1])));//8
      r.push((diffSet(diffSet(aux[3],sets[0]),sets[2])));//9
      r.push((diffSet(diffSet(aux[4],sets[1]),sets[3])));//10
      r.push(diffSet(aux[9],unionSet(sets[2],sets[3])));//11
      r.push(diffSet(aux[5],unionSet(sets[3],sets[4])));//12
      r.push(diffSet(aux[6],unionSet(sets[4],sets[0])));//13
      r.push(diffSet(aux[7],unionSet(sets[0],sets[1])));//14
      r.push(diffSet(aux[8],unionSet(sets[1],sets[2])));//15
      //r.push(diffSet(aux[9],unionSet(sets[1],sets[2])));//15
      r.push(diffSet(aux[9],unionSet(sets[3],r[1])));//16
      r.push(diffSet(aux[5],unionSet(sets[4],r[1])));//17
      r.push(diffSet(aux[6],unionSet(sets[0],r[1])));//18
      r.push(diffSet(aux[7],unionSet(sets[1],r[1])));//19
      r.push(diffSet(aux[8],unionSet(sets[2],r[1])));//20
      break;
  }

  for(var i=0;i<r.length; i++)
    aux1 = unionSet(aux1, r[i]);
  
  for(var i=0;i<sets.length; i++)
    aux2 = unionSet(aux2, sets[i]);
  
  r.push(diffSet(aux2,aux1));
  r = repeticionesSet(r);
  r = repeticionesSet(r);

  return r;
}

let intersectionSet = (array1, array2) => {
  let a = new Set(array1);
  let b = new Set(array2);
  let s = new Set([...a].filter(e => b.has(e)));

  return [...s];
}

let sets = [
  [11,2,3, 5, 66, 13],
  [1,2,3,4,5, 66],
  [23, 5, 1, 13]
];

let creatingElements = n =>{
  let sets = [];

  for (var i = 0; i < n){
    var letter = String.fromCharCode(65 + i);
    var stmp = document.getElementById(`sett${letter}`).value;
    
    console.log(stmp.split(','));
  }

  return;

  let fix = intersectionSet(sets[0], sets[1]);
  fix = intersectionSet(fix, sets[2]);

  let n = 3;

  let r = buildPieces(sets, n);

  if (n === 3){
    r[5] = fix;
  }

  var data = '';

  for(var i=0; i < r.length;i++){
    data = `Seccion ${i + 1}: `;
      
    for(var k = 0 ; k < r[i].length; k++)
      data += `${r[i][k]} `;
      
    data += "\n";
  }

  return data;
}

