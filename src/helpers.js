const hbs = require('hbs');
const fs = require ('fs');
listaCursos = [];
listaAspirantes= [];
listaMatriculas= [];

///////////////////////////////////////////LISTAR LOS CURSOS//////////////////////////////////////////////////////////////
const listar = ()=>{
	try{
	listaCursos= require('../listado.json');//dos formas de llamar
	//listaCursos= JSON.parse(fs.readFileSync('listado.json'));// de manera asincronica es mejor utilizar este
	}catch(error){
		listaCursos=[];
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////LISTAR LOS ASPIRANTES//////////////////////////////////////////////////////////////
const listarAsp=()=>{
	try{
	listaAspirantes= require('../listado2.json');//dos formas de llamar
	//listaAspirantes= JSON.parse(fs.readFileSync('listado2.json'));// de manera asincronica es mejor utilizar este
	}catch(error){
		listaAspirantes=[];
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////LISTAR LAS MATRICULAS//////////////////////////////////////////////////////////////
const listarMat=()=>{
	try{
	listaMatriculas= require('../listado3.json');//dos formas de llamar
	//listaMatriculas= JSON.parse(fs.readFileSync('listado3.json'));// de manera asincronica es mejor utilizar este
	}catch(error){
		listaMatriculas=[];
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////LISTAR LAS MATRICULAS//////////////////////////////////////////////////////////////
const listarMatt=()=>{
	try{
	listaMatriculas= require('../listado3.json');//dos formas de llamar
	//listaMatriculas= JSON.parse(fs.readFileSync('listado3.json'));// de manera asincronica es mejor utilizar este
	}catch(error){
		listaMatriculas=[];
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////GUARDAR LOS CURSOS//////////////////////////////////////////////////////////////
const guardar = ()=> {
		let datos = JSON.stringify(listaCursos);
		fs.writeFile('listado.json',datos,(err)=>{
			if(err) throw(err);
			console.log('Archivo creado con exito')
		})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////GUARDAR LOS ASPIRANTES//////////////////////////////////////////////////////////////
const guardarAsp = ()=> {
		let datos = JSON.stringify(listaAspirantes);
		fs.writeFile('listado2.json',datos,(err)=>{
			if(err) throw(err);
			console.log('Archivo creado con exito')
		})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////GUARDAR LAS MATRICULAS//////////////////////////////////////////////////////////////
const guardarMat = ()=> {
		let datos = JSON.stringify(listaMatriculas);
		fs.writeFile('listado3.json',datos,(err)=>{
			if(err) throw(err);
			console.log('Archivo creado con exito')
		})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////CREAR LOS CURSOS//////////////////////////////////////////////////////////////
hbs.registerHelper('crear',(id,nombre,descripcion,valor,modalidad,intensidad, estado)=>{
	listar();
	let mesaje;
	let cur ={
		id: id,
		nombre: nombre,
		descripcion: descripcion,
		valor: valor,
		modalidad: modalidad,
		intensidad: intensidad,
		estado: estado
	};
	let duplicado = listaCursos.find(nom => nom.id==id)
	if(!duplicado){
	listaCursos.push(cur);
	console.log(listaCursos);
	guardar();
	mensaje='Curso '+nombre+' creado correctamente';
	}
	else{
		console.log('Ya existe otro curso con el identificador ingresado');
		mensaje='Ya existe otro curso con el identificador ingresado';
	}
	return mensaje;
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////CREAR LOS ASPIRANTES//////////////////////////////////////////////////////////////
hbs.registerHelper('crearasp',(id,nombre,correo,telefono)=>{
	listarAsp();
	let mensaje;
	let asp ={
		id: id,
		nombre: nombre,
		correo: correo,
		telefono: telefono,
	};
	let duplicado = listaAspirantes.find(nom => nom.id==id)
	if(!duplicado){
	listaAspirantes.push(asp);
	console.log(listaAspirantes);
	guardarAsp();
	mensaje= 'Se ha registrado satisfactoriamente';
	}
	else{
		console.log('Ya existe otro aspirante con ese id');
		mensaje='Ya se ha registrado previamente'
	}
	return mensaje;
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////CREAR LAS MATRICULAS//////////////////////////////////////////////////////////////
hbs.registerHelper('crearmat',(identificador,documento)=>{
	listarMat();
	listarAsp();
	listar()
	let mensaje;
	let sw=true;
	let mat ={
		idmatricula: identificador+''+documento,
		identificador: identificador,
		documento: documento
	};
	let encontrado =listaCursos.find(id=>id.id==identificador)
	let encontradoo =listaAspirantes.find(id=>id.id==documento)
	if(encontrado && encontradoo){
	listaMatriculas.forEach(matricula=>{
		if (matricula.identificador==identificador&&matricula.documento==documento) {
			sw=false;
		}
	})
	if(sw==true){
	listaMatriculas.push(mat);
	console.log(listaMatriculas);
	guardarMat();
	let encontrado = listaCursos.find(buscar => buscar.id== identificador); 
	mensaje='Se ha matriculado satisfactoriamente al curso '+ encontrado.nombre+' el cual tiene un valor de '+ encontrado.valor;
}	
	else{
		console.log('Ya existe otra matricula con ese id');
		mensaje='Ya se ha matriculado previamente a este curso'
	}

	}
	if(!encontradoo){
	mensaje='Se debe registrar previamente como aspirante'
	}
	return mensaje
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////MOSTRAR LOS CURSOS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrar',()=>{
let string ;
var out = "";
		listar()
	console.log('Notas de los estudiantes')



	listaCursos.forEach(curso=>{
		//id: curso.id;
		console.log(curso.id);
		console.log(' nombre '+ curso.nombre)
		console.log(' descripcion '+ curso.descripcion)
		console.log(' valor '+ curso.valor+ '\n')

    out = out +"<tr>"+ "<td>" + curso.id + "</td>"+'\n'+"<td>" + curso.nombre + "</td>"+'\n'+"<td>" + curso.descripcion + "</td>"+'\n'+"<td>" + curso.valor + "</td>"+"<td>" + curso.modalidad + "</td>"	+"<td>" + curso.intensidad + "</td>"+"<td>" + curso.estado+ "</td>"+"<tr>";

		string =string+' '+curso.id;

	})
  return new hbs.SafeString(
    out 
  );

})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LOS CURSOS DISPONIBLES//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarcursosdisponibles',()=>{
let string ;
var out = "";
		listar()
	console.log('Notas de los estudiantes')



	listaCursos.forEach(curso=>{
		//id: curso.id;
		console.log(curso.id);
		console.log(' nombre '+ curso.nombre)
		console.log(' descripcion '+ curso.descripcion)
		console.log(' valor '+ curso.valor+ '\n')
if(curso.estado=='Disponible'){
    out = out +"<tr>"+ "<td>" + curso.id + "</td>"+'\n'+"<td>" + curso.nombre + "</td>"+'\n'+"<td>" + curso.valor +"</std>" + "<tr>";
}
		//string =string+' '+curso.id;

	})
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LOS CURSOS DISPONIBLES VER MAS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarcursosdisponiblesvermas',(id)=>{
let string ;
var out='';
var no='No se encontro un curso con el identificador ingresado';
var sw=false;
		listar()

	listaCursos.forEach(curso=>{
		//id: curso.id;
		console.log(curso.id);
		console.log(' nombre '+ curso.nombre)
		console.log(' descripcion '+ curso.descripcion)
		console.log(' valor '+ curso.valor+ '\n')
if(curso.id==id && curso.estado=='Disponible' ){
	if(sw==false){
		out=out+'<tr> <th>Identificador del Curso</th> <th>Nombre</th> <th>Descripcion</th><th>Valor</th> <th>Modalidad</th> <th>Intensidad</th> </tr>';
		sw=true;
	}
    out = out +"<tr>"+ "<td>" + curso.id + "</td>"+'\n'+"<td>" + curso.nombre + "</td>"+'\n'+"<td>" + curso.descripcion + "</td>"+'\n'+"<td>" + curso.valor + "</td>"+"<td>" + curso.modalidad + "</td>"	+"<td>" + curso.intensidad + "</td>"+"<tr>";

}
		//string =string+' '+curso.id;

	})
	if(sw==true){
  return new hbs.SafeString(
    out 
  );
}
else{
return no
}
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////MOSTRAR NOMBRE DE LOS CURSOS DISPONIBLES//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarcursosnombre',()=>{
let string ;
var out='<option value="">-</option> ';


		listar()
 
	listaCursos.forEach(curso=>{

  out= out+` 
   <option value="${curso.id}" >${curso.nombre}</option> 
    `

	})

  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////MOSTRAR NOMBRE DE LOS CURSOS DISPONIBLES//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarcursosnombre2',()=>{
let string ;
var out='<option value="">-</option> ';


		listar()
 
	listaCursos.forEach(curso=>{
if(curso.estado=="Disponible"){
  out= out+` 
   <option value="${curso.id}" >${curso.nombre}</option> 
    `
}
	})

  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LOS CURSOS DISPONIBLES VER MAS2//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarcursosdisponiblesvermas2',()=>{
let string ;
var out='<div class="accordion" id="accordionExample"> <div class="row">';
var no='No se encontro un curso con el identificador ingresado';
var sw=false;
		listar()
		i=1;
	listaCursos.forEach(curso=>{
if(curso.estado=='Disponible' ){

    out = out +
   `
<div class=".cols-sm-12 .cols-md-4 .cols-lg-12" >
  <div class="card" >
    <div class="card-header" id="heading${i}" >
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
          Identificador del curso: ${curso.id}<br>
          Nombre: ${curso.nombre}<br>
          Valor: ${curso.valor}<br><br>
          Ver Mas
        </button>
      </h2>
    </div>

    <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
      <div class="card-body">
        Descripcion: ${curso.descripcion}<br>
        Modalidad: ${curso.modalidad}<br>
        Intensidad: ${curso.intensidad}
      </div>
    </div>
 </div>
</div>

 
   `

}
		//string =string+' '+curso.id;
i=i+1;
	})
out=out+'</div> </div>  ';
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LOS CURSOS DISPONIBLES VER MAS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarcursosdisponiblesvermasno',()=>{
let string ;
var out = "";
		listar()
	console.log('Notas de los estudiantes')



	listaCursos.forEach(curso=>{
		//id: curso.id;
		console.log(curso.id);
		console.log(' nombre '+ curso.nombre)
		console.log(' descripcion '+ curso.descripcion)
		console.log(' valor '+ curso.valor+ '\n')
if(curso.estado=='Disponible' ){
    out = out +"<tr>"+ "<td>" + curso.id + "</td>"+'\n'+"<td>" + curso.nombre + "</td>"+'\n'+"<td>" + curso.descripcion + "</td>"+'\n'+"<td>" + curso.valor + "</td>"+"<td>" + curso.modalidad + "</td>"	+"<td>" + curso.intensidad + "</td>"+"<tr>";
}
		//string =string+' '+curso.id;

	})
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LOS ASPIRANTES//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarasp',()=>{
let string ;
var out = "";
		listarAsp()
	console.log('Notas de los estudiantes')



	listaAspirantes.forEach(aspirante=>{
		//id: curso.id;
		console.log(aspirante.id);
		console.log(' nombre '+ aspirante.nombre)
		console.log(' descripcion '+ aspirante.correo)
		console.log(' valor '+ aspirante.telefono+ '\n')

    out = out +"<tr>"+ "<td>" + aspirante.id + "</td>"+'\n'+"<td>" + aspirante.nombre + "<td>" + aspirante.correo +"</td>"+"<td>" + aspirante.telefono+"</td>" +"<tr>";



	})
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LAS MATRICULAS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarmatcursos',()=>{
let string ;
var out = "";
		listarAsp()
		listarMat()
		listar()
	console.log('Notas de los estudiantes')
	listaMatriculas.sort();
	console.log('hola '+listaMatriculas)
//MyData.sort(dynamicSort("name"));
	listaMatriculas.forEach(mat=>{
		//id: curso.id;
		console.log(mat.identificador);
		console.log(mat.documento)

    out = out +"<tr>"+ "<td>" + mat.identificador + "</td>"+'\n'+'<td> ' + mat.documento +"</td>"+"<tr>";/*+"<td>"+'<button type="button" name="'+mat.identificador+'">Eliminar </button>'+"</td>"*/

		//string =string+' '+curso.id;

	})
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////MOSTRAR LAS MATRICULAS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarmatcursos2',()=>{
let string ;
var out = '<div class="accordion" id="accordionExample"> <div class="row">';
listarAsp()
listarMatt()
listar()
i=1;
let sw;
listaCursos.forEach(cur=>{
sw=false;
out=out+   `
<div class=".cols-sm-12 .cols-md-4 .cols-lg-12" >
   <div class="card" >
    <div class="card-header" id="heading${i}" >
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
          Identificador del curso: ${cur.id}<br>
          Nombre: ${cur.nombre}<br><br>
        
          Ver Matriculas
        </button>
      </h2>
    </div>
     <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
      <div class="card-body"> 
      <table>

      `
listaMatriculas.forEach(mat=>{
encontradoo =listaAspirantes.find(id=>id.id==mat.documento)
if(sw==false && cur.id==mat.identificador){
	
    out=out+ ` <thead>
      <tr>
      	<td>Documento</td>
      	<td>Nombre</td>
      	<td>Correo</td>
      	<td>Telefono</td>
      </tr>
      </thead>`
      sw=true;
}
if(cur.id==mat.identificador){
    out=out+`<tr>
    <td>${encontradoo.id}</td>
    	<td>${encontradoo.nombre}</td>
    	<td>${encontradoo.correo}</td>
    	<td>${encontradoo.telefono}</td>
    	</tr>
   `
}

	})
out=out+ `</table></div></div></div></div>
   		`
i=i+1;
	})
	out=out+  `
   		</div></div>`

  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////MOSTRAR LAS MATRICULAS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarmatcursos3',(identificador,documento)=>{
let string ;
var out = '<div class="accordion" id="accordionExample"> <div class="row">';
listarAsp()
listarMat()
listar()
i=1;
let sw;
listaCursos.forEach(cur=>{
sw=false;
	if(cur.id==identificador){
out=out+   `
<div class=".cols-sm-12 .cols-md-4 .cols-lg-12" >
   <div class="card" >
    <div class="card-header" id="heading${i}" >
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
          Identificador del curso: ${cur.id}<br>
          Nombre: ${cur.nombre}<br>
    

        </button>
      </h2>
    </div>
     <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordionExample">
      <div class="card-body"> 
      <table>

      `
listaMatriculas.forEach(mat=>{
if( mat.documento!=documento){
encontradoo =listaAspirantes.find(id=>id.id==mat.documento)
if(sw==false && cur.id==mat.identificador){
	
    out=out+ ` <thead>
      <tr>
      	<td>Documento</td>
      	<td>Nombre</td>
      	<td>Correo</td>
      	<td>Telefono</td>
      </tr>
      </thead>`
      sw=true;
}
if(cur.id==mat.identificador){
    out=out+`<tr>
    <td>${encontradoo.id}</td>
    	<td>${encontradoo.nombre}</td>
    	<td>${encontradoo.correo}</td>
    	<td>${encontradoo.telefono}</td>
    	</tr>
   `
}
}
	})
out=out+ `</table></div></div></div></div>
   		`
i=i+1;
}
	})
	out=out+  `
   		</div></div>`

  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////MOSTRAR LAS MATRICULAS//////////////////////////////////////////////////////////////
hbs.registerHelper('mostrarmatcursosid',(identificador,documento)=>{
let string ;
var out = "";
		listarAsp()
		listarMat()
		listar()
	console.log('Notas de los estudiantes')



	listaMatriculas.forEach(mat=>{
		//id: curso.id;
		console.log(mat.identificador);
		console.log(mat.documento)
if(mat.identificador==identificador && mat.documento!=documento){
    out = out +"<tr>"+ "<td>" + mat.identificador + "</td>"+'\n'+"<td>" + mat.documento +"</td>"+"<tr>";
}
		//string =string+' '+curso.id;

	})
  return new hbs.SafeString(
    out 
  );

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

hbs.registerHelper('listar',()=>{
		try{
	listaCursos= require('../listado.json');//dos formas de llamar
	//listaEstudiantes= JSON.parse(fs.readFileSync(listado.json));// de manera asincronica es mejor utilizar este
	}catch(error){
		listaCursos=[];
	}
})

hbs.registerHelper('actualizar',(id,estado)=>{
let out;
	listar()
	let encontrado = listaCursos.find(buscar => buscar.id== id)
	if(!encontrado){
console.log('Estudiante no existe')
out="Identificador del curso no encontrado";
	}
	else{
		encontrado.estado= estado;
		guardar()
		out="Estado del curso actualizado correctamente";
	}
  return new hbs.SafeString(
    out 
  );
})

hbs.registerHelper('eliminarr',(identificador,documento)=>{
listarMatt()
let sw=false;
let sww=false;
let mensaje;
let listaMatriculass= [];
	listaMatriculas.forEach(mat=>{
		if(mat.identificador==identificador && mat.documento==documento){
			sw=true;
		}
	})
	if(sw==true){
	listaMatriculas.forEach(mat=>{
		if(mat.identificador==identificador && mat.documento!=documento){
			listaMatriculass.push(mat);
		}
	})
		listaMatriculas.forEach(mat=>{
		if(mat.identificador!=identificador){
			listaMatriculass.push(mat);
		}
	})

		}
		console.log('antes de')
		console.log(listaMatriculas)
		listaMatriculas=listaMatriculass
		console.log('despues de')
		console.log(listaMatriculas)
		guardarMat()
		if(sw==true){
			mensaje='Eliminado correctamente'
		}else{
			mensaje='No se encontro el documento en la matriculas del curso'
		}
		return mensaje;
})

hbs.registerHelper('eliminarrr',(identificador,documento)=>{
listarMat()
let mensaje;
let idmatriculaa=identificador+''+documento;
	mensaje=idmatriculaa
let nuevo=listaMatriculas.filter(mat=>mat.idmatricula!=idmatriculaa);
	if(nuevo.length==listaMatriculas.length){
		console.log('No se encontro la matricula');
	}else{
		
		listaMatriculas=nuevo
		guardarMat();
		mensaje=listaMatriculas
	}
		return mensaje;
})


const eliminar=(non)=>{
	listar()
	let nuevo = listaEstudiantes.filter(mat=> mat.nombre!=non);
	if(nuevo.length==listaEstudiantes.length){
		console.log('ningun estudiante tiene el nombre indicado');
	}
	else{
		listaEstudiantes=nuevo
		guardar()

	}

}
