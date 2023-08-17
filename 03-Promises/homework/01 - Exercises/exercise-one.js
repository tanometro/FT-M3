"use strict";

const { blue } = require("./utils");
let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

const problemA = async () => {
  // callback version
  // exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza2) {
//     exerciseUtils.blue(stanza2);
//     exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
//       exerciseUtils.blue(stanza3);
//     });
//   });
// }

const response1 = await exerciseUtils.promisifiedReadFile("./poem-one/stanza-02.txt")
  console.log(response1); // Loguea el contenido de stanza-02.txt
  exerciseUtils.blue(response); 
  
  const response2 = await exerciseUtils.promisifiedReadFile("./poem-one/stanza-03.txt"); // Retorna otra promesa para leer stanza-03.txt
  console.log(response2); // Loguea el contenido de stanza-03.txt
  console.log('done'); // Loguea 'done' cuando ambas promesas se resuelvan correctamente
    // });
}


function problemB() {
  // callback version
  // exerciseUtils.readFile(
  //   "poem-one/wrong-file-name.txt",
  //   function (err, stanza4) {
  //     if (err) exerciseUtils.magenta(new Error(err));
  //     else exerciseUtils.blue(stanza4);
  //   }
  // );

  // promise version
  // Tu código acá:
  exerciseUtils.promisifiedReadFile("./poem-one/wrong-file-name.txt")
  .then((response)=> {
    exerciseUtils.blue(response);
  }
  )
  .catch((error)=>{
    exerciseUtils.magenta(new Error (error))
   })
}

function problemC() {
  // callback version
  // exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
  //   if (err) return exerciseUtils.magenta(new Error(err));
  //   exerciseUtils.blue(stanza3);
  //   exerciseUtils.readFile(
  //     "poem-one/wrong-file-name.txt",
  //     function (err2, stanza4) {
  //       if (err2) return exerciseUtils.magenta(new Error(err2));
  //       exerciseUtils.blue(stanza4);
  //     }
  //   );
  // });

  // promise version
  // Tu código acá:
  exerciseUtils.promisifiedReadFile("./poem-one/stanza-03.txt")
  .then((response)=>{
    console.log(response);
    return exerciseUtils.promisifiedReadFile("./stanza-04.txt");
  })
  .then((response)=>{
    console.log(response);
  })
  .catch((error) =>{
    exerciseUtils.magenta(error);
  })
}
