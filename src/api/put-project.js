async function putProject(
  projectId,
  title,
  description,
  goal,
  image,
  is_open,
  category,
  address,
  suburb,
  postcode,
  country,
  state
) {
  const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;
  const token = window.localStorage.getItem("token");
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      title: title,
      description: description,
      goal: goal,
      image: image,
      is_open: is_open,
      category: category,
      address: address,
      suburb: suburb,
      postcode: postcode,
      country: country,
      state: state,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error saving the edit project`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default putProject;
