function Money_value({ props }) {
  return <div>~$ {((64.07 / 0.2664) * props).toLocaleString()} USD</div>;
}

export default Money_value;
