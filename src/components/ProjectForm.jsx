import { useState } from "react";
import postProject from "../api/post-project.js";
import { useContext } from "react";

function ProjectForm() {
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    goal: 0,
    image: "",
    is_open: true,
    category: [1],
    address: "",
    suburb: "",
    postcode: "",
    country: "Australia",
    state: "WA",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProjectDetails((prevProjectDetails) => ({
      ...prevProjectDetails,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      projectDetails.title &&
      projectDetails.description &&
      projectDetails.goal &&
      projectDetails.image &&
      projectDetails.category &&
      projectDetails.suburb &&
      projectDetails.postcode &&
      projectDetails.country &&
      projectDetails.state
    ) {
      postProject(
        projectDetails.title,
        projectDetails.description,
        projectDetails.goal,
        projectDetails.image,
        projectDetails.category,
        projectDetails.address,
        projectDetails.suburb,
        projectDetails.postcode,
        projectDetails.country,
        projectDetails.state
      );
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Project's Title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Project's Description"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal</label>
        <input
          type="number"
          id="goal"
          placeholder="Project's Goal"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="url"
          id="image"
          placeholder="Image file"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          placeholder="Project's Category"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          placeholder="Address"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="suburb">Suburb</label>
        <input
          type="text"
          id="suburb"
          placeholder="suburb"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="postcode">Postcode</label>
        <input
          type="number"
          id="postcode"
          placeholder="postcode"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          placeholder="postcode"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Create New Project
      </button>
    </form>
  );
}

export default ProjectForm;
