const band = {
  vocals: "Robert Plant",
  guitar: "Jimmy Page",
  bass: "John Paul Jones",
  drums: "John Bonham"
};

function sings({vocals}) {
  return `${vocals} sings!`
}

console.log(sings(band));
