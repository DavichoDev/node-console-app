require('colors');

const { guardarArchivo,
        leerDB
    } = require('./helpers/guardar-archivo');

const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareas,
        confirmar,
        mostrarListadoCheck
    } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async () => {
    
    let opt = '';
    const tareas = new  Tareas();
    const tareasDB = leerDB();

    if ( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        
        opt = await inquirerMenu();
        
        switch ( opt ) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea( desc );
            break;
                
            case '2':
                tareas.listadoCompleto();
            break;
            
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // Completado | Pendiente
                const ids = await mostrarListadoCheck( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;

            case '6':
                const id = await listadoTareas( tareas.listadoArr );
                if( id !== '0' ){
                    const ok = await confirmar('¿Estas seguro que deseas borrarla?');
                    if (ok){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada exitosamente.');
                    }
                }
            break;
        }

        guardarArchivo( JSON.stringify(tareas.listadoArr) );

        await pausa();

    } while ( opt !== '0' );

};


main();

