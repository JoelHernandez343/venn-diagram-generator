let bitCount = n => {
  var r = 0;

  while (n) n >>= 1, r++;

  return r;
}

let isOperator = c => {
  switch (c) {
    case 'U':
    case '-':
    case '^':
    case "'":
    case '(':
    case ')':
      return true;
  }
  return false;
}

let pre = x => {
  switch (x) {
    case '-':
      return 1;
    case 'U':
      return 2;
    case '^':
      return 3;
    case "'":
      return 5;
  }

  return Infinity;
}

let precedencia = (x, y) => {
  return pre(x) - pre(y);
}

let setUniverse = n => {
  var sets = [0, 0, 0, 0, 0, 1, 0];

  switch (n) {
    case 2:
      sets[0] = 10; // 1010
      sets[1] = 6;  //  110
      sets[6] = 15; // 1111
      break;

    case 3:
      sets[0] = 150; // 10010110
      sets[1] = 90;  //  1011010
      sets[2] = 46;  //   101110
      sets[6] = 255; // 11111111
      break;

    case 4:
      sets[0] = 8822;   // 10001001110110
      sets[1] = 4922;   //  1001100111010
      sets[2] = 1262;   //    10011101110
      sets[3] = 2462;   //   100110011110
      sets[6] = 16383;  // 11111111111111
      break;

    case 5:
      sets[0] = 2170094; // 1000010001110011101110
      sets[1] = 1150582; //  100011000111001110110
      sets[2] = 575354;  //   10001100011101111010
      sets[3] = 287678;  //    1000110001110111110
      sets[4] = 145886;  //     100011100111011110
      sets[6] = 4194303; // 1111111111111111111111
      break;
  }

  return sets;
}

let toPost = infix => {
  let post = '';
  let pila = new Array(200);
  let ptr = 0;

  for (var i = 0; i < infix.length; ++i) {
    var c = infix.charAt(i);

    if (!isOperator(c))
      post += c

    else if (c === '(')
      pila[++ptr] = c;

    else if (c === ')') {
      while (pila[ptr] !== '(' && ptr > 0)
        post += pila[ptr--];

      if (pila[ptr] === '(')
        ptr--;
    }

    else {
      let v = precedencia(c, pila[ptr]);
      while (precedencia(c, pila[ptr]) <= 0 && pila[ptr] !== '(' && ptr > 0)
        post += pila[ptr--];
      

      pila[++ptr] = c;
    }
  }

  while (ptr > 0)
    post += pila[ptr--];

  return post;
}

let union = (a, b) => a | b;

let intersection = (a, b) => a & b;

let complement = (a, universe) => universe & ~a;

let substraction = (a, b) => a ^ b & a;

let evaluate = (postfix, n) => {
  var sets = setUniverse(n);
  var universe = sets[6];
  var pila = new Array(200);
  var j = -1;

  for (var i = 0; i < postfix.length; ++i) {
    var c = postfix.charAt(i);

    if (isOperator(c)) {
      switch (c) {
        case 'U':
          pila[j - 1] = union(pila[j - 1], pila[j]);
          j--;
          break;

        case '-':
          pila[j - 1] = substraction(pila[j - 1], pila[j]);
          j--;
          break;

        case '^':
          pila[j - 1] = intersection(pila[j - 1], pila[j]);
          j--;
          break;

        case "'":
          pila[j] = complement(pila[j], universe);
          break;
      }

      continue;
    }

    switch (c) {
      case 'A': case 'a':
        pila[++j] = sets[0];
        break;
      
      case 'B': case 'b':
        pila[++j] = sets[1];
        break;
      
      case 'C': case 'c':
        pila[++j] = sets[2];
        break;
      
      case 'D': case 'd':
        pila[++j] = sets[3];
        break;
      
      case 'E': case 'e':
        pila[++j] = sets[4];
        break;
      
      case 'S': case 's':
        pila[++j] = sets[5];
        break;
      
      case 'Ω': case 'O':
        pila[++j] = sets[6];
        break;
      
      case '∅': case '0': case 'Ø':
        pila[++j] = 0;
        break;
      
      default:
        throw "Símbolo desconocido: " + c;
    }
  }

  let r = [], l = bitCount(universe);
  for (var i = l - 1; i >= 0; --i)
    r.push((pila[j] >> i) & 1);

  return r;
}

let view = [,,false, false, false, false];

let eval = () => {
  let x = document.getElementById("expression").value;
  let n = parseInt(document.getElementById("nsets").value);
  let p = '';
  let e = [];
  if (x){
    document.getElementById('logoDiagram').classList.add('d-none');

    p = toPost(x);
    e = evaluate(p, n);
    for (var i = 2; i < 6; ++i){
      var tmp = `sets${i}`;

      if (i === n)
        document.getElementById(tmp).classList.remove('d-none');
      else
        document.getElementById(tmp).classList.add('d-none');

    }
  
    for (var i = 0; i < e.length; ++i){
      var tmp = `f${n}_${i + 1}`;

      if (e[i])
        document.getElementById(tmp).classList.remove('d-none');
      else
        document.getElementById(tmp).classList.add('d-none');

    }

    console.log(e);
  }

}

// let x = "(AUBUC)'";
// let p = toPost(x);
// let e = evaluate(p, 3);
// console.log(e);