let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    jsonfunc(this.responseText);
  }
}

xhttp.open("GET", "./data.json", true);
xhttp.send();

class Data {
  Data() {
    this.id = id;
    this.g1 = "-";
    this.g2 = "-";
    this.g3 = "-";
    this.g4 = "-";
    this.g5 = "-";
  }
}

function jsonfunc(jsonText) {
  let json = JSON.parse(jsonText);
  let txt = "";
  for (let i = 0; i < json.length; i++) {
    console.log("Hello");
    for (key in json[i]) {
      txt += key + ": " + json[i][key];
    }
    txt += "\n";
  }
  document.getElementById("demo").innerHTML = txt;
}