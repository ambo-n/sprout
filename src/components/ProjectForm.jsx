import { useState } from "react";
import postProject from "../api/post-project.js";
import useCategories from "../hooks/use-categories.js";

function ProjectForm() {
  const { categories } = useCategories();

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    is_open: true,
    category: "",
    address: "",
    suburb: "",
    postcode: "",
    country: "Australia",
    state: "",
  });

  const onChangeHandler = (event) => {
    const index = event.target.value;
    projectDetails.category = [parseInt(index)];
  };

  const onChangeHandlerState = (event) => {
    projectDetails.state = event.target.value;
    console.log(projectDetails.state);
  };

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
        projectDetails.is_open,
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
        <select onChange={onChangeHandler}>
          {categories.map((categoriesData, key) => {
            return (
              <option value={categoriesData.id} key={key}>
                {categoriesData.description}
              </option>
            );
          })}
        </select>
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
          placeholder="Suburb"
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
        <select onChange={onChangeHandlerState}>
          <option value="ACT">ACT</option>
          <option value="NSW">NSW</option>
          <option value="NT">NT</option>
          <option value="QLD">QLD</option>
          <option value="SA">SA</option>
          <option value="TAS">TAS</option>
          <option value="VIC">VIC</option>
          <option value="WA">WA</option>
        </select>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Create New Project
      </button>
    </form>
  );
}

export default ProjectForm;
