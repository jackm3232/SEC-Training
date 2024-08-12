const get_dad_joke = async () => {
  const response = await fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });
  
  const json_data = await response.json();
  console.log(json_data.joke);
};

get_dad_joke();
