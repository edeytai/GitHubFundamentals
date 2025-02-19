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

export function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

export function invertArray(arr) {
    let result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
}

export function invertArrayInplace(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}

export function capitalize(str) {
    let words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
        if (words[i]) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
    }
    return words.join(' ');
}

export function mcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return Math.abs(a);
}

export function hackerSpeak(str) {
    let map = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5' };
    let result = '';
    for (let i = 0; i < str.length; i++) {
        let char = str[i].toLowerCase();
        result += map[char] || str[i];
    }
    return result;
}

export function factorize(num) {
    let factors = [];
    for (let i = 1; i <= Math.abs(num); i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

export function deduplicate(arr) {
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (!unique.includes(arr[i])) {
            unique.push(arr[i]);
        }
    }
    return unique;
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

export function isPalindrome(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return str === reversed;
}

export function sortStrings(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

export function stats(arr) {
    if (arr.length === 0) return [0, 0];
    arr.sort((a, b) => a - b);
    let median = arr.length % 2 === 0 ? (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2 : arr[Math.floor(arr.length / 2)];
    let modeMap = {};
    let mode = arr[0];
    let maxCount = 1;
    for (let num of arr) {
        modeMap[num] = (modeMap[num] || 0) + 1;
        if (modeMap[num] > maxCount) {
            maxCount = modeMap[num];
            mode = num;
        }
    }
    return [median, mode];
}

export function popularString(arr) {
    let freq = {};
    let maxCount = 0;
    let mostPopular = '';
    for (let str of arr) {
        freq[str] = (freq[str] || 0) + 1;
        if (freq[str] > maxCount) {
            maxCount = freq[str];
            mostPopular = str;
        }
    }
    return mostPopular;
}

export function isPowerOf2(num) {
    if (num < 1) return false;
    while (num > 1) {
        if (num % 2 !== 0) return false;
        num /= 2;
    }
    return true;
}

export function sortDescending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] < arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
