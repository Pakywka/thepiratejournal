import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks';
import { useFollowUserMutation, useUnFollowUserMutation } from '@/services';
import Button from '../common/Button/Button';
import {
    Dialog,
    DialogActionButton,
    DialogCancelButton,
    DialogContent,
    DialogControls,
    DialogTitle,
} from '../common/Dialog/Dialog';
import Tippy from '../common/Tippy/Tippy';
import DialogTrigger from '../common/DialogTrigger/DialogTrigger';
import Snackbar from '../common/Snackbar/Snackbar';

interface ButtonFollowProps {
    username: string | undefined;
    hasSubscription: boolean | undefined;
    configuration?: 'icon' | 'text' | 'iconWithText';
}

const ButtonFollow: React.FC<ButtonFollowProps> = ({ username, hasSubscription, configuration }) => {
    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenTippy, setIsOpenTippy] = useState<boolean>(false);

    const { mutate: follow, isLoading: isLoadingFollow } = useFollowUserMutation();
    const { mutate: unFollow, isLoading: isLoadingUnFollow } = useUnFollowUserMutation();

    const [isFollow, setIsFollow] = useState<boolean>();

    useEffect(() => {
        setIsFollow(hasSubscription);
    }, [hasSubscription]);

    const handleFollow = () => {
        setIsOpenTippy(true);
        setTimeout(() => setIsOpenTippy(false), 3000);

        if (isFollow) {
            setIsFollow(false);
            unFollow(String(user?.id));
        } else {
            setIsFollow(true);
            follow(String(user?.id));
        }
    };

    if (!user) {
        return (
            <>
                <Tippy
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    offset={50}
                    tooltipPosition="right"
                    title="Следи за обновлениями авторов"
                    description="Чтобы отслеживать обновления авторов, войди в аккаунт."
                >
                    <Button icon={configuration === 'icon'} onClick={() => setIsOpen(true)} variant="filled">
                        {configuration === 'iconWithText' ? (
                            <>
                                <span className="material-symbols-outlined">add_circle</span>
                                Подписаться
                            </>
                        ) : configuration === 'icon' ? (
                            <span className="material-symbols-outlined">person_add</span>
                        ) : (
                            'Подписаться'
                        )}
                    </Button>
                </Tippy>
            </>
        );
    }

    return (
        <>
            {isFollow ? (
                <>
                    <Button
                        onClick={() => setIsOpen(true)}
                        isActive={isOpen}
                        icon={configuration === 'icon'}
                        variant="filledTonal"
                    >
                        {configuration === 'iconWithText' ? (
                            <>
                                <span className="material-symbols-outlined">notifications</span>
                                Подписка
                            </>
                        ) : configuration === 'icon' ? (
                            <span className="material-symbols-outlined">person</span>
                        ) : (
                            'Подписка'
                        )}
                    </Button>
                    <DialogTrigger isVisible={isOpen} onClose={setIsOpen}>
                        <Dialog>
                            <DialogTitle>Отписаться от автора</DialogTitle>
                            <DialogContent>Ты точно хочешь отписаться от автора?</DialogContent>
                            <DialogControls>
                                <DialogCancelButton>Отмена</DialogCancelButton>
                                <DialogActionButton
                                    onClick={() => {
                                        handleFollow();
                                        setIsOpen(false);
                                    }}
                                >
                                    Отписаться
                                </DialogActionButton>
                            </DialogControls>
                        </Dialog>
                    </DialogTrigger>
                    <Snackbar isOpen={isOpenTippy} onClose={() => setIsOpenTippy(false)}>
                        Ты подписался на автора
                    </Snackbar>
                </>
            ) : (
                <>
                    <Button icon={configuration === 'icon'} onClick={handleFollow} variant="filled">
                        {configuration === 'iconWithText' ? (
                            <>
                                <span className="material-symbols-outlined">add_circle</span>
                                Подписаться
                            </>
                        ) : configuration === 'icon' ? (
                            <span className="material-symbols-outlined">person_add</span>
                        ) : (
                            'Подписаться'
                        )}
                    </Button>
                    <Snackbar isOpen={isOpenTippy} onClose={() => setIsOpenTippy(false)}>
                        Ты отписался от автора
                    </Snackbar>
                </>
            )}
        </>
    );
};

export default ButtonFollow;