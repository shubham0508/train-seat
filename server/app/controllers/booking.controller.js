const db = require("../models");
const booking = db.booking;

//--------------------------------------
const m = 12;
const n = 7;
const arr = () => {
  let count = 1;
  let arr = new Array(m);
  for (var i = 0; i < m; i++) {
    arr[i] = new Array(n);
    for (var j = 0; j < n; j++) {
      if (count === 81) break;
      arr[i][j] = count;
      count++;
    }
  }
  return arr;
};

const allocateSeat = (seatCount) => {
  let currSeatBook = 0;
  let remainingRow = [];
  console.log(arr())
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
  
  return bookedSeats;
};

//--------------------------------------------

exports.bookSeats = async (req, res) => {
  const seatCount = req.params.seatCount;

  const bookedSeats = allocateSeat(Number(seatCount));
  console.log(bookedSeats);
  const booking = {
    id: req.body.title,
    seatsAllocated: bookedSeats,
    allocatedSeatsCount: bookedSeats.length
  };
  const data = await booking.create(booking);
  res.send("Succefully Created the Entry!!!");
};

exports.getAvailableSeats = async (req, res) => {
    try {
      const totalSeats = 80;
      const availableSeats = await booking.findAll();
      res.json({
        data:availableSeats,
        totalSeats:totalSeats,
        availableSeats:availableSeats
      })
    } catch (error) {
       console.log(error)
    }
};



  
  