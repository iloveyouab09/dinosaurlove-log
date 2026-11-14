const repositoryList = document.querySelector("#repository-list");

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    return response.json();
  })
  .then((repositories) => {
    repositoryList.replaceChildren();

    repositories.forEach((repository) => {
      const item = document.createElement("li");
      const heading = document.createElement("h2");
      const link = document.createElement("a");
      const description = document.createElement("p");

      link.href = repository.url;
      link.textContent = `${repository.owner}/${repository.name}`;
      heading.append(link);
      description.textContent = repository.description;
      item.append(heading, description);
      repositoryList.append(item);
    });
  })
  .catch((error) => {
    repositoryList.replaceChildren();
    const item = document.createElement("li");
    item.textContent = `Unable to load starred repositories: ${error.message}`;
    repositoryList.append(item);
  });
