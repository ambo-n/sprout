import { useState } from "react";
import postProject from "../api/post-project.js";
import useCategories from "../hooks/use-categories.js";
import { useNavigate } from "react-router-dom";
import "./ProjectForm.css";
import z from "zod";

const projectSchema = z.object({
  title: z.string().min(5, { message: "Title must not be empty" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 5 characters long" }),
  goal: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((goal) => goal >= 1, {
      message: "Goal must be at least $1",
    }),
  image: z.string().min(1, {
    message:
      "Image field can't be empty. Plus, it will make your project a lot prettier",
  }),
  suburb: z.string().min(1, { message: "Suburb cannot be empty" }),
  postcode: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: "Postcode must be valid" }),
  state: z.string().min(1, { message: "Please select a state" }),
});

function ProjectForm() {
  const navigate = useNavigate();
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
    const result = projectSchema.safeParse(projectDetails);
    if (!result.success) {
      const error = result.error.errors?.[0];
      if (error) {
        alert(error.message);
      }
      return;
    } else {
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
      )
        .then((response) => {
          navigate("/project/" + response.id);
        })
        .catch((error) => alert(error));
    }
  };

  return (
    <div className="create-project">
      <div className="container">
        <h1>Start your campaign</h1>
        <form>
          <div className="project-details">
            <div className="input-box-project">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Project's Title"
                onChange={handleChange}
              />
            </div>
            <div className="input-box-project">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Project's Description"
                onChange={handleChange}
              />
            </div>
            <div className="input-box-project">
              <label htmlFor="goal">Goal</label>
              <input
                type="number"
                id="goal"
                placeholder="Project's Goal"
                onChange={handleChange}
              />
            </div>
            <div className="input-box-project">
              <label htmlFor="image">Image</label>
              <input
                type="url"
                id="image"
                placeholder="Image file"
                onChange={handleChange}
              />
            </div>
            <div className="input-box-project">
              <label htmlFor="category">Category</label>
              <select onChange={onChangeHandler} defaultValue="0">
                <option value="0" disabled>
                  --select a category--
                </option>
                {categories.map((categoriesData, key) => {
                  return (
                    <option value={categoriesData.id} key={key}>
                      {categoriesData.description}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-box-project">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Address"
                onChange={handleChange}
              />
            </div>
            <div className="input-box-project">
              <label htmlFor="suburb">Suburb</label>
              <input
                type="text"
                id="suburb"
                placeholder="Suburb"
                onChange={handleChange}
              />
            </div>
            <div className="input-box-project">
              <label htmlFor="postcode">Postcode</label>
              <input
                type="number"
                id="postcode"
                placeholder="Postcode"
                onChange={handleChange}
              />
            </div>
            <div className="input-box-project">
              <label htmlFor="state">State</label>
              <select onChange={onChangeHandlerState} defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>
                  --select a state--
                </option>
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
          </div>
          <button type="submit" onClick={handleSubmit}>
            Create New Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
