import { useState } from "react";
import postPledge from "../api/post-pledge";
import { useParams } from "react-router-dom";
import "./PledgeForm.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import { Link } from "react-router-dom";
function PledgeForm() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pledge.amount && pledge.anonymous) {
      try {
        await postPledge(
          pledge.amount,
          pledge.comment,
          pledge.anonymous,
          pledge.project
        );
        navigate(0);
      } catch (error) {
        console.error("Error submitting pledge", error);
      }
    }
  };

  return (
    <div className="pledge-form-container">
      <div className="pledge-form">
        <h2>Support this campaign</h2>
        <form>
          <div className="input-box">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              placeholder="Pledge Amount"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label htmlFor="comment">Comment</label>
            <input
              type="text"
              id="comment"
              placeholder="Comment"
              onChange={handleChange}
            />
          </div>
          <div className="anonymous-details">
            <p>Would you like to stay anonymous?</p>
            <div className="anonymous-selection">
              <div>
                <input
                  type="radio"
                  id="anonymoustrue"
                  value="true"
                  name="anonymous"
                  onChange={handleSelect}
                />
              </div>
              <div>
                <label>Yes</label>
              </div>
            </div>
            <div className="anonymous-selection">
              <div>
                <input
                  type="radio"
                  id="anonymousfalse"
                  value="false"
                  name="anonymous"
                  onChange={handleSelect}
                />
              </div>
              <div>
                <label>No</label>
              </div>
            </div>
          </div>
          <div>
            {auth.token ? (
              <button type="submit" onClick={handleSubmit}>
                DONATE
              </button>
            ) : (
              <button>
                {<Link to="/login">Sign In to make a pledge</Link>}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PledgeForm;
