let test_score = 79;
let my_grade = 
  test_score > 89 
  ? "A" 
  : test_score > 79
  ? "B" 
  : test_score > 69
  ? "C" 
  : test_score > 59
  ? "D" 
  : "F";
console.log(`Test grade: ${my_grade}`);
