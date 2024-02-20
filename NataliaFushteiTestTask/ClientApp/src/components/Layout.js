import React, {Component} from 'react';
import css from './layout.module.css'
import {Container} from "reactstrap";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <header>
                </header>
                <div className={css.main}>
                    <Container>
                        {this.props.children}
                    </Container>
                </div>
            </div>
        );
    }
}
