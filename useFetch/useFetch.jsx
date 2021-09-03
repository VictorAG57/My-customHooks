import { useEffect, useState, useRef} from 'react';

// useFetch es un hook que creamos para hacer peticiones a una URL
// que nos devolvera frases de breacking bad, esto para poder practicar.

const useFetch = ( url ) => {

    // En esté caso useRef nos permite mantener la referencia de cuando el compoennete esta
    // o no montado, ya que si se hace una petición cuando no lo está, marca errores
    // y puede llevar a problemas bastante graves.
    const isMounted = useRef(true)
    
    const [ state, setstate ] = useState({ data: null, loading: true, error: null})

    // Por ello aquí usamos un useEffect para indicar que se desmonto y así
    // al intentar cambiar el estado en setState en la prate de abajo, no intentaras
    // cambiar un estado que no existe.
    // Lo que desimos con esté useEffect, es que cuando se desmonte el componente (useFetch)
    // lo marque como falso para mo provocar el erro explicado previamente..
    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect( ()=> {

        setstate({ data: null, loading: true, error: null })

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                
                // Aquí colocamos que si está montado l componente, cambie el estado
                // de lo contrario no.
                if( isMounted.current ){
                    setstate({
                        loading: false,
                        error: null,
                        //data: data
                        data
                    });
                };
            })
            // Realizamos un .catch en caso de un error
            .catch( ()=> {
                setstate({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la iformación'
                });
            });
    },[url]); // Este efecto que llamara cada que la url cambie.

    return state;
}

export default useFetch
