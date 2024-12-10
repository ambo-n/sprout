async function postProject(
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
  const url = `${import.meta.env.VITE_API_URL}/projects/`;
  const token = window.localStorage.getItem("token");
  const response = await fetch(url, {
    method: "POST",
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
    if (response.status === 401) {
      alert("log in");
    }
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
