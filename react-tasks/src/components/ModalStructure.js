// src/components/ModalStructure.js

import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

function ModalStructure({ show, handleClose, modalInfo }) {

    // TODO How can I move some of this functionality out of each class and into here (like handleClose).
    //      Also, how can I set the Base Modal info (should modalInfo come back null)

    // // Start Modal Functionality Block
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // // Should never be seen with this data, but will redirect to homepage (just in case).
    // const BASE_MODAL = {
    //     title: "Error",
    //     body: "Something went wrong. Press close to go to the home.",
    //     btnName: "Close",
    //     route: "/"
    // }
    // const [modalInfo, setModalInfo] = useState(BASE_MODAL);
    // // End Modal Functionality Block

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalInfo.body}</Modal.Body>
                <Modal.Footer>
                    <Link className="btn btn-secondary" to={modalInfo.route} onClick={handleClose}>
                        {modalInfo.btnName}
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalStructure;