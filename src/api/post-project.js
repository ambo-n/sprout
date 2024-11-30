async function postProject(
  title,
  description,
  goal,
  image,
  category,
  address,
  suburb,
  postcode,
  state
) {
  const url = `${import.meta.env.VITE_API_URL}/projects/`;
  const token = window.localStorage.getItem("token");
  console.log(token);
  const response = await fetch(url, {
    method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: title,
      description: description,
      goal: goal,
      image: image,
      category: category,
      address: address,
      suburb: suburb,
      postcode: postcode,
      state: state,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to make a project`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postProject;
