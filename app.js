var checkButton = document.querySelector("#check-btn");
checkButton.addEventListener("click", clickHandler)

var dateInput = document.getElementById("date-input");

var divTxt = document.getElementById("div-txt")

function clickHandler() {
    var dateStr = dateInput.value
    if (dateStr!='') {
        dateStr = dateStr.toString().split("-");
        var date = {
            day: Number(dateStr[2]),
            month: Number(dateStr[1]),
            year: Number(dateStr[0])
        }
        var flag=checkPalindrome(date);

        if(flag){
            divTxt.innerHTML = "Your Birth date is palindrome"
        }
        else{
            var [count1,nextDate]=getNextPalindromeDate(date);
            var [count2, prevDate]=getPreviousPalindromeDate(date);
            var msg1=`Ooops! You missed it by ${count1} days. Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`
            var msg2=`Ooops! You missed it by ${count2} days. Previous palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}`
            count1<count2 ? (divTxt.innerHTML=`${msg1}`) : (divTxt.innerHTML=`${msg2}`)
            
            // divTxt.innerHTML=`Ooops! You missed it by ${count2} days. Next palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}`
        
        }
    }
    else {
        divTxt.innerHTML = "Please enter your birthdate"
    }

}

function convertToString(date){
    var birthDateStr = {day: '', month: '', year: ''};

    if (date.day < 10) {
        birthDateStr.day = '0' + date.day;
      }
      else {
        birthDateStr.day = date.day.toString();
      }
    
      if (date.month < 10) {
        birthDateStr.month = '0' + date.month;
      }
      else {
        birthDateStr.month = date.month.toString();
      }
    
      birthDateStr.year = date.year.toString();
      return birthDateStr;
}

function checkPalindrome(date) {
    var birthDateStr= convertToString(date)
    let result = checkFormats(birthDateStr) 
    return result;    
}

function checkFormats(birthDateStr) {

    let yyyy = birthDateStr.year;
    let mm = birthDateStr.month;
    let dd = birthDateStr.day;

    // MM/DD/YYYY
    const formatType1 = mm + dd + yyyy

    // DD/MM/YYYY
    const formatType2 = dd + mm + yyyy

    //YYYY/MM/DD
    const formatType3 = yyyy + mm + dd

    //MM/DD/YY
    const formatType4 = mm + dd + yyyy.substring(2)

    //DD/MM/YY
    const formatType5 = dd + mm + yyyy.substring(2)

    //YY/MM/DD
    const formatType6 =yyyy.substring(2)+  mm + dd

    if(isReverse(formatType1) || isReverse(formatType2) || isReverse(formatType3) || isReverse(formatType4) || isReverse(formatType5) || isReverse(formatType6)){
        return true
    }
    return false;
}

function isReverse(dateStr) {
    let flag = true;
    const len = dateStr.length;
 
    for (let i = 0; i <= len / 2; i++) {
        if (dateStr[i] != dateStr[len - i - 1]) {
            flag = false;
            return flag;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year%4000===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day=date.day+1;
    var month=date.month;
    var year=date.year;
    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    if(month==2){         //checking for Feb
        if(isLeapYear(year)){
           if(day>29){
               day=1;
               month++;
           }
        }
        else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }
    else{         //check if the day exceeds the max days in month
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }
    if(month>12){
        month=1;
        year++;
    }
    return{
        day:day,
        month:month,
        year:year
    }
}


function getNextPalindromeDate(date){
    var count=0;
    var nextDate= getNextDate(date);

    while(1){
        count++;
        var isPalindrome=checkPalindrome(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate=getNextDate(nextDate);
    }
    return [count,nextDate]
}

function getPreviousDate(date){
    var day=date.day-1;
    var month=date.month;
    var year=date.year;

    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    if(month==3){    //check for March
        if(isLeapYear(year)){
            if(day==0){
                day=29;
                month--;
            }
        }
        else{
            if(day==0){
                day=28;
                month--;
            }
        }
    }

    else{        //check for other months
        if(day==0){
            day=daysInMonth[month-1-1];
            month--;
        }
    }
    if(month==0){
        month=12;
        day=31;
        year--;
    }

    return{
        day:day,
        month:month,
        year:year
    }

}

function getPreviousPalindromeDate(date){
    var count=0;
    var previousDate = getPreviousDate(date);

    while(1){
        count++;
        var isPalindrome=checkPalindrome(previousDate);
        if(isPalindrome){
            break;
        }
        previousDate=getPreviousDate(previousDate);
    }
    return [count,previousDate]
}