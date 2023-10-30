// src/components/ModalStructure.js

import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

function ModalStructure({ show, handleClose, modalInfo }) {

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