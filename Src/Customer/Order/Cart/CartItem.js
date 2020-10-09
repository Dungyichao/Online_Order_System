import React from 'react';
import { Button, Accordion, Card, Badge } from 'react-bootstrap';


const item_style = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'left',
}


export const CartItem = (props) => {

    //console.log(props.Cart_item_info);
    function remove_item_handle(e) {
        e.preventDefault();
        props.remove_item(props.Cart_item_info.uid)
    }

    //console.log("Return CartItem ", props.u_key,": ",props.Cart_item_info);

    return (
        <div>
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <div style={item_style}>
                            <div style={{ flex: '1' }}>{props.u_key}.</div>
                            <div style={{ flex: '7' }}>
                                <div>
                                    {props.Cart_item_info.dish_name}{'  '}
                                    {props.Cart_item_info.extra_add.map((item, idx) => {
                                        return(                                         
                                                <Badge variant="dark" style={{margin:'0px 2px'}} key={idx}> {`+ ${item.name}`}</Badge>                                                                                
                                        )
                                    })}
                                    {props.Cart_item_info.fried_rice.map((item, idx) => {
                                        return(                                         
                                                <Badge variant="success" style={{margin:'0px 2px'}} key={idx}> {`${item.name}`}</Badge>                                                                                
                                        )
                                    })}

                                </div>
                            </div>
                            <div style={{ flex: '2', textAlign: 'right' }}>X {props.Cart_item_info.qty}</div>
                            <div style={{ flex: '2', textAlign: 'right' }}>${props.Cart_item_info.Tprice}</div>
                        </div>

                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Button onClick={remove_item_handle} variant="danger" >Remove</Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}