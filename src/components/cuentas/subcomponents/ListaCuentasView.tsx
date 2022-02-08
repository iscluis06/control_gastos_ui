import {Component} from "react";
import { Table } from "react-bootstrap";

export default class ListaCuentasView extends Component{
    render(){
        return (<Table striped bordered hover size={"sm"}></Table>);
    }
}
