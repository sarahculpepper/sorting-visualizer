import React from "react";
import { getMergeSortAnimations, getQuickSortAnimations } from "../sortingAlgorithms/sortingAlgorithms";
import './SortingVisualizer.css';

//Animation speed in ms
const ANIMATION_SPEED_MS = 4;

//Number of bars/elements in array
const NUMBER_OF_ARRAY_BARS = 245;

//Primary color of array bars
const PRIMARY_COLOR = 'black';

//Secondary color of array bars being compared during sorting algorithm
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 600));
        }
        this.setState({ array });
    }   

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort(){
        
    }

    quickSort(){
        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const { array } = this.state;

        return (
            <div className="header">Sorting Algorithm Visualizer
                <div className="array-container">
                    <button className="array-buttons" onClick={() => this.resetArray()}>New Array</button>
                    <button className="array-buttons" onClick={() => this.resetArray()}>Stop</button>
                    <button className="array-buttons" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="array-buttons" onClick={() => this.heapSort()}>Heap Sort</button>
                    <button className="array-buttons" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="array-buttons" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <div className="array-window">
                        {array.map((value, idx) => (
                            <div className="array-bar" key={idx}
                                style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${(value)}px`,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}