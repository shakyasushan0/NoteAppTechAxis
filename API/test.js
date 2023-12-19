const a = null;
try {
  a.split(" ");
} catch (e) {
  console.log("Error Occured");
  console.log(e.message);
}
