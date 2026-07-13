function generateRandomArray() {
    const length = 8; 
    let randomArr = [];
    
    for (let i = 0; i < length; i++) {
        let randomNum = Math.floor(Math.random() * 50) + 1;
        randomArr.push(randomNum);
    }
    
    document.getElementById('arrayInput').value = randomArr.join(', ');
}

function bubbleSort(arr, logCallback) {
    let n = arr.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false; 
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        
        logCallback(`Крок ${i + 1}: [${arr.join(', ')}]`);
        
        if (!swapped) {
            logCallback("Оптимізація: замін не було, зупиняємо цикл передчасно.");
            break;
        }
    }
    return arr;
}

function selectionSort(arr, logCallback) {
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i; 
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; 
            }
        }
        
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
        
        logCallback(`Крок ${i + 1} (знайдено мін. на позиції ${minIndex}): [${arr.join(', ')}]`);
    }
    return arr;
}

function insertionSort(arr, logCallback) {
    let n = arr.length;
    
    for (let i = 1; i < n; i++) {
        let current = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
        
        logCallback(`Крок ${i}: вставлено число ${current} -> [${arr.join(', ')}]`);
    }
    return arr;
}

function runSort(algorithmType) {

    const inputStr = document.getElementById('arrayInput').value;
    const originalArray = inputStr.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
    
    if (originalArray.length === 0) {
        alert("Будь ласка, введіть коректні числа через кому або натисніть кнопку рандому!");
        return;
    }

    let workingArray = [...originalArray];
    let steps = [];
    
    const logger = (message) => steps.push(`<div class="step-line">${message}</div>`);

    let algorithmName = "";
    
    if (algorithmType === 'bubble') {
        algorithmName = "Сортування бульбашкою (Bubble Sort)";
        bubbleSort(workingArray, logger);
    } else if (algorithmType === 'selection') {
        algorithmName = "Сортування вибором (Selection Sort)";
        selectionSort(workingArray, logger);
    } else if (algorithmType === 'insertion') {
        algorithmName = "Сортування вставками (Insertion Sort)";
        insertionSort(workingArray, logger);
    }

    document.getElementById('algorithmName').innerText = algorithmName;
    document.getElementById('initialArray').innerText = `[${originalArray.join(', ')}]`;
    document.getElementById('sortedArray').innerText = `[${workingArray.join(', ')}]`;
    document.getElementById('stepsLog').innerHTML = steps.join('');
    document.getElementById('resultContainer').style.display = 'block';
}