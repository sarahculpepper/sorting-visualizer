export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    const length = array.length - 1;
    mergeSortHelper(array, 0, length, auxiliaryArray, animations);
    return animations;
}

export function getHeapSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    //heapSortHelper(array, animations);
    return animations;
}

function doHeap(
    mainArray,
    arrayLength,
    i
) {
    const largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < arrayLength && mainArray[i] < mainArray[l]){
        largest = l;
    }
    if (r < arrayLength && mainArray[largest] < mainArray[r]){
        largest= r;
    }
    if (largest != i){
        mainArray[i], mainArray[largest] = mainArray[largest], mainArray[i];
        doHeap(mainArray, arrayLength, largest);
    }
}    

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);

}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the compared values, push once to change color
        animations.push([i, j]);
        // Push a second time to revert their color
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Traditional swap here substituted for an over write to allow color change
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++]
        }
        else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++]
        }
    }
    while (i <= middleIdx){
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }

    function heapSortHelper(
        mainArray,
        animations
    ) {
        const arrayLength = mainArray.length;
        for (i in range (n%2, -1, -1)){
            doHeap(mainArray, arrayLength, i);
        }
        for (i in range (n - 1, 0, -1)){
            mainArray[i], mainArray[0] = mainArray[0], mainArray[i];
            doHeap(mainArray, i, 0);
        }
    }
}