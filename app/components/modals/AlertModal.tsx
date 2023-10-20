"use client"

import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    return ( 
        <Modal
            title="Are you sure?"
            description="This action cannot be undone."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-6 flex items-center justify-end w-full">
                <Button
                    outline
                    onClick={onClose}
                    disabled={loading}
                    type="button"
                >
                    Cancel
                </Button>
                <Button
                    red
                    onClick={onConfirm}
                    type="button"
                    disabled={loading}
                >
                    Continue
                </Button>
            </div>
        </Modal>
     );
}
 
export default AlertModal;