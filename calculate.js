function calculater(str)
{
  let res = convertedSourceData(str); // Выражение в объект, 4 элемента
  let c = Operation(res); // результат вычисления выражения - арабское число
  if ( res.NumSys == 'arabic' ) { return String(c) };
  if ( c <= 0 ) { return '' };
  return ArabicToRoman(c); // арабское число 0...100 в римскую строку
  
function ArabicToRoman(c) // арабское число 0...100 в римскую строку
{
  if ( c==100 ) {return 'C'};
  return ['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'][Math.trunc(c/10)] +
         ['','I','II','III','IV','V','VI','VII','VIII','IX'][c%10];
}

function Operation(c) // результат вычисления выражения - арабское число
{
  switch (c.operator)
  {
    case '+': return (c.a + c.b);
    case '-': return (c.a - c.b);
    case '*': return (c.a * c.b);
    case '/': return Math.trunc(c.a / c.b);
  }
}

function convertedSourceData(str)
  // Выражение в объект, 4 элемента:
  // .a - число
  // .operator - строка
  // .b - число
  // .NumSys - 'arabic' либо 'roman'
{
  if ( str == null) { throw 'Error';}
  // s -> r, убираем лишние пробелы
  let r = [];
  let s = str.trim().toUpperCase() + ' ';
  for (let i=0; i < (s.length-1); i++)
  {
    if (s[i]!=' ' || s[i+1]!=' ')
      {
        r.push(s[i]);
      }
  }
  // добавляем пробелы, если их нету >
  for (let i=0; i < ( (r.length)-1); i++)
  {
    if ( isDigit(r[i]) && !(isDigit(r[i+1])) && r[i+1] != ' ' ) // для арабских
      {
        r[i] = r[i] + ' ';
      }
    if ( isRoman(r[i]) && !(isRoman(r[i+1])) && r[i+1] != ' ' ) // для римских
      {
        r[i] = r[i] + ' ';
      }
    if ( isOperator(r[i]) && r[i+1] != ' ' ) // для операторов
      {
        r[i] = r[i] + ' ';
      }
  }
  // < добавляем пробелы, если их нету
  s = r.join('');
  // поиск посторонних символов >
  for (let i=0; i < ( (s.length)); i++)
  {
    if ( !( isDigit(s[i]) || isRoman(s[i]) || isOperator(s[i]) || s[i]==' ') )
      {
        throw 'Error';
      }
  }
  // < поиск посторонних символов
  r = s.split(' ');
  if ( r.length!=3 ) { throw 'Error' };
  if ( !isOperator(r[1]) ) { throw 'Error' };
  
  if ( isDigit(r[0][0]) && isDigit(r[2][0]) )
    {
      return {
        a:       ArabicToArabicNumber(r[0]),
        operator: r[1],
        b:       ArabicToArabicNumber(r[2]),
        NumSys:  'arabic'
      }
    };

  if ( isRoman(r[0][0]) && isRoman(r[2][0]) )
  {
    return {
      a:       RomanToArabicNumber(r[0]),
      operator: r[1],
      b:       RomanToArabicNumber(r[2]),
      NumSys:  'roman'
    }
  };
  
  throw 'Error';
}

function ArabicToArabicNumber(s)
{
  let n = Number(s);
  if ( n>=1 && n<=10)
    {
      return n;
    };
  throw 'Error';
}

function RomanToArabicNumber(s)
{
  switch(s)
  {
  case 'I':    return 1;
  case 'II':   return 2;
  case 'III':  return 3;
  case 'IV':   return 4;
  case 'V':    return 5;
  case 'VI':   return 6;
  case 'VII':  return 7;
  case 'VIII': return 8;
  case 'IX':   return 9;
  case 'X':    return 10;
  default: { throw 'Error' };
  }
}

function isDigit(d)
{
  return (d>='0' && d<='9');
}

function isRoman(d)
{
  return (d=='I' || d=='V' || d=='X');
}

function isOperator(d)
{
  return (d=='+' || d=='-' || d=='*' || d=='/');
}

}

