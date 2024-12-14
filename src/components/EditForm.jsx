import { useEffect, useState } from "react";
import useProject from "../hooks/use-project";
import putProject from "../api/put-project";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import getProject from "../api/get-project";
import "./EditForm.css";
import z from "zod";

const updateprojectSchema = z.object({
  title: z.string().min(5, { message: "Title must not be empty" }).optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 5 characters long" })
    .optional(),
  goal: z
    .union([z.string(), z.number()])
    .transform((val) => parseFloat(val))
    .refine((goal) => goal >= 1, {
      message: "Goal must be at least $1",
    })
    .optional(),
  image: z
    .string()
    .min(1, {
      message:
        "Image field can't be empty. Plus, it will make your project a lot prettier",
    })
    .optional(),
  suburb: z.string().min(1, { message: "Suburb cannot be empty" }).optional(),
  postcode: z
    .union([z.string(), z.number()])
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: "Postcode must be valid" })
    .optional(),
  state: z.string().min(1, { message: "Please select a state" }).optional(),
});

function EditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    getProject(id)
      .then((project) =>
        setProjectDetails({
          ...projectDetails,
          title: project.title,
          description: project.description,
          goal: project.goal,
          image: project.image,
          is_open: project.is_open,
          category: project.category,
          address: project.address,
          suburb: project.suburb,
          postcode: project.postcode,
          country: project.country,
          state: project.state,
        })
      )
      .catch((error) => console.log(error));
  }, []);

  const handleCancle = (event) => {
    event.preventDefault();
    navigate("/dashboard");
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
    const result = updateprojectSchema.safeParse(projectDetails);
    if (!result.success) {
      const error = result.error.errors?.[0];
      if (error) {
        alert(error.message);
      }
    } else {
      putProject(
        id,
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
      ).then((response) => {
        navigate("/project/" + response.id);
      });
    }
  };

  return (
    <div className="update-project-form">
      <form>
        <div className="project-details">
          <div className="input-box-project">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="title"
              value={projectDetails.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-box-project">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              placeholder="Project's Description"
              value={projectDetails.description}
              onChange={handleChange}
            />
          </div>
          <div className="input-box-project">
            <label htmlFor="goal">Goal</label>
            <input
              type="number"
              id="goal"
              placeholder="Project's Goal"
              value={projectDetails.goal}
              onChange={handleChange}
            />
          </div>
          <div className="input-box-project">
            <label htmlFor="image">Image</label>
            <input
              type="url"
              id="image"
              placeholder="Image file"
              value={projectDetails.image}
              onChange={handleChange}
            />
          </div>
          {/* <div className="input-box-project">
          <label htmlFor="category">Category</label>
          <select onChange={handleChange} defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled>
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
        </div> */}
          <div className="input-box-project">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={projectDetails.address}
              onChange={handleChange}
            />
          </div>
          <div className="input-box-project">
            <label htmlFor="suburb">Suburb</label>
            <input
              type="text"
              id="suburb"
              placeholder="Suburb"
              value={projectDetails.suburb}
              onChange={handleChange}
            />
          </div>
          <div className="input-box-project">
            <label htmlFor="postcode">Postcode</label>
            <input
              type="number"
              id="postcode"
              placeholder="Postcode"
              value={projectDetails.postcode}
              onChange={handleChange}
            />
          </div>
          <div className="input-box-project">
            <label htmlFor="state">State</label>
            <select onChange={handleChange} defaultValue={projectDetails.state}>
              <option value={projectDetails.state} disabled>
                {projectDetails.state}
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
        <div className="button-div">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button type="cancel" onClick={handleCancle}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditForm;
