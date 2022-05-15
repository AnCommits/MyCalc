import java.util.Scanner;
import java.util.Arrays;
import java.util.Locale;

public class Main {
    static boolean isDigit(char d) { return d >= '0' && d <= '9'; }
    static boolean isRoman(char d) { return d=='I' || d=='V' || d=='X'; }
    static boolean isOperator(char d) { return d=='+' || d=='-' || d=='*' || d=='/'; }
    static int ArabicToArabicNumber(String s) throws Exception { // арабская строка в число  1..10
        int n = Integer.parseInt(s);
        if ( n<1 || n>10 ) throw new Exception("Exception");
        return n;
    }
    static int RomanToArabicNumber(String s) throws Exception { // римская строка в число 1..10
        return switch (s) {
            case "I" -> 1;
            case "II" -> 2;
            case "III" -> 3;
            case "IV" -> 4;
            case "V" -> 5;
            case "VI" -> 6;
            case "VII" -> 7;
            case "VIII" -> 8;
            case "IX" -> 9;
            case "X" -> 10;
            default -> throw new Exception("Exception");
        };
    }
    static int Operation(int a, char opr, int b) {
        return switch (opr) {
            case '+' -> a + b;
            case '-' -> a - b;
            case '*' -> a * b;
            default -> (int) a / b;
        };
    };
    public static String calc(String input) throws Exception {

        int operandA; // 1-й оператор
        int operandB; // 2-й оператор
        char operator; // оператор
        char NumSys;   // 'a' - для арабских, 'r' - для римских

        if ( input.length() < 3 ) throw new Exception("Exception");
        // удаление лишних пробелов из input; результат в shortedInput
        String shortedInput = input.trim().toUpperCase() + ' ';
        StringBuilder newInput = new StringBuilder();
        for (int i=0; i < (shortedInput.length()-1); i++)
        {
            if ( shortedInput.charAt(i) !=' ' || shortedInput.charAt(i+1) != ' ') {
                newInput.append( shortedInput.charAt(i) );
            }
        }
        shortedInput = newInput.toString();
        // добавление пробелов, если их нету; результат в newInput
        newInput = new StringBuilder();
        for (int i=0; i < (shortedInput.length() )-1 ; i++) {
            newInput.append( shortedInput.charAt(i) );
            if ( isDigit(shortedInput.charAt(i) ) &&
                    !( isDigit(shortedInput.charAt(i+1) ) ) &&
                    shortedInput.charAt(i+1) != ' ' ) { // для арабских
                newInput.append(" ");
            }
            if ( isRoman(shortedInput.charAt(i) ) &&
                    !(isRoman(shortedInput.charAt(i+1) ) ) &&
                    shortedInput.charAt(i+1) != ' ' ) { // для римских
                newInput.append(" ");
            }
            if ( isOperator(shortedInput.charAt(i) ) && shortedInput.charAt(i+1) != ' ' ) { // для операторов
                newInput.append(" ");
            }
        }
        newInput.append(shortedInput.charAt(shortedInput.length()-1) );
        // проверка отсутсвия посторонних символов
        for (int i=0; i < newInput.length(); i++) {
            if ( !( isDigit(newInput.charAt(i) ) ||
                    isRoman(newInput.charAt(i) ) ||
                    isOperator(newInput.charAt(i) ) ||
                    newInput.charAt(i) == ' ') ) {
                throw new Exception("Exception");
            }
        }
        // проверка количества операторов и операндов
        shortedInput = newInput.toString();
        String [] arrInput = shortedInput.split(" ");
        if ( arrInput.length != 3 ) throw new Exception("Exception");
        if ( ! isOperator(arrInput[1].charAt(0) ) ) throw new Exception("Exception");
        // определение системы счисления - арабская или римская
        // выделение операндов в арабском виде и оператора
        if ( isDigit(arrInput[0].charAt(0) ) && isDigit(arrInput[2].charAt(0) ) ) {
            operandA = ArabicToArabicNumber(arrInput[0]);
            operandB = ArabicToArabicNumber(arrInput[2]);
            NumSys =  'a';
        } else if ( isRoman(arrInput[0].charAt(0) ) && isRoman(arrInput[2].charAt(0) ) ) {
            operandA = RomanToArabicNumber(arrInput[0]);
            operandB = RomanToArabicNumber(arrInput[2]);
            NumSys =  'r';
        } else throw new Exception("Exception");
        operator = arrInput[1].charAt(0);
        int result = Operation(operandA, operator, operandB);
        if ( NumSys == 'a' ) return "" + result;
        if ( result < 1 ) throw new Exception("Exception");
        if ( result == 100 ) return "C";
        final String [] dc = { "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" };
        final String [] ed = { "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" };
        return dc[ (int) ( result / 10 ) ] + ed [ (int) ( result % 10 ) ];
    }

    public static void main(String[] args) {
        Scanner inp = new Scanner(System.in);
        try {
            System.out.println ("Input:");
            String input = inp.nextLine();
            System.out.println("Output:\n" + calc(input));
        }
        catch (Exception e) {
            System.out.println(e.toString());
        }

    }
}
