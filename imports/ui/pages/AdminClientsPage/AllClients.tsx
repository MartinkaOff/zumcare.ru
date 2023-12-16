import React, { useState } from "react"
import { Container, Row, Nav } from "react-bootstrap";
import { ClientsTable } from "./ClientsTable";

export function AllClients() {
    const [part, setPart] = useState('clients');
    return (
        <Container>
            <Row style={{ padding: '1rem 0 1rem 0' }}>
                <Nav
                    variant='pills'
                    activeKey={part}
                    onSelect={(s) => setPart(s ? s : '')}
                >
                    <Nav.Item>
                        <Nav.Link eventKey='clients'>Клиенты</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey='corp_clients'>Корпоративные клиенты</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>

            <Row>
                <ClientsTable part={part} />
            </Row>
        </Container>
    )
}