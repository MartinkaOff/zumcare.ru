import React, { useState } from "react"
import { Container, Row, Nav } from "react-bootstrap";
import { CreateCompany } from "../../pages/CreateCompany/CreateCompany";

export function Company() {
    const [part, setPart] = useState('add_company');

    return (
        <Container>
            <Row style={{ padding: '1rem 0 1rem 0' }}>
                <Nav
                    variant='pills'
                    activeKey={part}
                    onSelect={(s) => setPart(s ? s : '')}
                >
                    <Nav.Item>
                        <Nav.Link eventKey='add_company'>Добавить компанию</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey='all_company'></Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>

            <Row>
                {part === 'add_company' ? (
                    <CreateCompany />
                ) : null}
            </Row>
        </Container>
    )
}