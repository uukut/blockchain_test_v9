function AddPair() {
  const AddPos = () => {
    document.querySelector(".token_added_div").style.transition =
      "visibility 0.25s";
    document.querySelector(".token_added_div").style.visibility = "visible";
    document.querySelector(".center_div").style.transition = "visibility 0.25s";
    document.querySelector(".center_div").style.visibility = "visible";
    document.querySelector("body").style.overflowY = "hidden";
  }; // show the add position div
  return (
    <div>
      <div>
        <h3>Add Token</h3>
      </div>
      <div>
        <button
          onClick={() => {
            AddPos();
          }}
        >
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/120px-OOjs_UI_icon_add.svg.png?20180609125822"
              alt="return"
            ></img>
            <span>Add Token Pair</span>
          </div>
        </button>
      </div>
    </div>
  );
} // return the Add Position Content  (both text and button)

export default AddPair;
