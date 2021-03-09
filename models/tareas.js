const Tarea = require('./tarea');

class Tareas {

    get listadoArr(){

        const listado = [];

        Object.keys(this._listado)
            .forEach(( key ) => {
                const tarea = this._listado[key];
                listado.push( tarea );
            });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ){

        if (this._listado[id]) {
            delete this._listado[id];
        }
        
    }

    crearTarea( desc='' ){
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( (tarea) => {
            this._listado[ tarea.id ] = tarea;
        });
    }

    listadoCompleto(){
        console.log();
        this.listadoArr
            .forEach(( tarea, i ) => {
                const idx = (i + 1).toString().green;
                const { desc, completadoEn } = tarea;
                const estado = (completadoEn !== null) ? 'Completado'.green : 'Pendiente'.red;
                console.log(`${ idx }. ${ desc } :: ${ estado }`);
            });
    }

    listarPendientesCompletadas( completadas = true ){
        
        console.log();
        
        this.listadoArr.filter( tarea => completadas ? tarea.completadoEn : !tarea.completadoEn )
        .forEach(( tarea, i ) => {
            const idx = (i + 1).toString().green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn !== null) ? 'Completado'.green : 'Pendiente'.red;
            console.log(`${ idx }. ${ desc } :: ${ estado }`);
        });

    }

    toggleCompletadas( ids = [] ){
        ids.forEach( ( id ) => { 
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        
        this.listadoArr.forEach( ( tarea ) => {
            if( !ids.includes( tarea.id ) ) this._listado[tarea.id].completadoEn = null;
        });

    }

}

module.exports = Tareas;