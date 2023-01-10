import React from "react";

export default function InputTrainNumber({
  handleInputSeat,
  showError,
  errorMsg,
}) {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <div>Train Seat Booking</div>
      <div>
        <h3>Enter Number of Seats you want to Book:</h3>
        <input
          type={"number"}
          onInput={(event) => {
            handleInputSeat(event);
          }}
        ></input>
        {showError ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
      </div>
    </div>
  );
}
