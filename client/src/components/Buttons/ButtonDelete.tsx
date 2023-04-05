import { PropsWithChildren, useState } from 'react';

import {
    Dialog,
    DialogActionButton,
    DialogCancelButton,
    DialogContent,
    DialogControls,
    DialogTitle,
} from '../common/Dialog/Dialog';
import DialogTrigger from '../common/DialogTrigger/DialogTrigger';
import Button, { Variant } from '../common/Button/Button';

interface ButtonDeleteProps {
    onPrimaryAction?: any;
    icon?: boolean;
    variant?: Variant;
}

const ButtonDelete: React.FC<PropsWithChildren<ButtonDeleteProps>> = ({
    onPrimaryAction,
    children,
    variant = 'text',
    icon = false,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)} icon={icon} variant={variant}>
                {children}
            </Button>
            <DialogTrigger isVisible={isOpen} onClose={setIsOpen}>
                <Dialog>
                    <DialogTitle>Удаление статьи</DialogTitle>
                    <DialogContent>Вы действительно хотите удалить статью?</DialogContent>
                    <DialogControls>
                        <DialogCancelButton onClick={() => setIsOpen(false)}>Отмена</DialogCancelButton>
                        <DialogActionButton
                            onClick={() => {
                                onPrimaryAction();
                                setIsOpen(false);
                            }}
                        >
                            Удалить
                        </DialogActionButton>
                    </DialogControls>
                </Dialog>
            </DialogTrigger>
        </>
    );
};

export default ButtonDelete;