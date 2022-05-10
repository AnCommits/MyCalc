function calculater(str)
{
  let res = convertedSourceData(str); // ��������� � ������, 4 ��������
  let c = Operation(res); // ��������� ���������� ��������� - �������� �����
  if ( res.NumSys == 'arabic' ) { return String(c) };
  if ( c <= 0 ) { return '' };
  return ArabicToRoman(c); // �������� ����� 0...100 � ������� ������
  
function ArabicToRoman(c) // �������� ����� 0...100 � ������� ������
{
  if ( c==100 ) {return 'C'};
  return ['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'][Math.trunc(c/10)] +
         ['','I','II','III','IV','V','VI','VII','VIII','IX'][c%10];
}

function Operation(c) // ��������� ���������� ��������� - �������� �����
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
  // ��������� � ������, 4 ��������:
  // .a - �����
  // .operator - ������
  // .b - �����
  // .NumSys - 'arabic' ���� 'roman'
{
  if ( str == null) { throw 'Error';}
  // s -> r, ������� ������ �������
  let r = [];
  let s = str.trim().toUpperCase() + ' ';
  for (let i=0; i < (s.length-1); i++)
  {
    if (s[i]!=' ' || s[i+1]!=' ')
      {
        r.push(s[i]);
      }
  }
  // ��������� �������, ���� �� ���� >
  for (let i=0; i < ( (r.length)-1); i++)
  {
    if ( isDigit(r[i]) && !(isDigit(r[i+1])) && r[i+1] != ' ' ) // ��� ��������
      {
        r[i] = r[i] + ' ';
      }
    if ( isRoman(r[i]) && !(isRoman(r[i+1])) && r[i+1] != ' ' ) // ��� �������
      {
        r[i] = r[i] + ' ';
      }
    if ( isOperator(r[i]) && r[i+1] != ' ' ) // ��� ����������
      {
        r[i] = r[i] + ' ';
      }
  }
  // < ��������� �������, ���� �� ����
  s = r.join('');
  // ����� ����������� �������� >
  for (let i=0; i < ( (s.length)); i++)
  {
    if ( !( isDigit(s[i]) || isRoman(s[i]) || isOperator(s[i]) || s[i]==' ') )
      {
        throw 'Error';
      }
  }
  // < ����� ����������� ��������
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

