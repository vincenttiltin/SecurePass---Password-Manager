import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './TwoPanes.css'
/**
 * Component that displays one pane on the left and another on the right.
 * @param {*} leftPane Component to display on the left.
 * @param {*} rightPane Component to display on the right.
 * @returns JSX Container with both left and right panes to render.
 */
function TwoPanes({ leftPane, rightPane }) {
    return (
        <Container>
            <Row>
                <Col sm={4}>{leftPane}</Col>
                <Col sm={8}>{rightPane}</Col>
            </Row>
        </Container>
    );
}
export default TwoPanes;
