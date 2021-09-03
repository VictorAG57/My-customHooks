import { useState } from 'react';

// Ese custom Hook nos permite referenciar el valor de algun input,
// en este caso esta echos espesificamente para ser usado referenciando al
// nombre del input, sea igual al valor escrito en ese input, por lo cual, 
// nos permitira usar lo escrito por el usuario.

const useForm = ( initialState = {}) => {

    const [ values, setValues ] = useState( initialState );

    // Función que nos permite resetear el formulario cambiando el formulario
    // al estado inicial.
    const reset = () => {
        setValues( initialState );
    }

    // handleInputChange --> manejar el cambio de entrada
    // Está función maneja el evento, hacemos referencia al avento
    // y mediante ella cambiamos el estado (setValues)
    const handleInputChange = ({ target }) => {
        // Con setValues cambiamos el estado inicial, por lo escrito
        // por el usuario en cada caja de texto
        setValues({
            ...values,
            [target.name]: target.value,
        });
    };

    // retornamos el estado, y mi función, y así podemos usar nuestro
    // custom Hook en alguna otra aplicasión
    return [
        values, 
        handleInputChange,
        reset
    ];
};

export default useForm;
