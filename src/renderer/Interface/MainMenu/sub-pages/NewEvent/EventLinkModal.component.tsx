import { Box, Modal } from '@mui/material';
interface IProps {
    open: boolean;
    onClose: () => any;
}

export function EventLinkModal({ open, onClose }: IProps) {
    return (
        <Modal className="modal" open={open} onClose={() => onClose()}>
            <Box className="modal__wrapper modal__wrapper-small">
                <Box className="modal__header">Header</Box>
                <Box className="modal__content utils__full-height"></Box>
            </Box>
        </Modal>
    );
}
