/*
 *Example functions to practice JavaScript
 *
 * Emiliano Deyta
 * 2025-02-12
 */
 
// function area(base,height){
//     let area = base*height /2;
//     return area;
// }

// console.log(area(4,7));

"use strict";

export function firstNonRepeating(string) {
    for (let i=0; i<string.length; i++) {
        let repeated = false;
        for (let j=0; j<string.length; j++) {
            if (string[i] == string[j] && i != j) {
                repeated = true;
                break;
            }
        }
        //console.log(`Char: ${string[i]}, repeated: ${repeated}`);
        if (!repeated) {
            return string[i];
        }
    }
}

export function bubbleSort(inputArray) {
    let arrayLength = inputArray.length;
    for (let outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
        for (let innerIndex = 0; innerIndex < arrayLength - outerIndex - 1; innerIndex++) {
            if (inputArray[innerIndex] > inputArray[innerIndex + 1]) {
                let temporaryValue = inputArray[innerIndex];
                inputArray[innerIndex] = inputArray[innerIndex + 1];
                inputArray[innerIndex + 1] = temporaryValue;
            }
        }
    }
    return inputArray;
}

export function invertArray(originalArray) {
    let reversedArray = [];
    for (let currentIndex = originalArray.length - 1; currentIndex >= 0; currentIndex--) {
        reversedArray.push(originalArray[currentIndex]);
    }
    return reversedArray;
}

export function invertArrayInplace(inputArray) {
    let leftIndex = 0;
    let rightIndex = inputArray.length - 1;
    while (leftIndex < rightIndex) {
        let temporaryValue = inputArray[leftIndex];
        inputArray[leftIndex] = inputArray[rightIndex];
        inputArray[rightIndex] = temporaryValue;
        leftIndex++;
        rightIndex--;
    }
}

export function capitalize(inputString) {
    let wordArray = inputString.split(' ');
    for (let wordIndex = 0; wordIndex < wordArray.length; wordIndex++) {
        if (wordArray[wordIndex]) {
            wordArray[wordIndex] = wordArray[wordIndex][0].toUpperCase() + wordArray[wordIndex].slice(1);
        }
    }
    return wordArray.join(' ');
}

export function mcd(firstNumber, secondNumber) {
    while (secondNumber !== 0) {
        let temporaryValue = secondNumber;
        secondNumber = firstNumber % secondNumber;
        firstNumber = temporaryValue;
    }
    return Math.abs(firstNumber);
}

export function hackerSpeak(inputString) {
    let characterMapping = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5' };
    let transformedString = '';
    for (let characterIndex = 0; characterIndex < inputString.length; characterIndex++) {
        let lowerCaseCharacter = inputString[characterIndex].toLowerCase();
        transformedString += characterMapping[lowerCaseCharacter] || inputString[characterIndex];
    }
    return transformedString;
}

export function factorize(inputNumber) {
    let factorArray = [];
    for (let potentialFactor = 1; potentialFactor <= Math.abs(inputNumber); potentialFactor++) {
        if (inputNumber % potentialFactor === 0) {
            factorArray.push(potentialFactor);
        }
    }
    return factorArray;
}

export function deduplicate(inputArray) {
    let uniqueValues = [];
    for (let currentIndex = 0; currentIndex < inputArray.length; currentIndex++) {
        if (!uniqueValues.includes(inputArray[currentIndex])) {
            uniqueValues.push(inputArray[currentIndex]);
        }
    }
    return uniqueValues;
}

export function findShortestString(arr) {
    if (arr.length === 0) return 0;
    let minLength = arr[0].length;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length < minLength) {
            minLength = arr[i].length;
        }
    }
    return minLength;
}

export function isPalindrome(inputString) {
    let reversedString = inputString.split('').reverse().join('');
    return inputString === reversedString;
}

export function sortStrings(inputArray) {
    return inputArray.sort();
}

export function stats(numberArray) {
    if (numberArray.length === 0) return [0, 0];
    let sum = numberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    let mean = sum / numberArray.length;
    let modeMapping = {};
    let modeValue = numberArray[0];
    let highestFrequency = 1;
    for (let currentNumber of numberArray) {
        modeMapping[currentNumber] = (modeMapping[currentNumber] || 0) + 1;
        if (modeMapping[currentNumber] > highestFrequency) {
            highestFrequency = modeMapping[currentNumber];
            modeValue = currentNumber;
        }
    }
    return [mean, modeValue];
}

export function popularString(stringArray) {
    if (stringArray.length === 0) return "";
    let frequencyMapping = {};
    let highestFrequency = 0;
    let mostFrequentString = "";
    for (let currentString of stringArray) {
        frequencyMapping[currentString] = (frequencyMapping[currentString] || 0) + 1;
        if (frequencyMapping[currentString] > highestFrequency) {
            highestFrequency = frequencyMapping[currentString];
            mostFrequentString = currentString;
        }
    }
    return mostFrequentString;
}

export function isPowerOf2(inputNumber) {
    return (inputNumber > 0) && ((inputNumber & (inputNumber - 1)) === 0);
}

export function sortDescending(inputArray) {
    return inputArray.sort((a, b) => b - a);
}

