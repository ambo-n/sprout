async function deleteProject(projectId) {
  const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;
  const token = window.localStorage.getItem("token");
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const fallbackError = `Can't delete the project with id ${projectId}`;
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
}

export default deleteProject;
