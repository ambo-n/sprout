import { useState } from "react";
import postPledge from "../api/post-pledge";
import { useParams } from "react-router-dom";

function PledgeForm() {
  const { id } = useParams();
  const [pledge, setPledge] = useState({
    amount: "",
    comment: "None",
    anonymous: false,
    project: id,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPledge((prevPledge) => ({
      ...prevPledge,
      [id]: value,
    }));
  };

  const handleSelect = (event) => {
    pledge.anonymous = event.target.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pledge.amount && pledge.anonymous) {
      postPledge(
        pledge.amount,
        pledge.comment,
        pledge.anonymous,
        pledge.project
      );
    }
    console.log("Submit");
  };

  return (
    <div>
      <h2>Make a pledge</h2>
      <form>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          placeholder="Pledge Amount"
          onChange={handleChange}
        />
        <label htmlFor="comment">Comment</label>
        <input
          type="text"
          id="comment"
          placeholder="Comment"
          onChange={handleChange}
        />
        <p>Would you like to stay anonymous?</p>
        <input
          type="radio"
          id="anonymoustrue"
          value="true"
          name="anonymous"
          onChange={handleSelect}
        />
        <label>Yes</label>
        <input
          type="radio"
          id="anonymousfalse"
          value="false"
          name="anonymous"
          onChange={handleSelect}
        />
        <label>No</label>
        <div>
          <button type="submit" onClick={handleSubmit}>
            DONATE
          </button>
        </div>
      </form>
    </div>
  );
}

export default PledgeForm;
