import React, { useMemo, useState } from "react";
import InputTrainNumber from "../view/InputTrainNumber";

export default function InputSeatsCount() {
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const TotalSeats = 80;

  const resetError = () => {
    setShowError(false);
    setErrorMsg("");
  };

  const handleInputSeat = (event) => {
    resetError();
    if (event && event != null) {
      if (event.target.value) {
        const seatCount = event.target.value;
        if (seatCount <= 0) {
          setShowError(true);
          setErrorMsg("Seats Input cannot be 0 or Negative");
        } else if (seatCount > 7) {
          setShowError(true);
          setErrorMsg("Seats Input cannot be more than 7");
        } else {
          allocateSeat(Number(seatCount));
        }
      }
    }
  };

  const bookedSeats = [];
  const m = 12;
  const n = 7;
  const arr = useMemo(() => {
    let count = 1;
    const arr = new Array(m);
    for (var i = 0; i < m; i++) {
      arr[i] = new Array(n);
      for (var j = 0; j < n; j++) {
        if (count === 81) break;
        arr[i][j] = count;
        count++;
      }
    }
    return arr;
  });

  const allocateSeat = (seatCount) => {
    let currSeatBook = 0;
    let remainingRow = [];
    for (let i = 0; i < m; i++) {
      let seatsRemain = [];
      for (let j = 0; j < n; j++) {
        if (arr[i][j] != 0) {
          seatsRemain.push(arr[i][j]);
          remainingRow.push([i, j]);
        }
      }

      if (seatsRemain.length >= seatCount) {
        for (let j = 0; j < n; j++) {
          if (arr[i][j] != 0) {
            bookedSeats.push(arr[i][j]);
            arr[i][j] = 0;
            currSeatBook++;
          }
          if (currSeatBook === seatCount) {
            break;
          }
        }
      }

      if (currSeatBook === seatCount) {
        break;
      }
    }

    if (currSeatBook != seatCount) {
      let reference = [0, 0];
      let distances = remainingRow.map((point) => {
        let distance = Math.sqrt(
          Math.pow(point[0] - reference[0], 2) +
            Math.pow(point[1] - reference[1], 2)
        );
        return [point, distance];
      });

      distances.sort((a, b) => a[1] - b[1]);

      const result = distances
        .slice(0, seatCount)
        .map((pointWithDistance) => pointWithDistance[0]);

      for (let value in result) {
        const ele = arr[result[value[0]][0]][result[value[0]][1]];
        bookedSeats.push(ele);
        arr[result[value[0]][0]][result[value[0]][1]] = 0;
        currSeatBook = seatCount;
      }
    }
    console.log(arr);
  };

  
  return (
    <InputTrainNumber
      handleInputSeat={handleInputSeat}
      showError={showError}
      errorMsg={errorMsg}
    />
  );
}
