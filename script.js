let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    jsonfunc(this.responseText);
  }
}

xhr.open("GET", "./data.json", true);
xhr.send();

function jsonfunc(jsonText) {
  let json = JSON.parse(jsonText);
  for (let i = 0; i < json.length; i++) {
    const member = document.querySelector(`[id='${i}']`);
    member.querySelector("#child_id").textContent = json[i].id;
    for (let j = 1; j <= 5; j++) {
      member.querySelector(`#c${j}`).textContent = json[i][`color${j}`];
    }
  }
}

document.querySelector("#edit_button").onclick = function() {
  const member = document.querySelector("#edit");
  const id = member.querySelector("#edit_id").value;
  const color1 = member.querySelector("#edit_c1").value;
  const color2 = member.querySelector("#edit_c2").value;
  const color3 = member.querySelector("#edit_c3").value;
  const color4 = member.querySelector("#edit_c4").value;
  const color5 = member.querySelector("#edit_c5").value;
  
  xhr.open("POST", "./edit");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({
    "id": id,
    "color1": color1,
    "color2": color2,
    "color3": color3,
    "color4": color4,
    "color5": color5,
  }));
  
  const list = document.querySelector(`[id='${id}']`);
  list.querySelector("#c1").textContent = color1;
  list.querySelector("#c2").textContent = color2;
  list.querySelector("#c3").textContent = color3;
  list.querySelector("#c4").textContent = color4;
  list.querySelector("#c5").textContent = color5;
}

document.querySelector("#test_button").onclick = function() {
  for (let i = 0; i < 5; i++) {
    document.querySelector(`#result_${i+1}`).textContent = "";
  }
  const member = document.querySelector("#testInput");
  const inputList = member.value.split(" ");
  const color = [[], [], [], [], []];
  for (input in inputList) {
    console.log(inputList[input]);
    if (inputList[input] < 0 || inputList[input] > 25) {
      for (let i = 0; i < 5; i++) {
        color[i].append('w');
      }
    } else {
      for (let i = 0; i < 5; i++) {
        const row = document.querySelector(`[id='${inputList[input]}']`);
        color[i].push(row.querySelector([`#c${i+1}`]).textContent);
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    document.querySelector(`#result_${i+1}`).textContent += color[i] + " ";
  }
}