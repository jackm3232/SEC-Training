var x = 1;
let y = 2;
const z = 3;

console.log(`Global: x = ${x}`);
console.log(`Global: y = ${y}`);
console.log(`Global: z = ${z}`);

function func() {
  var x = 11;
  const z = 13;
  {
    var x = 21;
    const z = 23;
    console.log(`Block: x = ${x}`);
    console.log(`Block: y = ${y}`);
    console.log(`Block: z = ${z}`);
  }
  console.log(`Function: x = ${x}`);
  console.log(`Function: y = ${y}`);
  console.log(`Function: z = ${z}`);
}

func();
