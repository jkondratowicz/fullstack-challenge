import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import React from "react"
import { translate } from "../utils/language.utils"

interface Props {
    isOpen: boolean
    onClose: () => void
    onRestore: () => void
}

export default function RestoreProjectConfirmation({ isOpen, onClose, onRestore }: Props) {
    const cancelRef = React.useRef(null)

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{translate('RESTORE_PROJECT')}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {translate('RESTORE_PROJECT_DESCRIPTION')}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            {translate('NO')}
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={onRestore}>
                            {translate('YES')}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}