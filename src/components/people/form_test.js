import React, { Component } from 'react'
import {Form, Text} from 'informed'

class FormTest extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Form
                onChange={formState => console.log(formState)}
                render={({ formState }) => (
                    <div>
                    <Text field="hello" />
                    <button type="submit">Submit</button>
                    </div>
                )}
            />
        );
    }
}

export default FormTest;